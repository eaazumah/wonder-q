import { createServer } from "http";
import createExpressApp from "./server/create.express.app";

const startApp = async () => {
  try {
    const PORT = process.env.PORT || 7000;

    const app = createExpressApp();
    const httpServer = createServer(app);

    app.use((_req, res) => {
      res.status(404).send("Unable to find the requested resource!");
    });

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
