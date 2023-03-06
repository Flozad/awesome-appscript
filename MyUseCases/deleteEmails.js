// Source and guide: https://www.youtube.com/watch?v=OFuaoeq7gSw
// This script will delete all emails in your inbox that are older than 7 days and have not been marked as important.

// Purge messages automatically after how many days?
var DELETE_AFTER_DAYS = 7;

// Maximum number of message threads to process per run.
var PAGE_SIZE = 150;

/**
 * Create a trigger that executes the purge function every day.
 * Execute this function to install the script.
 */
function setPurgeTrigger() {
  ScriptApp.newTrigger('purge')
    .timeBased()
    .everyDays(1) // Code running handler
    .create();
}

/**
 * Create a trigger that executes the purgeMore function two minutes from now
 */
function setPurgeMoreTrigger() {
  ScriptApp.newTrigger('purgeMore')
    .timeBased()
    .at(new Date(new Date().getTime() + 1000 * 60 * 2))
    .create();
}

/**
 * Deletes all triggers that call the purgeMore function.
 */
function removePurgeMoreTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    if (trigger.getHandlerFunction() === 'purgeMore') {
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

/**
 * Deletes all of the project's triggers
 * Execute this function to unintstall the script.
 */
function removeAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/**
 * Wrapper for the purge function
 */
function purgeMore() {
  purge();
}

/**
 * Deletes any emails from the inbox that are more then 7 days old
 * and not starred or marked as important.
 */
function purge() {
  removePurgeMoreTriggers();

  var search =
    'in:inbox -in:starred -in:important older_than:' + DELETE_AFTER_DAYS + 'd'; // Filter for important emails
  var threads = GmailApp.search(search, 0, PAGE_SIZE);

  if (threads.length === PAGE_SIZE) {
    console.log(
      'PAGE_SIZE exceeded. Setting a trigger to call the purgeMore function in 2 minutes.'
    );
    setPurgeMoreTrigger();
  }

  console.log('Processing ' + threads.length + ' threads...');

  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DELETE_AFTER_DAYS);

  // For each thread matching our search
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];

    // Only delete if the newest message in the thread is older then DELETE_AFTER_DAYS
    if (thread.getLastMessageDate() < cutoff) {
      thread.moveToTrash();
    }
  }
}
