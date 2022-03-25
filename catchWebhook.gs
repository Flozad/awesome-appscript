example url: https://googlesheeturl?item_id=12345&name=test

function doGet(e){

var item_id = e.parameter.item_id; **//item_id = 12345**

var name = e.parameter.name; **//name = test**

**// do what you need to with the** **item_id**

return **your_data_after_doing_what_you_need**;

}
