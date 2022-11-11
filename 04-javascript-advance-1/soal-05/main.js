function add() {
  var inputanValue = document.getElementById("inputan-value").value;
  var strChar = inputanValue.toLowerCase().split("");
  var letters = /^[A-Za-z]+$/;

 var ceckStr = strChar.map((item,i)=>{
    if (letters.test(strChar[i].toLowerCase())) {
          if (
            strChar[i] == "a" ||
            strChar[i] == "e" ||
            strChar[i] == "i" ||
            strChar[i] == "o" ||
            strChar[i] == "u"
          ) {
            return (strChar[i], "vocal");
          } else {
            return (strChar[i], "konsonan");
          }
    
        } else {
          return (strChar[i], "invalid");
        }
  })

  console.log(ceckStr.toString())
}
