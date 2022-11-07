
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

function dataDiri(data) {
  if (data?.name || data?.age) {
      greetings(data?.name);
      yourAges(data?.age);
  }else{
      console.log('saya tidak bisa membaca data anda')
  }
}

console.log("SOAL NOMOR 5")
dataDiri({name: "Jokowi", age: 50})
dataDiri({name: "Jokowi"})
dataDiri(null);
dataDiri(10);
dataDiri(true);
