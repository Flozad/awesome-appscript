function removeCopyOfPrefix() {
    // Replace with the ID of the folder where you want to remove "Copy of" from filenames
    var folderId = "fodler__ID";

    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFilesByType(MimeType.GOOGLE_DOCS);

    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName();

      if (fileName.indexOf("Copy of ") === 0) {
        var newFileName = fileName.substring(8); // Remove "Copy of " prefix
        file.setName(newFileName);
      }
    }
  }