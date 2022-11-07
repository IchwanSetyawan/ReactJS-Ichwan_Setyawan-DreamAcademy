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
  