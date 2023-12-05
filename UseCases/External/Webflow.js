// Description: Delete all items in a Webflow collection.

var API_KEY = '{{ADD Your API KEY here}}';
var COLLECTION_ID = '{{ADD Your collection ID here}}'

// Get all items in a collection
function getAllItems() {
  var url = 'https://api.webflow.com/collections/' + COLLECTION_ID + '/items';
  var options = {
    'method' : 'get',
    'headers': {
      'Authorization': 'Bearer ' + API_KEY,
      'accept-version': '1.0.0'
    },
  };

  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());

  var itemIds = data.items.map(function(item) { return item._id; });

  return itemIds;
}

// Delete all items in a collection
function deleteItems(itemIds) {
  var url = 'https://api.webflow.com/collections/' + COLLECTION_ID + '/items';
  var options = {
    'method' : 'delete',
    'headers': {
      'Authorization': 'Bearer ' + API_KEY,
      'accept-version': '1.0.0',
      'content-type': 'application/json'
    },
    'payload': JSON.stringify({
      'itemIds': itemIds
    }),
    'muteHttpExceptions': true  // To handle DELETE requests
  };

  itemIds.forEach(function(itemId) {
    var deleteUrl = url + '/' + itemId;
    UrlFetchApp.fetch(deleteUrl, options);
  });

  Logger.log('Deleted all items.');
}

// Get all items and then delete them
function deleteAllItems() {
  var itemIds = getAllItems();
  deleteItems(itemIds);
}
