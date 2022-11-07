// SOAL NOMOR 3
function randomNumber() {

  setTimeout(function () {
    var myNum = Math.random();
    console.log("random number -", myNum);
    if (myNum > 0.9) {
      console.log("berhenti, angka anda sudah mencapai atau lebih dari 0.9" );
      return false;
    }
    randomNumber();
    return myNum;
  },2000);
}
console.log("SOAL NO 3")

randomNumber();