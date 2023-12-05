// description: This is a simple example of how to use a google doc as a template and replace text in it with data from a google sheet.

function createCustomDoc(templateId, Name) {
    var source = DriveApp.getFileById(templateId);
    var newDoc = source.makeCopy();
    SpreadsheetApp.flush(); // clean up the process and refresh changes
    var doc = DocumentApp.openById(newDoc.getId());
    var body = doc.getBody();

    body.replaceText("{{ Name }}", Name); // replaces {{ Name }} with Name in the google doc


    doc.saveAndClose(); // Save the changes and close the document
    SpreadsheetApp.flush();

    return newDoc;
}
