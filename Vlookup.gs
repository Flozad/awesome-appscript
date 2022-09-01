function onSearch(id){
  
    var searchString = id;
    var ss = SpreadsheetApp.openById(SHEETID)
    var sheet = ss.getSheetByName("SHEET NAME");
    var column = 1; //column Index   
    var columnValues = sheet.getRange(2, column, sheet.getLastRow()).getValues(); //1st is header row
    var searchResult = columnValues.findIndex(searchString); //Row Index - 2

    if(searchResult != -1)
    {
      var view = sheet.setActiveRange(sheet.getRange(searchResult + 2, 2))
    }
    
    if(typeof view !== 'undefined')
    //console.log(view.getValue())
    return view.getValue()
}
