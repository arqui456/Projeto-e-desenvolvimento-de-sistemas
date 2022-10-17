const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const routes = require('./routes');
require('./database');

const swaggerDocs = require('./swagger.json');

const config = {
    name: 'sample-express-app',
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(express.json());
app.use(cors());
app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use(routes);


app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
