let addTaskInput = document.getElementById("addTaskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let checkBtn = document.getElementById("checkBtn");

let taskObj = [];

//ADD
addTaskBtn.addEventListener("click", function () {
  var addTaskInputval = addTaskInput.value;
  var addtaskCheckVal = checkBtn.checked;

  if (addTaskInputval.trim() != 0) {
    taskObj.push({ activity: addTaskInputval, status: addtaskCheckVal });
    addTaskInput.value = "";
    checkBtn.checked =""
  }
  showtask();
});

//SHOW DATA
function showtask() {
  let html = "";
  let addedTaskList = document.getElementById("addedTaskList");
  taskObj.forEach((item, index) => {
    return (
        html += `<tr>
                <th scope="row">${index + 1}</th>
                <td >${item.activity}</td>
                ${
                    item.status
                    ? ` <td><button type="button" class="text-success" ><i class="fa fa-check-square-o"></i>Done</button></td>`
                    : ` <td><button type="button" class="text-danger" ><i class="fa fa-check-square-o"></i>Not started</button></td>`
                }
                <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`
    )
  });
  addedTaskList.innerHTML = html;
}

//EDIT
function edittask(index) {
  let saveIndex = document.getElementById("saveIndex");
  let addTaskBtn = document.getElementById("addTaskBtn");
  let saveTaskBtn = document.getElementById("saveTaskBtn");
  saveIndex.value = index;

  addTaskInput.value = taskObj[index]["activity"];
  checkBtn.checked = taskObj[index]["status"];
  
  console.log(checkBtn.checked)

  addTaskBtn.style.display = "none";
  saveTaskBtn.style.display = "block";
}

//SAVE
saveTaskBtn.addEventListener("click", function () {

  let saveTaskBtn = document.getElementById("saveTaskBtn");
  let addTaskBtn = document.getElementById("addTaskBtn");
  let saveIndex = document.getElementById("saveIndex").value;

  taskObj[saveIndex] = {
    activity: addTaskInput.value,
    status: checkBtn.checked,
  };
  saveTaskBtn.style.display = "none";
  addTaskBtn.style.display = "block";
  addTaskInput.value = "";
  checkBtn.checked = ""
  showtask();
});

//DELETE
function deleteitem(index) {
  taskObj.splice(index, 1);
  showtask();
}

