import { createServer } from "http";
import schema from "./graphql/schema";
import applyRoutes from "./routes/index";
import startApolloServer from "./server/apollo.server";
import createExpressApp from "./server/create.express.app";
import createSubscriptionServer from "./server/subscription.server";
import logResponseTime from "./utils/log-response-time";

const startApp = async () => {
  try {
    const PORT = process.env.PORT || 7000;

    let app = createExpressApp();
    const httpServer = createServer(app);

    app.use(logResponseTime);
    app = applyRoutes(app);

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
