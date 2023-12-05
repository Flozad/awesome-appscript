// Create metrics from your Gmail account

function getEmailAnalytics() {
  var analytics = {
    totalSentEmails: 0,
    totalReceivedEmails: 0,
    frequentContacts: {},
    latestEmailDate: null,
  };

  // Analyze sent emails
  var sentThreads = GmailApp.search("in:sent");
  sentThreads.forEach((thread) => {
    analytics.totalSentEmails += thread.getMessageCount();
  });

  // Analyze received emails
  var inboxThreads = GmailApp.getInboxThreads();
  inboxThreads.forEach((thread) => {
    thread.getMessages().forEach((message) => {
      analytics.totalReceivedEmails++;

      var from = message.getFrom();
      analytics.frequentContacts[from] =
        (analytics.frequentContacts[from] || 0) + 1;

      var date = message.getDate();
      if (!analytics.latestEmailDate || date > analytics.latestEmailDate) {
        analytics.latestEmailDate = date;
      }
    });
  });

  // Convert Date to readable string
  if (analytics.latestEmailDate) {
    analytics.latestEmailDate = analytics.latestEmailDate.toString();
  }

  // Sorting frequent contacts
  analytics.frequentContacts = sortObjectByValue(analytics.frequentContacts);

  // Returning results in JSON format
  console.log(analytics);
  return JSON.stringify(analytics);
}

// Helper function to sort an object by its values
function sortObjectByValue(obj) {
  return Object.fromEntries(Object.entries(obj).sort((a, b) => b[1] - a[1]));
}

// Run this function to execute the script and get email analytics
