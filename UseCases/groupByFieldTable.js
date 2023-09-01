// You can group by an attribute, add to a new table and have them collapsable
function onEdit() {
  // Get active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Get the sheet where the edit occurred
  var activeSheet = ss.getActiveSheet();

  // If the edit is done on the main sheet, then perform the grouping
  if (activeSheet.getName() === "Main") {
    groupByField("Client");
  }
}

function groupByField(fieldName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("Main");
  var targetSheet = ss.getSheetByName(fieldName);

  // Clear existing content in the target sheet, except for the header row
  targetSheet
    .getRange("A2:" + targetSheet.getLastColumn() + targetSheet.getLastRow())
    .clear();
  // Get all values from the main sheet
  var values = mainSheet.getDataRange().getValues();

  // Store headers
  var headers = values[0];

  // Object to hold the grouped records
  var groupedData = {};

  // Loop through each row in the main sheet
  for (var i = 1; i < values.length; i++) {
    // Starting from 1 to skip the header row
    var row = values[i];
    var key = row[headers.indexOf(fieldName)];

    if (!groupedData[key]) {
      groupedData[key] = [];
    }

    groupedData[key].push(row);
  }

  // Write the grouped data to the target sheet
  var rowIndex = 2; // Starting row index
  for (var key in groupedData) {
    targetSheet.appendRow([key].concat(headers)); // Append the group name with headers
    rowIndex++;
    var startRowIndex = rowIndex;

    for (var i = 0; i < groupedData[key].length; i++) {
      targetSheet.appendRow([""].concat(groupedData[key][i])); // Append empty cell for group name, then the row data
      rowIndex++;
    }

    // Collapse rows
    if (groupedData[key].length > 1) {
      targetSheet
        .getRange(startRowIndex, 1, groupedData[key].length, headers.length + 1)
        .shiftRowGroupDepth(1);
    }
  }
}
