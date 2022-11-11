var arrTime = [];
function saveTime() {
  var getTimeNow = moment().format("HH:mm:ss");
  arrTime.push(getTimeNow);

  arrTime.map((item) => {
    var time = item.split(":");
    console.log(`jam anda ${time[0]}, menit ${time[1]}, detik ${time[2]}`);
  });
}
