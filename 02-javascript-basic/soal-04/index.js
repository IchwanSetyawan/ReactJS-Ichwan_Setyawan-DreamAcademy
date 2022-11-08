// SOAL NOMOR 4
function yourAges(x = undefined) {
  let numAge = x;
  if (!numAge) {
    return "invalid age!";
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
  
    return "Anda adalah seorang dewasa"
  }
  if (numAge > 60) {
   
    return "Anda adalah seorang tua";
  }
  return numAge;
}

const args = [0,10,"50",60,29.5,"muda",true];

args.forEach((item)=>{
  console.log(yourAges(item))
})


