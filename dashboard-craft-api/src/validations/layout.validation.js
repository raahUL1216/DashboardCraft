function validateWidgetPosition(layout, widget) {
  const { row, col, sizeX, sizeY } = widget.position;

  // Get the maximum rows and columns in the grid layout
  const maxRows = layout.length;
  const maxCols = layout[0].length;

  // Ensure widget is within grid boundaries
  if (row < 0 || row >= maxRows || col < 0 || col >= maxCols) {
    throw new Error('Widget position is outside the grid boundaries.');
  }

  // Ensure widget does not exceed grid size
  if (row + sizeY > maxRows || col + sizeX > maxCols) {
    throw new Error('Widget size exceeds the available grid space.');
  }

  // Ensure there are no overlapping widgets
  for (let i = row; i < row + sizeY; i++) {
    for (let j = col; j < col + sizeX; j++) {
      if (layout[i][j]) {
        throw new Error('Widget overlaps with another widget on the grid.');
      }
    }
  }

  // Check if widget position exceeds the grid boundaries
  if (
    position.col < 0 ||
    position.row < 0 ||
    position.col + position.sizeX > layout[0].length ||
    position.row + position.sizeY > layout.length
  ) {
    throw new Error('Widget position exceeds the grid boundaries.');
  }

  // Check if widget width exceeds the fixed screen width
  const screenWidth = layout[0].length; // Assuming the screen width is equal to the number of columns in the layout
  if (position.col + position.sizeX > screenWidth) {
    throw new Error('Widget width exceeds the fixed screen width.');
  }

  // All validations passed
  return true;
}


const layout = [
  [{}, { widgetId: 'widget1' }, { widgetId: 'widget2' }],
  [{ widgetId: 'widget3' }, {}, { widgetId: 'widget4' }],
  [{ widgetId: 'widget5' }, { widgetId: 'widget6' }, {}],
];

const widget = {
  position: {
    row: 1,
    col: 2,
    sizeX: 2,
    sizeY: 1,
  },
};

try {
  validateWidgetPosition(layout, widget);
  console.log('Widget position is valid.'); // Will be printed if validation passes
} catch (error) {
  console.error('Widget position is not valid:', error.message); // Will be printed if validation fails
}
