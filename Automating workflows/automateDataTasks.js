// Description: This script sorts, filters, and copies data from one sheet to another.

function automateDataTasks() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getDataRange();

  // Sort data by column A in ascending order
  dataRange.sort({ column: 1, ascending: true });

  // Filter data to only show rows where column B contains 'Apple'
  dataRange.autoFilter(2, 'Apple');

  // Copy data from filtered range to another sheet
  var filteredDataRange = sheet.getFilter().getRange();
  var targetSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Filtered Data');
  filteredDataRange.copyTo(targetSheet.getRange(1, 1));

  // Clear filter and unsort data
  sheet.getFilter().remove();
  dataRange.sort({ column: 1, ascending: false });
}
