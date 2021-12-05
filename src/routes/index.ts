import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../../openapi.json";
import consumerRoutes from "./routes.consumer";
import producerRoutes from "./routes.producer";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

const applyRoutes = (app: Application) => {
  app.use("/api", producerRoutes);
  app.use("/api", consumerRoutes);

  if (process.env.NODE_ENV !== "production") {
    app.use("/dev/api-docs", swaggerUi.serve);
    app.get("/dev/api-docs", swaggerUi.setup(apiSpec, swaggerUiOptions));
  }
  return app;
};

export default applyRoutes;
