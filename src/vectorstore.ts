import {
  Filter,
  Search,
  SearchIndex,
  SearchQuery,
  SearchResult,
  Tigris,
  TigrisDataTypes,
  TigrisIndexSchema,
} from "@tigrisdata/core";
import { VectorStoreConfig, Document, DocumentSchema } from "./types";

/**
 * A vector store that uses Tigris to store and search for documents.
 */
export class VectorDocumentStore {
  private _searchClient: Search;

  private _indexName: string;
  private _numDimensions: number;

  private _index: SearchIndex<DocumentSchema>;

  constructor(config: VectorStoreConfig) {
    const tigrisClient = new Tigris(config.connection);
    this._searchClient = tigrisClient.getSearch();

    this._indexName = config.indexName;
    this._numDimensions = config.numDimensions;
  }

  /**
   * Ensure that the index exists and is ready to use. Will not do anything if
   * the index already exists.
   */
  public async enusreIndex() {
    if (this._index) {
      return;
    }

    const indexSchema: TigrisIndexSchema<DocumentSchema> = {
      id: {
        type: TigrisDataTypes.STRING,
        searchIndex: true,
        id: true,
      },
      content: {
        type: TigrisDataTypes.STRING,
        searchIndex: true,
      },
      metadata: {
        type: TigrisDataTypes.OBJECT,
        searchIndex: true,
      },
      vectors: {
        type: TigrisDataTypes.ARRAY,
        items: {
          type: TigrisDataTypes.NUMBER,
        },
        searchIndex: true,
        dimensions: this._numDimensions,
      },
    };

    this._index = await this._searchClient.createOrUpdateIndex<DocumentSchema>(
      this._indexName,
      indexSchema
    );
  }

  /**
   * Add documents to the index.
   * @param ids The IDs of the documents to add
   * @param embeddings The embeddings of the documents to add
   * @param documents The documents to add
   * @returns A promise that resolves when the documents have been added
   */
  public async addDocumentsWithVectors({
    ids,
    embeddings,
    documents,
  }: {
    ids: string[];
    embeddings: number[][];
    documents: Document[];
  }) {
    await this.enusreIndex();

    const documentsToAdd: DocumentSchema[] = documents.map(
      (document, index) => {
        return {
          id: ids[index],
          content: document.content,
          metadata: document.metadata,
          vectors: embeddings[index],
        };
      }
    );

    await this._index.createOrReplaceMany(documentsToAdd);
  }

  /**
   * Search for the most similar documents to a query,
   * when you already have the embedding of the query.
   * @param embeddings The embeddings to search for
   * @param k The number of results to return
   * @param filter An optional filter to apply to the search
   * @returns A promise that resolves to an array of matched documents
   */
  public async similaritySearchVector({
    query,
    k,
    filter,
  }: {
    query: number[];
    k: number;
    filter?: object;
  }): Promise<Document[]> {
    await this.enusreIndex();

    const results: Document[] = [];

    // fetch the first page of results only
    const response = await this.search({ query, k, filter });
    for (const hit of response.hits) {
      results.push({
        content: hit.document.content,
        metadata: hit.document.metadata,
      });
    }

    return results;
  }

  /**
   * Search for the most similar documents to a query,
   * when you already have the embedding of the query.
   * @param embeddings The embeddings to search for
   * @param k The number of results to return
   * @param filter An optional filter to apply to the search
   * @returns A promise that resolves to an array of matched documents and their scores
   */
  public async similaritySearchVectorWithScore({
    query,
    k,
    filter,
  }: {
    query: number[];
    k: number;
    filter?: object;
  }): Promise<[Document, number][]> {
    await this.enusreIndex();

    const results: [Document, number][] = [];

    // fetch the first page of results only
    const response = await this.search({ query, k, filter });
    for (const hit of response.hits) {
      results.push([
        {
          content: hit.document.content,
          metadata: hit.document.metadata,
        },
        hit.meta.textMatch.vectorDistance,
      ]);
    }

    return results;
  }

  /**
   * Search for the most similar documents to a query,
   * when you already have the embedding of the query.
   * @param query The embeddings to search for
   * @param k The number of results to return
   * @param filter An optional filter to apply to the search
   * @returns A promise that resolves to the search results
   */
  private async search({
    query,
    k,
    filter,
  }: {
    query: number[];
    k: number;
    filter?: Filter<Pick<Document, "metadata">>;
  }): Promise<SearchResult<DocumentSchema>> {
    const request: SearchQuery<DocumentSchema> = {
      vectorQuery: {
        vectors: query,
      },
      filter,
      hitsPerPage: k,
    };

    // fetch the first page of results only
    return this._index.search(request, 1);
  }

  public get searchClient(): Search {
    return this._searchClient;
  }

  public get index(): SearchIndex<DocumentSchema> {
    return this._index;
  }
}
