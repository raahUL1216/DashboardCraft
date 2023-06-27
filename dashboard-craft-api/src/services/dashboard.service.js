const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const { Dashboard } = require('../models');
const { isDashboardLayoutValid } = require('../validations/layout.validation');

const mongoose = require('mongoose');

/**
 * Create a dashboard
 * @param {Object} dashboardBody
 * @param {ObjectId} userId
 * @returns {Promise<Dashboard>}
 */
const createDashboard = async (dashboardBody, userId) => {
  const { layout } = dashboardBody;
  const isLayoutValid = isDashboardLayoutValid(layout);

  console.log(isLayoutValid);
  if (!isLayoutValid) {
    throw new Error('Ensure that widget position are not overlapping.');
  }

  // add owner to dashboard document
  dashboardBody.owner_id = mongoose.Types.ObjectId(userId);
  dashboardBody.shared_with = [];

  return Dashboard.create(dashboardBody);
};

/**
 * Get dashboard
 * @param {ObjectId} dashboardId
 * @param {ObjectId} userId
 * @returns {Promise<Dashboard>}
 */
const getDashboard = async (dashboardId, userId) => {
  const dashboard = Dashboard.findById(dashboardId);

  // check if user has access to requested dashboard
  if (dashboard.owner_id.equals(userId) || dashboard.shared_with.includes(userId)) {
    return dashboard;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Contact dashboard owner for view access.');
  }
};

/**
 * Update a dashboard
 * @param {ObjectId} dashboardId
 * @param {Object} updateBody
 * @param {ObjectId} userId
 * @returns {Promise<Dashboard>}
 */
const updateDashboard = async (dashboardId, updateBody, userId) => {
  const dashboard = await Dashboard.findById(dashboardId);

  if (!dashboard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard not found.');
  }

  // only dashboard owner can update the dashboard
  if (!dashboard.owner_id.equals(userId)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Contact dashboard owner to update the dashboard.');
  }

  const { layout } = updateBody;
  const isLayoutValid = isDashboardLayoutValid(layout);

  if (!isLayoutValid) {
    throw new Error('Ensure that widget position are not overlapping.');
  }

  Object.assign(dashboard, updateBody);
  await dashboard.save();
  return dashboard;
};

/**
 * Delete dashboard
 * @param {ObjectId} dashboardId
 * @param {ObjectId} userId
 * @returns {void}
 */
const deleteDashboard = async (dashboardId, userId) => {
  const dashboard = await Dashboard.findById(dashboardId);

  if (!dashboard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard not found.');
  }

  if (!dashboard.owner_id.equals(userId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact dashboard owner to remove given dashboard.');
  }

  await dashboard.remove();
};

/**
 * Share dashboard to another user
 * @param {ObjectId} dashboardId
 * @param {ObjectId} userId
 * @returns {void}
 */
const shareDashboard = async (dashboardId, ownerId, userId) => {
  const dashboard = await Dashboard.findById(dashboardId);

  if (!dashboard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dashboard not found.');
  }

  if (!dashboard.owner_id.equals(ownerId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Only dashboard owner can share access to another user.');
  }

  await Dashboard.findOneAndUpdate(
    { _id: dashboardId },
    { $push: { shared_with: mongoose.Types.ObjectId(userId) } },
    { new: true }
  );
};

module.exports = {
  createDashboard,
  getDashboard,
  updateDashboard,
  deleteDashboard,
  shareDashboard
};
