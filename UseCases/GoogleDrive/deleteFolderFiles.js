// Deletes all the files inside the folder
function deleteFolderFiles() {
  var folder = DriveApp.getFolderById('PUT FOLDER ID HERE');
  var files = folder.getFiles();
  while (files.hasNext()) {
    files.next().setTrashed(true);
  }
}
