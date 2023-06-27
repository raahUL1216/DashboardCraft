/**
 * Checks wether dashboard layout of widgets is valid
 * @param {*} layout
 * @returns boolean
 */
function isDashboardLayoutValid(layout) {
  const occupiedPositions = new Set();

  for (const row of layout) {
    for (const cell of row) {
      const { position } = cell;
      const { row: startRow, col: startCol, sizeX, sizeY } = position;

      // Check for overlapping positions
      for (let rowOffset = 0; rowOffset < sizeY; rowOffset++) {
        for (let colOffset = 0; colOffset < sizeX; colOffset++) {
          const currRow = startRow + rowOffset;
          const currCol = startCol + colOffset;
          const positionKey = `${currRow}-${currCol}`;

          // Check if the position is already occupied
          if (occupiedPositions.has(positionKey)) {
            return false; // Overlapping position found
          }

          // Mark the position as occupied
          occupiedPositions.add(positionKey);
        }
      }
    }
  }

  return true; // No overlapping positions found
}

module.exports = { isDashboardLayoutValid };
