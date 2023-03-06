// Source: https://developers.google.com/apps-script/guides/menus

// Each time the google sheet is opened, the menu is added to the sheet.

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
    .addItem('First item', 'menuItem1')
    .addSeparator()
    .addSubMenu(ui.createMenu('Sub-menu').addItem('Second item', 'menuItem2'))
    .addToUi();
}

function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .alert('You clicked the first menu item!');
}

function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .alert('You clicked the second menu item!');
}
