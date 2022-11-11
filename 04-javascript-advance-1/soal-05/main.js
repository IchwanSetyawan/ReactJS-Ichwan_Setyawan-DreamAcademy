function add() {
  var inputanValue = document.getElementById("inputan-value").value;
  var strChar = inputanValue.toLowerCase().split("");
  var letters = /^[A-Za-z]+$/;

  for (let i = 0; i < strChar.length; i++) {
    // if (strChar[i].toLowerCase().match(letters)) { //cara sama
    if (letters.test(strChar[i].toLowerCase())) {
      if (
        strChar[i] == "a" ||
        strChar[i] == "e" ||
        strChar[i] == "i" ||
        strChar[i] == "o" ||
        strChar[i] == "u"
      ) {
        console.log(strChar[i], "  vocal");
      } else {
        console.log(strChar[i], " konsonan");
      }

    } else {
      console.log(strChar[i], "invalid");
    }
  }

}
