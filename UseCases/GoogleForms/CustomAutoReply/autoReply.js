function onFormSubmit(e) {
  var response = e.namedValues; // This contains the form responses
  var recipient = response["Email"][0]; // Assuming there's an "Email" field in the form
  var name = response["Name"][0]; // Assuming there's a "Name" field in the form

  // Fetch the HTML template
  var htmlTemplate = HtmlService.createTemplateFromFile("email.html");

  // Replace placeholders with actual data
  htmlTemplate.name = name;
  htmlTemplate.response = JSON.stringify(response); // Example to include all responses

  // Evaluate the HTML template to finalize the HTML content
  var htmlBody = htmlTemplate.evaluate().getContent();

  // Send the email
  MailApp.sendEmail({
    to: recipient,
    subject: "Thank you for your submission!",
    htmlBody: htmlBody,
  });
}

// Set up a trigger to run this function on form submission
