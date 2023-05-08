# Tigris Vector Database Client Library for TypeScript

[![build](https://github.com/tigrisdata/tigris-vector-ts/actions/workflows/ts-ci.yaml/badge.svg?branch=main)](https://github.com/tigrisdata/tigris-vector-ts/actions/workflows/ts-ci.yaml)
[![codecov](https://codecov.io/gh/tigrisdata/tigris-vector-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/tigrisdata/tigris-vector-ts)
[![GitHub](https://img.shields.io/github/license/tigrisdata/tigris-vector-ts)](https://github.com/tigrisdata/tigris-vector-ts/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/1033842669983633488?color=%23596fff&label=Discord&logo=discord&logoColor=%23ffffff)](https://tigris.dev/discord)
[![Twitter Follow](https://img.shields.io/twitter/follow/tigrisdata?style=social)](https://twitter.com/tigrisdata)

# Getting Started

Tigris makes it easy to build AI applications with vector embeddings.
It is a fully managed cloud-native database that allows you store and index
documents and vector embeddings for fast and scalable vector search.

## 1. Install the client library

```shell
npm install @tigrisdata/vector
```

## 2. Fetch Tigris API credentials

You can sign up for a free Tigris account [here](https://console.preview.tigrisdata.cloud/signup).

Once you have signed up for the Tigris account, create a new project called `vectordemo`.
Next, make a note of the `clientId` and `clientSecret`, which you can get from the
**Application Keys** section of the project.

## 3. Create the Vector Database client

```ts
import { VectorDocumentStore } from "@tigrisdata/vector";

const vectorDocStore = new VectorDocumentStore({
  connection: {
    serverUrl: "api.preview.tigrisdata.cloud",
    projectName: "vectordemo",
    clientId: "clientId_here",
    clientSecret: "clientSecret_here",
  },
  indexName: "my_index",
  numDimensions: 3,
});
```

Here, we have created a new `VectorDocumentStore` instance that connects to the
Tigris Vector Database. The `indexName` is the name of the index that will store
your embeddings, documents, and any additional metadata. You can use any name
you like for the index. The `numDimensions` is the number of dimensions of the
vector embeddings.

## 4. Add documents to the index

```ts
await vectorDocStore.addDocumentsWithVectors({
  ids: ["id1", "id2"],
  embeddings: [
    [1.2, 2.3, 4.5],
    [6.7, 8.2, 9.2],
  ],
  documents: [
    {
      content: "This is a document",
      metadata: {
        title: "Document 1",
      },
    },
    {
      content: "This is another document",
      metadata: {
        title: "Document 2",
      },
    },
  ],
});
```

Here, we have added two documents to the index. The `ids` are the unique
identifiers for the documents. The `embeddings` are the vector embeddings for
the documents. The `documents` are the actual documents that you want to store
in the index. The `content` is the text content of the document. The `metadata`
is any additional metadata that you want to store for the document.

## 5. Query the index

You can query the index for the top `k` most similar documents to a given
vector. It's that simple!

```ts
const results = await vectorDocStore.similaritySearchVectorWithScore({
  query: [1.0, 2.1, 3.2],
  k: 10,
});
console.log(JSON.stringify(results, null, 2));
```

## 6. Enhance the query with attribute filtering

You can enhance the query with attribute filtering. For example, you can
filter the results by a given metadata field.

```ts
const results2 = await vectorDocStore.similaritySearchVectorWithScore({
  query: [1.0, 2.1, 3.2],
  k: 10,
  filter: {
    "metadata.title": "Document 1",
  },
});
console.log(JSON.stringify(results2, null, 2));
```

## Next Steps

Tigris Vector Database is simple enough to get started with, but powerful
enough to build real-world applications.

Tigris provides the following features:

- High performance: Tigris is built from the ground up to provide fast
  vector search. It is optimized for low-latency vector search and high
  throughput.
- Real-time: Tigris provides real-time updates to the index. You can add,
  update, and delete documents and embeddings in real-time.
- Hybrid search: Tigris supports hybrid search, which allows you to
  combine vector search with attribute filtering for more relevant search
  results.
- Fully managed: Tigris is a fully managed cloud-native database. You
  can get started with Tigris in minutes and scale as needed with ease.

# Contributing

## Building

```

# clean the dev env

npm run clean

# build

npm run build

# test

npm run test

# lint

npm run lint

```

## Code Quality

### 1. Linting

The coding style rules are defined by [Prettier](https://prettier.io/) and
enforced by [Eslint](https://eslint.org)

### 2. Git Hooks

We use [pre-commit](https://pre-commit.com/index.html) to automatically
setup and run git hooks.

Install the pre-commit hooks as follows:

```shell
pre-commit install
```

On every `git commit` we check the code quality using prettier and eslint.

# License

This software is licensed under the [Apache 2.0](LICENSE).

# Contributors

Thanks to all the people who contributed!

<a href="https://github.com/tigrisdata/tigris-vector-ts/graphs/contributors">
	<img src="https://contrib.rocks/image?repo=tigrisdata/tigris-vector-ts" />
</a>
