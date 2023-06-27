const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { dashboardService } = require('../services');

const createDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.createDashboard(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(dashboard);
});

const getDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.getDashboard(req.params.id, req.user._id);
  res.status(httpStatus.CREATED).send(dashboard);
});

const updateDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.updateDashboard(req.params.id, req.body, req.user._id);
  res.status(httpStatus.CREATED).send(dashboard);
});

const deleteDashboard = catchAsync(async (req, res) => {
  await dashboardService.deleteDashboard(req.params.id, req.user._id);
  res.status(httpStatus.CREATED).send('Dashboard deleted successfully.');
});

const shareDashboard = catchAsync(async (req, res) => {
  const dashboardOwner = req.user._id;
  const shareWith = req.params.userId;

  await dashboardService.shareDashboard(req.params.id, dashboardOwner, shareWith);

  res.status(httpStatus.CREATED).send(`Shared dashboard with user: ${shareWith}`);
});

module.exports = {
  createDashboard,
  getDashboard,
  updateDashboard,
  deleteDashboard,
  shareDashboard
};
