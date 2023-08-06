// Convert Google Sheet to Microsoft Excel
function convertSheetToXLSX(sheetId) {
  var spreadsheetName = 'My Spreadsheet';

  // Set the ID of the folder you want to store
  var destination = DriveApp.getFolderById('folder id to save');

  // API call to convert Sheet
  var url =
    'https://docs.google.com/feeds/download/spreadsheets/Export?key=' +
    sheetId +
    '&exportFormat=xlsx';
  var params = {
    method: 'get',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  };
  var blob = UrlFetchApp.fetch(url, params).getBlob();
  blob.setName(spreadsheetName + '.xlsx');

  // Creates Excel in the Folder defined in destination
  destination.createFile(blob);
}
