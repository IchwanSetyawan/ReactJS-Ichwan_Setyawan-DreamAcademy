function greetings(param) {
  if (param !== undefined) {
    if (param.length < 20) {

      return `Halo ${param}`;
    } else if (param.length >= 20) {
      return `Yang mulia ${param}`;
    } else {
      return "maaf saya tidak bisa mengeja namanya ";
    }
  }

  if (param === undefined || param === "" || param === null) {
    return "maaf saya tidak bisa mengeja namanya karna nama kosong ";
  }
}

function yourAges(x = undefined) {
  let numAge = x;
  if (!numAge) {
    return ;
  }
  if (numAge < 0 || typeof numAge != "number") {
    return "invalid age!";
  }
  if (numAge <= 17) {
    return "Anda adalah seorang dibawah umur";
  }
  if (numAge <= 29) {
    return "Anda adalah seorang Young adult";
  }
  if (numAge <= 60) {
    return "Anda adalah seorang dewasa";
  }
  if (numAge > 60) {
    return "Anda adalah seorang tua";
  }
  return numAge;
}

function dataDiri(data) {
  if (data?.name) {
    if( data?.age)
    return(
      console.log(greetings(data.name),yourAges(data?.age))
   )
   return console.log(greetings(data.name))
  } else {
    return console.log("saya tidak bisa membaca data anda")

  }
}

const args = [{ name: "Jokowi", age: 50 }, { name: "Jokowi" }, null, 10, true];

let i =0;
args.forEach((item) => {
  return dataDiri(item)
});

// console.log("SOAL NOMOR 5")
// dataDiri({name: "Jokowi", age: 50})
// dataDiri({name: "Jokowi"})
// dataDiri(null);
// dataDiri(10);
// dataDiri(true);
