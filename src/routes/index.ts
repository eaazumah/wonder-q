import { Application } from "express";
import consumerRoutes from "./routes.consumer";
import producerRoutes from "./routes.producer";

const applyRoutes = (app: Application) => {
  app.use("/api", producerRoutes);
  app.use("/api", consumerRoutes);
  return app;
};

export default applyRoutes;
