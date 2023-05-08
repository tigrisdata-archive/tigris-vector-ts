const mockGetSearch = jest.fn().mockImplementation(() => {
  return {
    createOrUpdateIndex: jest.fn().mockImplementation(() => {
      return {
        createOrReplaceMany: jest.fn(),
        deleteMany: jest.fn(),
        deleteByQuery: jest.fn(),
        getMany: jest.fn().mockImplementation(() => {
          return [
            {
              document: {
                content: "testContent",
                metadata: { test: "test" },
              },
              meta: {},
            },
          ];
        }),
        search: jest.fn().mockImplementation(() => {
          return {
            hits: [
              {
                document: {
                  content: "testContent",
                  metadata: { test: "test" },
                },
                meta: {
                  textMatch: {
                    vectorDistance: 0.5,
                  },
                },
              },
            ],
          };
        }),
      };
    }),
    deleteIndex: jest.fn(),
  };
});

jest.mock("@tigrisdata/core", () => {
  return {
    Tigris: jest.fn().mockImplementation(() => {
      return { getSearch: mockGetSearch };
    }),
    TigrisDataTypes: {
      STRING: "string",
      OBJECT: "object",
      ARRAY: "array",
      NUMBER: "number",
    },
  };
});

import { Tigris, TigrisDataTypes } from "@tigrisdata/core";
import { VectorDocumentStore, VectorStoreConfig } from "../index";

const config: VectorStoreConfig = {
  indexName: "testIndex",
  numDimensions: 10,
  connection: {
    serverUrl: "http://localhost:8080",
    projectName: "testProject",
    clientId: "testId",
    clientSecret: "testSecret",
  },
};

const indexSchema = {
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
    dimensions: 10,
  },
};

it("should create a Tigris search client", () => {
  new VectorDocumentStore(config);

  expect(Tigris).toHaveBeenCalledWith(config.connection);
  expect(mockGetSearch).toHaveBeenCalled();
});

it("should create an index with the correct schema", async () => {
  const vectorStore = new VectorDocumentStore(config);
  const searchClient = vectorStore.searchClient;

  await vectorStore.enusreIndex();

  expect(searchClient.createOrUpdateIndex).toHaveBeenCalledWith(
    config.indexName,
    indexSchema
  );
});

it("should delete an index", async () => {
  const vectorStore = new VectorDocumentStore(config);
  const searchClient = vectorStore.searchClient;

  await vectorStore.deleteIndex();

  expect(searchClient.deleteIndex).toHaveBeenCalledWith(config.indexName);
});

it("should create documents with the correct schema", async () => {
  const vectorStore = new VectorDocumentStore(config);

  const documents = [
    {
      id: "testId",
      content: "testContent",
      metadata: { test: "test" },
      vectors: [1, 2, 3, 4, 5],
    },
  ];

  await vectorStore.addDocumentsWithVectors({
    ids: ["testId"],
    embeddings: [[1, 2, 3, 4, 5]],
    documents: [
      {
        content: "testContent",
        metadata: { test: "test" },
      },
    ],
  });
  const index = vectorStore.index;

  expect(index.createOrReplaceMany).toHaveBeenCalledWith(documents);
});

it("should delete documents with the correct schema", async () => {
  const vectorStore = new VectorDocumentStore(config);

  await vectorStore.deleteDocuments(["testId"]);
  const index = vectorStore.index;

  expect(index.deleteMany).toHaveBeenCalledWith(["testId"]);
});

it("should get documents with the correct schema", async () => {
  const vectorStore = new VectorDocumentStore(config);

  await vectorStore.getDocuments(["testId"]);
  const index = vectorStore.index;

  expect(index.getMany).toHaveBeenCalledWith(["testId"]);
});

it("should search for documents with the correct schema", async () => {
  const vectorStore = new VectorDocumentStore(config);

  const query = {
    query: [1.1, 2.2, 3.3, 4.4, 5.5],
    k: 10,
  };

  await vectorStore.similaritySearchVector(query);
  const index = vectorStore.index;

  expect(index.search).toHaveBeenCalledWith(
    {
      filter: undefined,
      hitsPerPage: 10,
      vectorQuery: {
        vectors: [1.1, 2.2, 3.3, 4.4, 5.5],
      },
    },
    1
  );
});
