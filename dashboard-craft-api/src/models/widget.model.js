const mongoose = require('mongoose');

const { toJSON } = require('./plugins');
const { widgetTypes } = require('../config/widget-type');

const widgetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: widgetTypes,
    required: true,
  },
  data_source: {
    type: String,
    required: true,
  },
  // can have additional configurations like labels, colors etc.
  configuration: {
    type: mongoose.Schema.Types.Mixed,
  },
});

// add plugin that converts mongoose to json
widgetSchema.plugin(toJSON);

/**
 * @typedef Widget
 */
const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
