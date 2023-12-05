// Description: Convert a number to text in Spanish. But you can replace the words in the array to convert to any language.
function numToWords(num) {
    var units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    var tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    var scales = ['', 'mil', 'millón', 'billón', 'trillón'];

    function toWordsGroup(num) {
      if (num === 0) return '';
      var group = '';
      var hundreds = Math.floor(num / 100);
      var rem = num % 100;
      if (hundreds) group += units[hundreds] + 'cientos';
      if (rem < 20) {
        group += units[rem];
      } else {
        var tensDigit = Math.floor(rem / 10);
        var unitsDigit = rem % 10;
        group += tens[tensDigit];
        if (unitsDigit) group += ' y ' + units[unitsDigit];
      }
      return group;
    }

    function toWords(num) {
      if (num === 0) return 'cero';
      var words = '';
      var scale = 0;
      while (num) {
        var group = num % 1000;
        if (group) {
          if (scale) words = scales[scale] + (group === 1 && scale === 1 ? '' : ' ' + words);
          words = toWordsGroup(group) + (scale ? ' ' : '') + words;
        }
        num = Math.floor(num / 1000);
        scale++;
      }
      return words;
    }

    return toWords(num);
  }