// example url: https://googlesheeturl?file_id=12345
function doGet(e) {
  var file_id = e.parameter.file_id;
  
  console.log(file_id);
  console.log("data");
  
  var files = DriveApp.getFileById(file_id);
  var filePermission = files.setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.NONE)
                                 .setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.NONE);

  var content = {'file_id': file_id}
  return ContentService.createTextOutput(JSON.stringify(content) ).setMimeType(ContentService.MimeType.JSON); 
}
