// the function importFormResponses() imports all responses from a Google Form to a Google Sheet.

function importFormResponses() {
  var form = FormApp.openById('form_id');
  var sheet = SpreadsheetApp.getActiveSheet();
  var formResponses = form.getResponses();
  var data = [];
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    var row = [];
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      row.push(itemResponse.getResponse());
    }
    data.push(row);
  }
  sheet
    .getRange(sheet.getLastRow() + 1, 1, data.length, data[0].length)
    .setValues(data);
}
