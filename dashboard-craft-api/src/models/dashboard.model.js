const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const dashboardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  layout: [
    [
      {
        widget: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Widget',
        },
        position: {
          row: {
            type: Number,
            required: true,
          },
          col: {
            type: Number,
            required: true,
          },
          sizeX: {
            type: Number,
            required: true,
          },
          sizeY: {
            type: Number,
            required: true,
          },
        },
      },
    ],
  ],
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shared_with: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  updated_at: {
    type: Date,
    default: () => Date.now(),
  },
});

// add plugin that converts mongoose to json
dashboardSchema.plugin(toJSON);

/**
 * @typedef Widget
 */
const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
