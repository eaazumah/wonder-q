import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

const createExpressApp = () => {
  const app: Application = express();

  // Express configuration

  app.use(compression());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '50mb' }));

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false
    })
  );
  app.use(helmet.hidePoweredBy());
  app.disable('x-powered-by');
  app.use(cors());

  app.get('/', (_: Request, res: Response) => {
    res.send('Hello world!');
  });

  return app;
};

export default createExpressApp;
