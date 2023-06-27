const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const widgetRoute = require('./widget.route');
const dashboardRoute = require('./dashboard.route');

const docsRoute = require('./docs.route');

const config = require('../../config/config');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/widget',
    route: widgetRoute
  },
  {
    path: '/dashboard',
    route: dashboardRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// routes available only in development mode
if (config.env === 'development') {
  const devRoutes = [
    {
      path: '/docs',
      route: docsRoute,
    },
  ];

  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
