// The function importCsvFromDrive() is used to import a CSV file from Google Drive into a Google Sheet.

function importCsvFromDrive() {
  var file = DriveApp.getFilesByName('filename.csv').next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
