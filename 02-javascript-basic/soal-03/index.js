// SOAL NOMOR 3
function randomNumber() {
  setTimeout(function () {
    var myNum = Math.random();
    if (myNum > 0.9) {
      console.log(`berhenti, angka anda ${myNum}, dan sudah mencapai atau lebih dari 0.9`);
      return false;
    }
    console.log("random number -", myNum);
    randomNumber();
    return myNum;
  }, 1000);
}

console.log("SOAL NO 3");

randomNumber();
