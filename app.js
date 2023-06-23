require('express-async-errors');
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const { logger, startup } = require('./src/utils');

const { exception, response } = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true, origin: true }));
app.use(
  session({
    name: 'ecommerce-test',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION,
      collectionName: 'sessions',
    }),
  })
);

app.use(response);

// Requests logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);

  next();
});

app.use('/', routes);

app.use(exception);

app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: 'Not Found' });
});

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');

    return startup();
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
  });

app.on('uncaughtException', (err) => {
  logger.error(`Fatal Error: ${err.message}`);

  process.exit(1);
});

const port = parseInt(process.env.PORT, 10);
try {
  app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
} catch (e) {
  logger.error(`During Startup: ${e.message}`);

  process.exit(1);
}
