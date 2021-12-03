import { createServer } from "http";
import schema from "./graphql/schema";
import startApolloServer from "./server/apollo.server";
import createExpressApp from "./server/create.express.app";
import createSubscriptionServer from "./server/subscription.server";

const startApp = async () => {
  try {
    const PORT = process.env.PORT || 7000;

    const app = createExpressApp();
    const httpServer = createServer(app);

    const subscriptionServer = createSubscriptionServer({
      schema,
      httpServer,
    });

    const apolloServer = await startApolloServer({
      app,
      schema,
      subscriptionServer,
    });

    app.use((_req, res) => {
      res.status(404).send("Unable to find the requested resource!");
    });

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
      console.log(
        `🚀GraphQL Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
