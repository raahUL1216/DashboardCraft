const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { widgetService } = require('../services');

const createWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.createWidget(req.body);
  res.status(httpStatus.CREATED).send(widget);
});

const getWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.getWidget(req.params.id);
  res.status(httpStatus.OK).send(widget);
});

const updateWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.updateWidget(req.params.id, req.body);
  res.status(httpStatus.OK).send(widget);
});

const deleteWidget = catchAsync(async (req, res) => {
  const widget = await widgetService.deleteWidget(req.params.id);
  res.status(httpStatus.OK).send(widget);
});

module.exports = {
  createWidget,
  getWidget,
  updateWidget,
  deleteWidget,
};
