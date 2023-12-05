function dumpInboxToSpreadsheet() {
  // Open an existing spreadsheet by its ID
  var spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with your Spreadsheet ID
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();

  // Set up the header row (optional if the headers are already set)
  var headers = ["Date", "From", "Subject", "Body"];
  // sheet.appendRow(headers); // Uncomment this line if headers are not already present

  // Fetch inbox emails
  var threads = GmailApp.getInboxThreads();

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var date = message.getDate();
      var from = message.getFrom();
      var subject = message.getSubject();
      var body = message.getPlainBody(); // or getBody() for HTML body

      // Append email details to the sheet
      sheet.appendRow([date, from, subject, body]);
    }
  }

  // Auto-resize columns for better readability
  for (var k = 1; k <= headers.length; k++) {
    sheet.autoResizeColumn(k);
  }

  // Log the URL of the spreadsheet
  Logger.log("Spreadsheet URL: " + spreadsheet.getUrl());
}

// Run this function to execute the script
