//pure function
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

const args = ["jokowi", "Sri Sultan hamengkubowono I", 10, false];

args.forEach((item) => {
  console.log(greetings(item));
});

