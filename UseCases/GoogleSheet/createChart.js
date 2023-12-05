// Description: Create a chart in a spreadsheet

function createChart() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange('A1:B10');
  var chart = sheet
    .newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(dataRange)
    .setPosition(1, 1, 0, 0)
    .build();
  sheet.insertChart(chart);
}
