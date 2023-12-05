// email has not been replied to within 24 hours, it sends you a reminder email to prompt a response.

function remindPendingReplies() {
  var labelName = "To Reply"; // Change this to your specific label name
  var reminderEmailAddress = "your-email@example.com"; // Set your email address
  var hoursForReminder = 24;
  var currentTime = new Date().getTime();

  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    Logger.log("Label not found");
    return;
  }

  var threads = label.getThreads();
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    var latestMessage = messages[messages.length - 1];

    // Check if the latest message is older than 24 hours and is from the user
    if (
      latestMessage.isInInbox() &&
      currentTime - latestMessage.getDate().getTime() >
        hoursForReminder * 3600 * 1000 &&
      !latestMessage.isFromMe()
    ) {
      // Send reminder email
      GmailApp.sendEmail(
        reminderEmailAddress,
        "Reminder: Pending Email Reply",
        "You have an email pending reply for more than " +
          hoursForReminder +
          " hours:\n\n" +
          "Subject: " +
          thread.getFirstMessageSubject() +
          "\n" +
          "From: " +
          latestMessage.getFrom() +
          "\n" +
          "Date: " +
          latestMessage.getDate() +
          "\n" +
          "Link: " +
          thread.getPermalink() +
          "\n\n" +
          "Please check and reply if necessary."
      );
    }
  }
}

// Set up a time-driven trigger to run this function periodically
