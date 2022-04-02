import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import '@shared/container';
import errorsHandler from './middlewares/errorsHandler';
import celebrateErrorHandler from './middlewares/celebrateErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(celebrateErrorHandler);
app.use(errorsHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
