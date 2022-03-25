// This function will clear the content on column B except header
function clearCell() {
  var ss = SpreadsheetApp.getActive();
  const sh = ss.getSheets()[0];
  sh.getRange('B2:B').clearContent();
}
