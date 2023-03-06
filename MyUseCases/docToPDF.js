/*
This code copies a Google Docs file with a specific name as a PDF file and saves it in a specified Google Drive folder using Apps Script.
It uses a custom function to search for the file by name and returns its ID.
*/

function copyDoc() {
  var deletetype = DriveApp.getFilesByName('TEST FILE').next().getMimeType();
  var copyTemplateId = searchDriveFile('TEST FILE');

  var blobs = [];

  var doc = DriveApp.getFileById(copyTemplateId);
  blobs[0] = doc.getBlob().getAs('application/pdf');

  var newFile = DriveApp.getFolderById('FOLDER TO SAVE PDF').createFile(
    blobs[0]
  );
}

// Searched Google Drive for a file name and returns the file ID.
function searchDriveFile(fileName) {
  var files = DriveApp.searchFiles('title = "' + fileName + '"');
  while (files.hasNext()) {
    var file = files.next();
    var id = file.getId();
    return id;
  }
}
