// Edit the status of your forms

function toggleFormAvailability() {
  var formId = "YOUR_FORM_ID"; // Replace with your actual form ID
  var form = FormApp.openById(formId);

  var openDateTime = new Date("2023-01-01T09:00:00"); // Set your opening date and time
  var closeDateTime = new Date("2023-01-02T17:00:00"); // Set your closing date and time
  var currentDateTime = new Date();

  if (currentDateTime >= openDateTime && currentDateTime <= closeDateTime) {
    // If current time is within the open window, ensure the form is open
    if (form.isAcceptingResponses() === false) {
      form.setAcceptingResponses(true);
      Logger.log("Form is now open for responses.");
    }
  } else {
    // If current time is outside the open window, close the form
    if (form.isAcceptingResponses() === true) {
      form.setAcceptingResponses(false);
      Logger.log("Form has been closed for responses.");
    }
  }
}

// Set up time-driven triggers to run this function as needed
