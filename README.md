# Leading board
- Built using full-stack Next.js and Microsoft Azure CosmosDB
- Next.js is a full-stack React framework
- The Microsoft Azure CosmosDB database is used to store the data
- https://docs.microsoft.com/en-us/azure/cosmos-db/introduction
- The frontend side of Next.js sends requests to its own APIs (backend) using Axios to read and write to the database
- The backend side of Next.js reads and writes to the CosmosDB database by sending and receiving requests to the CosmosDB endpoints/APIs
- The requests to CosmosDB needs to be authenticated using the Azure CosmosDB API key which is stored in the .env file

## SPA (create-react-app) vs SSR (next.js)

### SPA
- for JWT authentication
- usually an instance where the server accepts requests from different web apps and mobiles apps
- can still navigate even if the app is disconnected from the internet
- faster because it doesn't need to load the entire app on every page load

### SSR
- for cookie based authentication
- can create session id
- SEO friendly
- can store api_keys
- reverse proxy
- do caching
- rate limiting for DDOS protections
- can't navigate if the app is disconnected from the internet

## Frontend
- React components are located inside the src directory, can be folders named views, components, layouts, etc.
- Web pages are located in the pages directory
- Routes are based on the pathname of folders or Tsx files inside the src/pages directory

## Backend
- APIs codes are located inside the src/pages/api/**
- Endpoints are based on the pathname of folders or Tsx files inside the src/pages/api directory

## Steps
- npx create-next-app my-app --ts
- cd my-app
- code .
- install material-ui
- install react-lottie
- install formik and yup
- azure cosmosdb

## TODOS
- only show the top 20 results
- add ranking numbers from top 1 to top 20
- make sure to sort after adding new profile in the list so that newly added profile will be inserted at the right position
