// Description: This script cleans and transforms data in a Google Sheet. It uses the REGEXEXTRACT, IF, and VLOOKUP functions.

function cleanAndTransformData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();

  for (var i = 0; i < dataValues.length; i++) {
    var row = dataValues[i];

    // Clean and transform data using REGEXEXTRACT and IF functions
    row[0] = row[0].replace(/\s+/g, ''); // Remove whitespace
    row[1] = row[1].replace(/[^a-zA-Z]/g, ''); // Remove non-letter characters
    row[2] = row[2].replace(/\$/g, ''); // Remove dollar signs
    row[3] = row[3] ? 'Yes' : 'No'; // Convert boolean to string

    // Transform data using VLOOKUP function
    var lookupValue = row[4];
    var lookupRange = sheet.getRange('E:F');
    var lookupValues = lookupRange.getValues();
    for (var j = 0; j < lookupValues.length; j++) {
      if (lookupValues[j][0] === lookupValue) {
        row[4] = lookupValues[j][1];
        break;
      }
    }
  }

  // Write cleaned and transformed data back to sheet
  dataRange.setValues(dataValues);
}
