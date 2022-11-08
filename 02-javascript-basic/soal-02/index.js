
// SOAL NOMOR 2
function faktorial(value) {
  var result = 1;
  if (value < 0 || typeof value != "number" || value===null) {
    //nilai tidak boleh lebih kecil dari 0 atau harus bernilai number
    // result = null;
    // console.log(result);
    return null;
  }
  if (typeof value === "number") {
    for (var i = 1; i <= value; i++) {
      result *= i;
    }
    // console.log(result);
    return result;
  }
}

const args = [10,13,0,-5,"oke","10","6",true];

args.forEach((item)=>{
  console.log(faktorial(item))
})
