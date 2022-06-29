function doGet(e) {
  // https://script.google.com/macros/s/AKfycbyUYvhKuHEfRSnbP0Ty1S82CJu7X8GP-klUJtbhTVLv-H_Q62ZIFEWs9_tgJkhtNywH/exec?name=jsmith&amount=21
  var name = e.parameter.name;
  var amount = e.parameter.amount;
  var marca = e.parameter.marca;

  var product = [[name, amount, marca, new Date()]]

  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  // Set COMPRA
  var rowNumber = sheet.getSheetByName("Compra").getDataRange().getNumRows() + 1;
  console.log(rowNumber)

  var range = sheet.getRange("B"+ rowNumber + ":E" + rowNumber );
  range.setValues(product);
}

function test() {

  var data = UrlFetchApp.fetch('https://flozad.github.io/Recetas-de-Ensaladas.json').getContentText()

  var json = JSON.parse(data)
  
  var ingridients = json["0"]["0"]["ingredients"]
  var values = Object.values(ingridients)
  //console.log(values)
 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var driverArray = sheet.getRange("B2:B34").getValues().flat().filter(r=>r!="");
  

  var ingridientsPage = json["0"]  

  for (var i=0; i < Object.keys(ingridientsPage).length; i++) { 
    var foodIng = []
    for (var g=0; g < Object.keys(ingridientsPage[i]).length; g++)
    {
      
      try
      {
        var ingridients = Object.values(ingridientsPage[i]["ingredients"])[g].replace(/[0-9]/g, '').replace(/\s+/g, ' ').trim()
        //console.log(ingridients)

        foodIng.push(ingridients)
      } catch { continue }
    
    }
    console.log(foodIng)
    console.log(driverArray)
    const arr2 = driverArray
    const arr1 = foodIng

    const containsAll = arr1.every(element => {
      return arr2.includes(element);
    });
    console.log(containsAll);

  }

  

  
}

function items() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var rowNumber = sheet.getSheetByName("Compra").getDataRange().getNumRows();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Compra");

  var range = sheet.getRange("B2:E");
  var items = ""

  for (let i = 1; i < rowNumber; i++) {
      var producto = range.getCell(i,1).getValue()
      var marca = range.getCell(i,3).getValue()
      var cantidad = range.getCell(i,2).getValue()
      var precio = range.getCell(i,4).getValue()
      var item = `
            <table id="u_content_heading_9" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 0px 50px;font-family:arial,helvetica,sans-serif;" align="left">
              
        <h1 class="v-text-align v-line-height v-font-size" style="margin: 0px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Rubik',sans-serif; font-size: 21px;">
          ` + producto + `
        </h1>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 15px 50px;font-family:arial,helvetica,sans-serif;" align="left">
              
        <div class="v-text-align v-line-height" style="color: #7e8c8d; line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-family: 'courier new', courier; font-size: 18px; line-height: 25.2px;">
          ` + "Brand: " + marca + " - Amount: " + cantidad + `
          
          </span></strong></p>
        </div>

            </td>
          </tr>
        </tbody>
      </table>
      
      `
      var items = items + item
      
  }
  return items
}

function doPost(e) {    
  try {
    var input = JSON.stringify(e.postData.contents);
    input = JSON.parse(input);
    //var myData = JSON.parse(e.postData.contents);
    //return HtmlService.createHtmlOutput(myData);
  }
  catch (e) {
    throw new Error(e);
  }
  return ContentService.createTextOutput("doPost received"); // Modified
}

function senWeeklyEmail() {
  
  var emailTemp = HtmlService.createTemplateFromFile("email");

  var htmlMessage = emailTemp.evaluate().getContent();

  GmailApp.sendEmail("flozada01@gmail.com","Your order is ready :)", "", {name: "ReStockear", htmlBody: htmlMessage})
}
