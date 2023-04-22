# Vector Search API Example

This example shows how to implement a **Vector Search API with TypeScript** using
[OpenAI](https://platform.openai.com/),
[Express](https://expressjs.com/) and
[Tigris TypeScript SDK](https://docs.tigrisdata.com/typescript/).

## Getting started

### 1. Download the example

Download this example:

```
npx create-tigris-app@latest --example vector-search-openai
```

The above command will also take care of installing the dependencies.

```shell
✔ What is your project named? … /Users/ovaistariq/projects/vectorsearchapp
✔ What is the clientId? … my_id
✔ What is the clientSecret? … *********
Creating a new app in /Users/ovaistariq/projects/vectorsearchapp.

Downloading files for example vector-search-openai. This might take a moment.

Initializing project with template: vector-search-openai

Using npm.

Installing dependencies:
- @tigrisdata/core: 1.0.0-beta.43
- express: 4.18.2
- openai: 3.2.1


added 245 packages, and audited 246 packages in 5s

35 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Initialized a git repository.

Success! Created vectorsearchapp at /Users/ovaistariq/projects/vectorsearchapp

Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm start
    Runs the built app in production mode.

We suggest that you begin by typing:

  cd /Users/ovaistariq/projects/vectorsearchapp
  npm run dev
```

### 2. Setup OpenAI API credentials

This project uses OpenAPI APIs to generate embeddings for the documents
that are stored in the search index.

The OpenAI API uses API keys for authentication. You will need the
OpenAI-Organization and API key to be able to authenticate with.
Visit your [API Keys](https://platform.openai.com/account/api-keys) page to
retrieve the API key you'll use in your requests.

Then update the `.env` file and add the following:

```env
OPENAI_ORG=your_org_here
OPENAI_API_KEY=your_api_key_here
```

### 2. Seed the search index

We will be using 1000 records from the
[Amazon Fine Food Reviews](https://www.kaggle.com/datasets/snap/amazon-fine-food-reviews?resource=download)
dataset.

```shell
npm run seed
```

This will read the data from [scripts/data/reviews.csv](scripts/data/reviews.csv),
generate the embeddings using OpenAI API and store the data in Tigris search index.

### 3. Start the REST Search API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now run the API
requests, e.g.
[http://localhost:3000/search](http://localhost:3000/search).

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/search?searchString={searchString}&page={page}&size={size}&orderBy={orderBy}`: Fetch all movies
  - Query Parameters
    - `searchString` (required): This specifies the search string that is used
      to fetch the relevant documents from the search index
    - `size` (optional): This specifies how many movies should be returned in
      the result
    - `page` (optional): This specifies the page number to be returned when
      there are more than one page of search results

## Next steps

- Check out the [Tigris docs](https://docs.tigrisdata.com/)
- Join our [Discord server](http://discord.tigrisdata.com/) and share your
  feedback
