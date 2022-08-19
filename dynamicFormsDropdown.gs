// Steps: 
// 1 - Change "ssID" for Spreadsheet ID change "wsData" getSheetByName
// 2 - Change "formID" for Form ID
// 3 - Indicate what column is going to pick values. It is set 
//     for A2:A in Labels var

// Uses the value of the spreadsheet cells as the dynamic values inside a forms dropdown options
var ssID = "SpreadSHEETSID";
var formID = "FORMSID";

var wsData = SpreadsheetApp.openById(ssID).getSheetByName("SPREADSHEET WORKSHEET NAME");
var form = FormApp.openById(formID);

function main() {

		// HEADER IN "COLUMN A" MUST MATCH DROPDOWN TITLE
    var labels = wsData.getRange(1,1).getValues()[0];
    Logger.log(labels);
    Logger.log(wsData);
    Logger.log(form);
    labels.forEach(function(label,i){
      var options = wsData
                    .getRange(2,i+1,wsData.getLastRow()-1,1)
                    .getValues()
                    .map(function(o){ return o[0]})
                    .filter(function(o){ return o !== "" ;});
      updateDropdownUsingTitle(label,options);
    });
}


function updateDropdownUsingTitle(title,values) {
  // get specific titles from questions in FORMS
  var items = form.getItems();
  var titles = items.map(function(item){
    return item.getTitle();
  });

  // Trigger update function with variables obtained
  var pos = titles.indexOf(title);
  if(pos !== -1){
    var item = items[pos];
    var itemID = item.getId();
    updateDropdown(itemID,values);
  }

}

// Update Content inside Dropdown in FORM
function updateDropdown(id,values) {

  var item = form.getItemById(id);
  item.asListItem().setChoiceValues(values);
}
