// SOAL NOMOR 3
// function randomNumber(value){
//   var number = value;
//   var x = 0;
//   while(x !== number ||x <= number){
//       if(x>=number){
//           return console.log('data sudah mencapai '+number)
//       }
//     x = Math.random();
//     console.log(x);
//   }
// }
// const args = [0.9]
// args.forEach((item)=>{
//   return randomNumber(item)
// })
function randomNumber(x) {
  while(x <= 0.9){
    x = Math.random();
    console.log(x);
  }
}

randomNumber(0)
