var today = "09/11/2022";
var products = [
  {
    productionDate: "2022-01-01",
    expiredDate: "10/06/2023",
  },
  {
    productionDate: "2022-02-14",
    expiredDate: "17/08/2022",
  },
];

function formatCustomDate(str) {
  const date = str.split("/");

  if (date.length > 1) {
    return new Date(`${date[2]}-${date[1]}-${date[0]}`); //merubah posisi format date
  }
  return new Date(str);
}

function getDiff2(arg1, arg2) {
  return (arg1.getTime() - arg2.getTime()) / (1000 * 3600 * 24);
}

const newProduct = products.map((item) => {
  const expiredIn = getDiff2(
    formatCustomDate(item.expiredDate),
    formatCustomDate(today)
  );
  return {
    productionDate: item.productionDate,
    expiredDate: item.expiredDate,
    shelfLife: getDiff2(
      formatCustomDate(item.expiredDate),
      formatCustomDate(item.productionDate)
    ),
    age: getDiff2(
      formatCustomDate(today),
      formatCustomDate(item.productionDate)
    ),
    expiredIn,
    isExpired: expiredIn > 0 ? true : false,
  };
});

console.log(newProduct);
