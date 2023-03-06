function sendMail() {
  //Each numer means the column of the sheets thats going to grab the value
  var first = 0;
  var second = 1;
  var third = 2;

  //In the Column D must have the emails
  var fourth = 3;

  //Specifies the HTML document that going to give the structure of the email
  var emailTemp = HtmlService.createTemplateFromFile('email');

  //Tells wich is the sheet to take information
  //in this case the sheets name is "Data Base"
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data Base');

  //Gives the range of the columns that the information is going to be
  var data = ws.getRange('A1:E' + ws.getLastRow()).getValues();

  //This is an optional filter in the Column F so you can filter wich rows to run
  data = data.filter(function (r) {
    return r[5] == true;
  });

  //To use the variables in between the HTML file your going to use the value after "emailTemp." as <?= fr ?>
  data.forEach(function (row) {
    emailTemp.fr = row[first];
    emailTemp.se = row[second];
    emailTemp.th = row[third];
    var htmlMessage = emailTemp.evaluate().getContent();
    GmailApp.sendEmail(
      row[fourth],
      'HEEERE GOES THE SUBJECT OF THE EMAIL',
      "Your email doesn't support HTML.",
      { name: 'Email', htmlBody: htmlMessage }
    );
  });
}
