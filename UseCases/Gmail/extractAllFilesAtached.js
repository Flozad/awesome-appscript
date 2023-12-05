function saveAttachmentsToDrive() {
  var labelName = "SaveAttachments"; // Specific label name
  var driveFolderName = "Email Attachments"; // Folder name in Drive for attachments
  var processedLabelName = "AttachmentsSaved"; // Label for processed emails

  var label = GmailApp.getUserLabelByName(labelName);
  var processedLabel = GmailApp.getUserLabelByName(processedLabelName);

  // Create the processed label if it doesn't exist
  if (!processedLabel) {
    processedLabel = GmailApp.createLabel(processedLabelName);
  }

  // Create or retrieve the Drive folder
  var folders = DriveApp.getFoldersByName(driveFolderName);
  var folder = folders.hasNext()
    ? folders.next()
    : DriveApp.createFolder(driveFolderName);

  if (label) {
    var threads = label.getThreads();
    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];
      var messages = thread.getMessages();

      for (var j = 0; j < messages.length; j++) {
        var message = messages[j];
        var attachments = message.getAttachments();

        for (var k = 0; k < attachments.length; k++) {
          try {
            var attachment = attachments[k];
            var fileName = attachment.getName();
            // Append timestamp to file name to ensure uniqueness
            var uniqueFileName = fileName.replace(
              /(\.[\w\d_-]+)$/i,
              "_" + new Date().getTime() + "$1"
            );
            folder.createFile(attachment.copyBlob().setName(uniqueFileName));
          } catch (e) {
            Logger.log("Error saving attachment: " + e.toString());
          }
        }
      }

      // Mark as processed
      thread.addLabel(processedLabel);
      thread.removeLabel(label);
    }
  }
}

// Set up a time-driven trigger to run this function periodically
