const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { Widget } = require('../models');

/**
 * Create a widget
 * @param {Object} widgetBody
 * @returns {Promise<Widget>}
 */
const createWidget = async (widgetBody) => {
  return Widget.create(widgetBody);
};

/**
 * Get widget by id
 * @param {string} widgetId
 * @returns {Promise<Widget>}
 */
const getWidget = async (widgetId) => {
  return Widget.findById(widgetId);
};

/**
 * Update widget by id
 * @param {ObjectId} widgetId
 * @param {Object} updateBody
 * @returns {Promise<Widget>}
 */
const updateWidget = async (widgetId, updateBody) => {
  const widget = await Widget.findById(widgetId);

  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Widget not found');
  }

  Object.assign(widget, updateBody);
  await widget.save();
  return widget;
};

/**
 * Delete widget by id
 * @param {ObjectId} widgetId
 * @returns {Promise<Widget>}
 */
const deleteWidget = async (widgetId) => {
  const widget = await Widget.findById(widgetId);

  if (!widget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Widget not found');
  }
  await widget.remove();
  return widget;
};

module.exports = {
  createWidget,
  getWidget,
  updateWidget,
  deleteWidget,
};
