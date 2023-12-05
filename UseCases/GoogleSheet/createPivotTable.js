// Description: This script creates a pivot table from a range of data in a spreadsheet. The pivot table is created in the same sheet as the data range. The pivot table has a row group, a column group, and a values group. The row group is the first column of the data range. The column group is the second column of the data range. The values group is the third column of the data range. The values group uses the SUM aggregation type.

function createPivotTable() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange('A1:C10');
  var pivotTable = sheet.insertPivotTable(dataRange);
  pivotTable.addRowGroup(0);
  pivotTable.addColumnGroup(1);
  pivotTable.setValuesGroup(2, Sheets.AggregationType.SUM);
}
