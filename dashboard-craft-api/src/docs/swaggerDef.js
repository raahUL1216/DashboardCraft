const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'DashboardCraft API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/raahUL1216/DashboardCraft/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
