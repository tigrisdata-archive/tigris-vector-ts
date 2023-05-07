import { TigrisClientConfig, TigrisIndexType } from "@tigrisdata/core";

export interface VectorStoreConfig {
  // The configuration for the Tigris client
  connection?: TigrisClientConfig;

  // The name of the index to use for the vector store
  indexName: string;

  // The number of dimensions to use for the vectors
  numDimensions: number;
}

export interface Document {
  content: string;
  metadata?: object;
}

export interface DocumentSchema extends Document, TigrisIndexType {
  id: string;
  vectors: number[];
}
