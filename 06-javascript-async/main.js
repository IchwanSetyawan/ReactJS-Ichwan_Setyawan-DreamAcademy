//show modal
$("#addNew").click(function () {
  $("#modal").show();
});
//hide modal
$("#closeModal").click(function () {
  $("#modal").hide();
});

var apiHost = "http://localhost:3000/";

var posts;
var postId;
var postIdEl = $("#postId");
var titleField = $("#myTitle");
var bodyField = $("#myBody");
var publishField = $("#publishCheck");
output = "";
var postList = document.getElementById("list");
var authorlist = document.getElementById("author");
var authorId = "1";
var authorText = "Izrail";

var current_page = 1;
var records_per_page = 10;

function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
}

//get data
function loadData() {
  $("#dataTable").hide();
  $("#loading").show();
  $.ajax({
    dataType: "json",
    url: apiHost + "posts",
    success: function (datas) {
      $("#dataTable").show();
       $("#loading").hide();
      var result = "";
      posts = datas;
      datas.forEach((item, idx) => {
        result += `
  
          < id="dataTable">
            <tr class="border border-slate-400 p-3">
            <td class="border border-slate-400 p-3" >${idx + 1}</td>
            <td id="${item.id}" class="goTodetail border border-slate-400 p-3" >
              <a href="/post/?id=${item.id}">
              ${item.title}
              </a>
            </td>
            <td class="border border-slate-400 p-3">${item.author}</td>
            <td class="border border-slate-400 p-3">${item.createdAt}</td>
            <td id="lastModifiedDetail" class=" border border-slate-400 p-3">${item.lastModifiedAt
            }</td>
            <td class="border border-slate-400 p-3">${item.published}</td>
            <td class="border border-slate-400 p-3">
            <span id="edit-${item.id
            }" class="listItemEdit cursor-pointer text-white text-xs bg-green-700 hover:bg-green-800 p-1 rounded-md ">Edit</span>
            <span id="delete-${item.id
            }" class="listDeleteBtn cursor-pointer text-white text-xs bg-red-700 hover:bg-red-800 p-1 rounded-md ">Delete</span>
            </td>
            </tr>
          </>


   
   `;
      });
      $("table").append(result);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
loadData();

//get author
function getProfile() {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: "json",
      url: apiHost + "profile",
    })
      .done(function (datas) {
        resolve(datas);
      })
      .fail(function (err) {
        reject(err);
      });
    $("select").change(function () {
      var val = $(this).val();
      authorId = val;
      var valtext = $("select option:selected").text();
      authorText = valtext;
    });
  });
}

getProfile()
  .then(function (response) {
    var result = "";
    response.forEach((item, idx) => {
      result += `
        <option value=${item.id} id=${item.id}>${item.username}</option>
   `;
    });
    $("#author").append(result);
  })
  .catch(function (error) {
    console.log(error);
  });

// post data
$(`#submitBtn`).click(function () {
  return new Promise((resolve, reject) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let currentDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

    $.ajax({
      url: apiHost + "posts",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify({
        title: titleField.val(),
        body: bodyField.val(),
        published: publishField.prop("checked"),
        createdAt: currentDate,
        lastModifiedAt: currentDate,
        author: authorText,
      }),
    })
      .done(function (data) {
        console.log({ data });
        alert("Berhasil Update");
        resolve("Create post berhasil");
        location.reload();
      })
      .fail(() => {
        reject("error when creating");
      });
  });
});

//edit
$("table").on("click", ".listItemEdit", function () {
  var _this = $(this);
  $("#modal").show();
  var idAttr = $(this).attr("id").split("-")[1];
  postId = idAttr;

  var thePost = posts.find(function (val) {
    return val.id == postId;
  });

  $("#myTitle").val(thePost.title);
  $("#myBody").val(thePost.body);
  $("#publishCheck").prop("checked", thePost.published);

  $("#postId").html(thePost.id);
});

//update
$(`#editBtn`).click(function () {
  console.log(postId);
  return new Promise((resolve, reject) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let currentDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    $.ajax({
      url: apiHost + "posts/" + postId,
      method: "patch",
      contentType: "application/json",
      data: JSON.stringify({
        title: titleField.val(),
        body: bodyField.val(),
        published: publishField.prop("checked"),
        lastModifiedAt: currentDate,
      }),
    })
      .done(function (data) {
        console.log({ data });
        alert("Berhasil Update");
        resolve("update berhasil");
        location.reload();
      })
      .fail(() => {
        reject("error when updating");
      });
  });
});

// delete
$("table").on("click", ".listDeleteBtn", function () {
  return new Promise((resolve, reject) => {
    var deleteId = $(this).attr("id").split("-")[1];
    postId = deleteId;

    if (confirm("Hapus data?")) {
      $.ajax({
        url: apiHost + "posts/" + postId,
        method: `delete`,
      })
        .done(function (data, status, code) {
          alert("berhasil delete data");
          resolve("update berhasil");
          location.reload();
        })
        .fail(function (jqxhr, status, err) {
          reject("error when deleting");
          $("#error").html("Error deleting data ID: " + postId);
          $("#error").show();
        });
    }
    return;
  });
});

// pagination
$(document).ready(function () {
  $("#table_id ").DataTable();
});
