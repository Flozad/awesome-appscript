// Description: This script demonstrates how to manage file and folder permissions using the DriveApp service.

function manageFilePermissions() {
  var fileId = 'FILE_ID_HERE'; // Replace with the ID of the file you want to manage permissions for
  var file = DriveApp.getFileById(fileId);

  // Add a user to the file's viewers list
  file.addViewers(['user1@example.com']);

  // Remove a user from the file's editors list
  file.removeEditors(['user2@example.com']);

  // Create a new folder and set permissions on it
  var folder = DriveApp.createFolder('New Folder');
  folder.addEditors(['user1@example.com', 'user2@example.com']);
  folder.addViewers(['user3@example.com']);

  // Remove a user from the folder's viewers list
  folder.removeViewers(['user3@example.com']);
}
