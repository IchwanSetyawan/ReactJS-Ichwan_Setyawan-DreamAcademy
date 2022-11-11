function randomNumber(x) {
  var rnd = Math.floor(Math.random() * 100);
  document.getElementById('random-number').innerHTML= rnd

  if(rnd % 2 === 0){
    console.log(`angka kamu ${rnd}`)
  }else{
    console.log(`selamat kamu memang!!, angka kamu ${rnd}`)
  }
}

