function cloneGoogleSheet() {
  // Get Folder to copy the file
  var folder = DriveApp.getFolderById("FOLDER ID");
  
  // Make a copy of "Template" Sheet
  var sheet = DriveApp.getFileById('TEMPLATE SHEET ID').makeCopy('ss', folder);
  var sheetId = DriveApp.getFilesByName('ss').next().getId();
  Logger.log(sheetId)
  //Destination cells in order
  var destinationOrdered = ['C4','J4','C5','J6','C26','D26','C28','D28','C29','D29','E29','F29','C30','C31','C34','C35','D35','C36','C37','C38','D38','C44','C45','C46','C48','D48','C51','D51','C53','D53','C54','D54','C55','D55','C56','D56','C57','D57','C61','D61','C63','D63','C64','D64','C65','D65','C66','D66','C68','C73','C75','C77','C78','C81','C83','C85','C86','C88'];
  // gets last row
  var sheetIdB = DriveApp.getFilesByName('NAME OF SHEET TO GRAB DATA').next().getId();
  var rowNumber = SpreadsheetApp.openById(sheetIdB).getDataRange().getNumRows();
  var values = SpreadsheetApp.openById(sheetIdB).getRange(rowNumber + ':' + rowNumber).getValues();
  Logger.log(values)
  var valuesArray = values[0];

  //Making Data compatible with dropdowns
  if(valuesArray[0]=="Yes"){valuesArray[0]="Joint"}else{valuesArray[0]="Single"}
  if(valuesArray[2]=="Yes"){valuesArray[2]="First Time Buyer"}else{valuesArray[2]="Second Time Buyer"}
  if(valuesArray[24]=="PAYE"){valuesArray[24]="Payee"}
  if(valuesArray[25]=="PAYE"){valuesArray[25]="Payee"}

  var copiedSheet = SpreadsheetApp.openById(sheetId);

  // replaces  in new sheet
  for(var i = 0;i<destinationOrdered.length;i++){
  
  
  var value = valuesArray[i];
  Logger.log(value)
  var change = SpreadsheetApp.openById(sheetId).getSheetByName('SHEET TO FIT DATA IN').getRange(destinationOrdered[i]).setValue(valuesArray[i]);
  SpreadsheetApp.flush();
  Utilities.sleep(100);
  SpreadsheetApp.flush();
  }
  convertSheetToXLSX(sheetId)

}

// Convert sheet to excel function
function convertSheetToXLSX(sheetId) {
  
  var spreadsheetName = "My Spreadsheet";
  var destination = DriveApp.getFolderById("folder to save id");
  var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + sheetId + "&exportFormat=xlsx";  
  var params = {
    method      : "get",
    headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true
  };
  var blob = UrlFetchApp.fetch(url, params).getBlob();
  blob.setName(spreadsheetName + ".xlsx");
  destination.createFile(blob);
}
