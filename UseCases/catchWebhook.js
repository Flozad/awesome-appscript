// Example url: https://googlesheeturl?item_id=12345&name=test
// To generate a webhook url, deploy as webapp and copy the url from the webapp page

// for GET request
function doGet(e) {
  var item_id = e.parameter.item_id; //item_id = 12345**

  var name = e.parameter.name; //name = test**

  // do what you need to with the** **item_id**

  return /* your_data_after_doing_what_you_need */;
}

// for POST request
function doPost(e) {
  if (typeof e !== 'undefined') var ss = SpreadsheetApp.openById('ID here');
  var sheet = ss.getSheetByName('Sheet2');
  sheet.getRange(1, 1).setValue(JSON.stringify(e));
  return ContentService.createTextOutput(JSON.stringify(e));
}
