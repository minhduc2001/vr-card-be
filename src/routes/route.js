const userRouter = require('./user.router');
// const authRouter = require("./authRouter");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documents',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./src/routes/*.router.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

const router = (app) => {
  app.get('/home', (req, res) => {
    return res.render('home', { layout: 'main' });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  // app.use("/api/auth", swaggerUi.serve, authRouter);
  app.use('/api/users', userRouter);
};

module.exports = router;
