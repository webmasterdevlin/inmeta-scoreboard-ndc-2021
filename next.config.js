module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    cosmos: {
      endpoint: "https://scoreboard-dev.documents.azure.com:443/",
      key: "1RUu8EXcVMJGse8GlhrQcL8eTq8z9jXyKxDLWNof5V72opNB6Pc4HGJGa0XHc8oQ3h9rvuwi6djssDTMIuKzAg==",
      databaseId: "ScoreCardDb",
      containerId: "ScoreCardContainer",
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
