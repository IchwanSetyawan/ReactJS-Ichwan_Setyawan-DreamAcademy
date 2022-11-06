//SOAL NOMOR 1
function greetings(param) {
  if (param !== undefined) {
    if (param.length < 20) {
      console.log(`Halo ${param}`);
    } else if (param.length >= 20) {
      console.log(`Yang mulia ${param}`);
    } else {
      console.log("maaf saya tidak bisa mengeja namanya ");
    }
  }

  if (param === undefined || param === "" || param === null) {
    console.log("maaf saya tidak bisa mengeja namanya karna nama kosong ");
    return false;
  }
}
console.log("SOAL NOMOR 1");
console.log("==============================");
greetings("jokowi");
greetings("Sri Sultan hamengkubowono I");
greetings(10);
greetings(false);
greetings();
console.log("============================")



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

// SOAL NOMOR 3
// function randomNumber() {

//   setTimeout(function () {
//     var myNum = Math.random();
//     console.log("random number -", myNum);
//     if (myNum > 0.9) {
//       console.log("berhenti, angka anda sudah mencapai atau lebih dari 0.9" );
//       return false;
//     }
//     randomNumber();
//     return myNum;
//   },2000);
// }
// console.log("SOAL NO 3")
// console.log("==============================")
// randomNumber();

// SOAL NOMOR 4
function yourAges(x = undefined) {
    let numAge = x;
    if (!numAge) {
      return;
    }
  if (numAge <= 0 || typeof numAge != "number") {
    console.log("invalid age!");
    return false;
  }
  if (numAge <= 17) {
    console.log("Anda adalah seorang dibawah umur");
    return false;
  }
  if (numAge <= 29) {
    console.log("Anda adalah seorang Young adult");
    return false;
  }
  if (numAge <= 60) {
    console.log("Anda adalah seorang dewasa");
  }
  if (numAge > 60) {
    console.log("Anda adalah seorang tua");
    return false;
  }
  return numAge;
}
console.log('SOAL NOMOR 4');
console.log("============================")
yourAges(0)
yourAges(10)
yourAges("50")
yourAges(60)
yourAges(29.5)
yourAges("muda")
yourAges(true)
console.log("============================")

function dataDiri(data) {
  if (data?.name || data?.age) {
      greetings(data?.name);
      yourAges(data?.age);
  }else{
      console.log('saya tidak bisa membaca data anda')
  }
}


console.log("SOAL NOMOR 5")
console.log("============================")
dataDiri({name: "Jokowi", age: 50})
dataDiri({name: "Jokowi"})
dataDiri(null);
dataDiri(10);
dataDiri(true);
