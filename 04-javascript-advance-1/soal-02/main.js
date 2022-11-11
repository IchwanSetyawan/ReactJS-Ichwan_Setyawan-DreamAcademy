function add() {
  var nameValue = document.getElementById("inputName").value;
  var datevalue = document.getElementById("inputDate").value;

  //MANUAL
  const today = new Date();
  const born = new Date(datevalue);
  const birthday = new Date(
    today.getFullYear(),
    born.getMonth(),
    born.getDate()
  );
  const age = today.getTime() - born.getTime();

  if (nameValue === "" || datevalue === "") {
    return alert("form harus diisi");
  }

  //calculate month difference from current date in time
  const birthdayIn = birthday.getTime() - today.getTime();

  //konvert hasil birthdayIn ke date format
  const age_dt = new Date(age);

  //extract year from age_dt
  const year = age_dt.getUTCFullYear();

  // calculate the age of the user
  const ageUser = year - 1970;

  var getDiff = Math.round(birthdayIn / (1000 * 60 * 60 * 24));

  if (getDiff < 0) {
    console.log(
      `Halo ${nameValue}, Usia anda ${
        ageUser < 0 ? 0 : ageUser
      } tahun. Anda berulang tahun ${Math.abs(getDiff)} hari yang lalu`
    );
  } else {
    console.log(
      `Halo ${nameValue}, Usia anda ${
        ageUser < 0 ? 0 : ageUser
      } tahun.  Anda berulang tahun ${getDiff} hari lagi`
    );
  }

  // MOMENTJS
  var mBorn = moment(datevalue);
  var mToday = moment();
  var mBirthday = moment({
    year: mToday.year(),
    month: mBorn.month(),
    date: mBorn.date(),
  });

  var mYears = mToday.diff(mBorn, "year");
  var mDays = Math.round(mBirthday.diff(mToday, "day", true));

  if (mDays < 0) {
    console.log(
      `Moment = Halo ${nameValue}, Usia anda ${mYears} tahun. Anda berulang tahun ${Math.abs(
        mDays
      )} hari yang lalu`
    );
  } else {
    console.log(
      `Moment = Halo ${nameValue}, Usia anda ${mYears} tahun.  Anda berulang tahun ${mDays} hari lagi`
    );
  }
}
