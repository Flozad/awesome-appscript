// unmerged all the cells in a new sheet

function unmergeAndCopy() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sourceSheet = ss.getActiveSheet(); // Current active sheet
    var targetSheetName = "Unmerged Copy";  // You can change this

    if(!ss.getSheetByName(targetSheetName)){
      ss.insertSheet(targetSheetName);
    }

    var targetSheet = ss.getSheetByName(targetSheetName);

    // Clear existing data in target sheet
    targetSheet.clear();

    // Get the range of data in the source sheet
    var dataRange = sourceSheet.getDataRange();
    var values = dataRange.getValues();

    // Copy values to the target sheet
    targetSheet.getRange(1, 1, values.length, values[0].length).setValues(values);

    // Unmerge cells in the target sheet and duplicate values
    var mergedRanges = dataRange.getMergedRanges();
    for (var i = 0; i < mergedRanges.length; i++) {
      var range = mergedRanges[i];
      var topRow = range.getRow();
      var topCol = range.getColumn();
      var numRows = range.getNumRows();
      var numCols = range.getNumColumns();
      var value = sourceSheet.getRange(topRow, topCol).getValue(); // get value of top-left cell of the merged range

      // Set the value to all cells in the merged range in the target sheet
      for (var row = topRow; row < topRow + numRows; row++) {
        for (var col = topCol; col < topCol + numCols; col++) {
          targetSheet.getRange(row, col).setValue(value);
        }
      }
    }
  }
