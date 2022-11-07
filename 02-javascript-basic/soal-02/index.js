
// SOAL NOMOR 2
function faktorial(value) {
  var result = 1;
  if (value < 0 || typeof value != "number" || value===null) {
    //nilai tidak boleh lebih kecil dari 0 atau harus bernilai num,ber
    result = null;
    console.log(result);
    return null;
  }
  if (typeof value === "number") {
    for (var i = 1; i <= value; i++) {
      result *= i;
    }
    console.log(result);
    return result;
  }
}
console.log("==============================  ");
console.log("SOAL NOMOR 2");
console.log("==============================");

faktorial(10);
faktorial(13);
faktorial(0);
faktorial(-5);
faktorial("oke");
faktorial("10");
faktorial("6");
faktorial(true);
faktorial();

console.log("==============================");