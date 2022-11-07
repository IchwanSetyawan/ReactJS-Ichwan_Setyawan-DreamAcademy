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
console.log("SOAL NOMOR 4");

yourAges(0);
yourAges(10)
yourAges("50")
yourAges(60)
yourAges(29.5)
yourAges("muda")
yourAges(true)
