// source: https://www.youtube.com/watch?v=w4oUjDC9L6A&list=PLv9Pf9aNgemv62NNC5bXLR0CzeaIj5bcw&index=12

function getEvents(){
 
 var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 var cal = CalendarApp.getCalendarById("id_del_calendario_que_va_a_usarse@group.calendar.google.com");
 var events = cal.getEvents(new Date("27/12/2017 02:16 AM"), new Date("27/12/2017 02:30 PM"));
 
 var lr = ss.getLastRow();
 ss.getRange(2, 1,lr-1,5).clearContent();   /**ERROR DE DEPURACION**/

 for(var i = 0;i<events.length;i++){
  var title = events[i].getTitle();
  var sd = events[i].getStartTime();
  var ed = events[i].getEndTime();
  var loc = events[i].getLocation();
  var des = events[i].getDescription();
  
  ss.getRange(i+2, 1).setValue(title);
  ss.getRange(i+2, 2).setValue(sd);
  ss.getRange(i+2, 2).setNumberFormat("dd/mm/yyyy h:mm AM/PM");
  ss.getRange(i+2, 3).setValue(ed);
       ss.getRange(i+2, 3).setNumberFormat("dd/mm/yyyy h:mm AM/PM");
       ss.getRange(i+2, 4).setValue(loc);
  ss.getRange(i+2, 5).setValue(des);
 }
 
}


function addEvents(){
 var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 var lr = ss.getLastRow();
 var cal = CalendarApp.getCalendarById("id_del_calendario_que_va_a_usarse@group.calendar.google.com");
 
 var data = ss.getRange("A2:E" + lr).getValues();
 
 for(var i = 0;i<data.length;i++){
     
  cal.createEvent(data[i][0], data[i][1], data[i][2], {location: data[i][3], description: data[i][4]}); /**ERROR DE DEPURACION**/
   
 }
 
}
