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

var getUser;
var myParamComment;
let nowDate = moment().format("DD-MM-YYYY");
let nowTime = moment().format("HH:mm:ss");

$("#closeModal").click(function () {
  $("#modal").hide();
});
$("#closeModalEdit").click(function () {
  $("#modalEdit").hide();
});


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

function getPosts() {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: "json",
      url: apiHost + "posts",
    })
      .done(function (datas) {
        posts = datas;
        resolve(datas);
      })
      .fail(function (err) {
        reject(err);
      });
  });
}

//get author
function getProfile() {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: "json",
      url: apiHost + "user",
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
    let currentDate = `${nowDate} ${nowTime}`
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
        authorId: authorId,
      }),
    })
      .done(function (data) {
        alert("Berhasil tambah data");
        resolve("Create post berhasil");
        $("#modal").hide();
        getContainer();
      })
      .fail(() => {
        reject("error when creating");
      });
  });
});

// tampilkan add modal 
$("#container").on("click", "#addNew", function () {
  $("#modal").show();
});

//edit
$("#container").on("click", ".listItemEdit", function () {
  var _this = $(this);
  $("#modalEdit").show();
  var idAttr = $(this).attr("id").split("-")[1];
  postId = idAttr;

  var thePost = posts.find(function (val) {
    return val.id == postId;
  });

  $("#myTitleEdit").val(thePost.title);
  $("#myBodyEdit").val(thePost.body);
  $("#publishCheckEdit").prop("checked", thePost.published);

  $("#postIdEdit").html(thePost.id);
});


//update
$(`#editBtn`).click(function () {
  return new Promise((resolve, reject) => {

    let currentDate = `${nowDate} ${nowTime}`
    $.ajax({
      url: apiHost + "posts/" + postId,
      method: "patch",
      contentType: "application/json",
      data: JSON.stringify({
        title: $("#myTitleEdit").val(),
        body:  $("#myBodyEdit").val(),
        published: $("#publishCheckEdit").prop("checked"),
        lastModifiedAt: currentDate,
      }),
    })
      .done(function (data) {
        alert("Berhasil Update");
        resolve("update berhasil");
        $("#modalEdit").hide();
        getContainer();
      })
      .fail(() => {
        reject("error when updating");
      });
  });
});

// delete
$("#container").on("click", ".listDeleteBtn", function () {
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
          getContainer();
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

function showDetail(idPost) {
  $("#container").html(`
    <header>
      <!-- TITLE -->
      <h1 id="postTitleDetail" class="text-center text-4xl font-bold"></h1>          
      <div class="flex justify-center mt-4">
          <p  class=" text-center mt-2 text-lg font-medium flex gap-2">
              <span id="postDetail"></span><span id="postDetailTime"></span> 
          </p>               
      </div>
    </header>
        
    <div id="loading" class="flex justify-center items-center h-screen hidden">
        <div class="text-center ">
            <div role="status">
                <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
            <span class="text-blue-700">Loading...</span>
        </div>
    </div>
  <div class="grid grid-cols-1">
  <img src="../img/lake.webp" class="bg-opacity-10 my-16 w-full rounded-lg h-[400px]" />

  <!-- body -->
</div>
  <div  class="text-justify">
    <p id="postBody">
    </p>
  </div>

  <!-- comments -->
  <div>
    <h2 class="text-3xl font-bold mt-16 mb-8">Comments</h2>
    <div class="my-8" id="commentUser"></div>
  </div>

<!-- say something -->
  <div>
    <h2 class="text-3xl font-bold mt-16 mb-8">Say Something</h2>
    <div>
        <textarea id="messageComment" rows="4"
            class="block h-64 p-2 w-full text-xl font-semibold text-gray-900 bg-gray-50 rounded-lg border-black border-2"
            placeholder="Write your thoughts here...">
        </textarea>
    </div>
    <div class="flex justify-end">
        <button id="submitComment" class="bg-blue-700 px-6 rounded-lg py-2 mt-4 text-lg text-white font-semibold">
            Submit
        </button>
    </div>
  </div>
`);
  
  let postTitle = $(`#postTitleDetail`);
  const postBody = $(`#postBody`);
  const postDetail = $(`#postDetail`);
  const postDetailTime = $(`#postDetailTime`);
  var avatar;

//comment
  var commentAuthor = $("commentAuthor");
  var commentAuthorTime = $("commentAuthorTime");
  var commentAuthorDate = $("commentAuthorDate");
  var commentBody = $("commentBody");
  var thumbnailComment = $("thumbnailComment");
  

Promise.all([getPost(idPost), getProfile(), getComments(idPost)])

//  reponse get profile
.then((response) => {
  users = response[1];
 
    console.log(" myParamComment", myParamComment)
    // response getPost
    postTitle.html(response[0].title);
    postBody.html(response[0].body);
    postDetail.html(
      users.find((val) => val.id == response[0].authorId).username + ","
    );
    postDetailTime.html(response[0].lastModifiedAt);

    //function get comments
    var result = response[2]
      .map((item) => {
        avatar = users
          .find((val) => val.id == item.userId)
          .username.slice(0, 2);

        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return ` <div class="my-4">
        <div class="flex gap-2 items-center">
            <span class="rounded-full flex items-center justify-center  h-14 w-14 bg-[#${randomColor}] text-white font-semibold" id="thumbnailComment">${avatar}</span>

        <div class="flex gap-2">
                <span id="commentAuthor" class="font-bold text-xl">${
                  users.find((val) => val.id == item.userId).username
                }</span>
                <span id="commentAuthorTime" class="font-bold text-xl">${
                  item.createdAt
                }</span>
            </div>
        </div>
        <p id="commentBody" class="font-medium">${item.message}</p>
      </div> `;
      })
      .join(" ");

    $("#commentUser").html(result);

    //createComment
    $("#container").on("click", "#submitComment", function (e) {
      myParamComment = response[0].id
      var getIdUser = $('select').val();
      var valtext = $("select option:selected").text();
      let messageComment = $("#messageComment");
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      let currentDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    
      return new Promise((resolve, reject) => {
        $.ajax({
          url: apiHost + "comments",
          type: "post",   
          contentType: "application/json",
          data: JSON.stringify({
            postId: myParamComment,
            userId: parseInt(getIdUser),
            message: messageComment.val(),
            avatar: valtext.slice(0,2),
            createdAt: currentDate,
          }),
        })
          .done(function (data) {
            alert("berhasil menambahkan komen");
            resolve({ data });
            showDetail(myParamComment)
    
          })
          .fail(function (err) {
            reject(err);
            alert("gagal menambahkan komen");
          });
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
}

// create comment



//title detail
$("#container").on("click", ".detailPost", function (e) {
  var idPost = e.target.id.split("-")[1];
  showDetail(idPost);
  history.pushState({page:'detail-post', idPost},'detailPost',`/detail?postId=${idPost}`)
});

// pagination
$(document).ready(function () {
  $("#table_id ").DataTable();
});

// home function
function getContainer() {
  $("#container").html(`
  <header class="flex justify-between items-center mb-10">
  <div>
    <h1 class="text-center text-2xl font-bold">POST</h1>
  </div>
  <div>
    <button id="addNew" class="bg-blue-700 px-6 rounded-lg py-2 text-md text-white">
      Add New
    </button>
  </div>
</header>

<content>

  <table>
    <thead>
      <tr class="border-collapse border border-slate-300 bg-slate-300">
        <th class="border border-slate-400 p-3">ID</th>
        <th class="border border-slate-400 p-3">Title</th>
        <th class="border border-slate-400 p-3">Author</th>
        <th class="border border-slate-400 p-3">Created At</th>
        <th class="border border-slate-400 p-3">Last Modified At</th>
        <th class="border border-slate-400 p-3">Published</th>
        <th class="border border-slate-400 p-3">Action</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    
  </table>
    <div id="#pagination"></div>
    <div id="loading" class="flex justify-center items-center ">
      <div class="text-center ">
        <div role="status">
          <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
        </div>
        <span class="text-blue-700">Sedang mengambil data...</span>
      </div>
    </div>

    <div id="error" style="display: none;">Error fetching data</div>
    <ul id="list"></ul>
  </content>    
  `);

  Promise.all([getProfile(), getPosts()]).then((res) => {
    //get post
    $("#dataTable").hide();
    $("#loading").show();

    $("#dataTable").show();
    $("#loading").hide();

    var result = res[1].map((item, idx) => {
      var username = res[0].find((user) => {
        return user.id == item.authorId;
      })?.username;
      return `< id="dataTable">
              <tr class="border border-slate-400 p-3">
              <td class="border border-slate-400 p-3" >${item.id}</td>
              <td id="${
                item.id
              }" class="goTodetail border border-slate-400 p-3" >
                <span id='id-${item.id}' class="detailPost">
                ${item.title}
                </span>
              </td>
              <td id="${
                item.id
              }" class="gotToUser border border-slate-400 p-3">           
                ${username}           
              </td>
              <td class="border border-slate-400 p-3">${item.createdAt}</td>
              <td id="lastModifiedDetail" class=" border border-slate-400 p-3">${
                item.lastModifiedAt
              }</td>
              <td class="border text-center border-slate-400 p-3">${
                item.published
                  ? '<i class="fa fa-lg-regular text-green-600 fa-circle-check"></i>'
                  : '<i class="fa fa-lg-regular text-red-600 fa-circle-xmark"></i>'
              }  </td>
              <td class="border border-slate-400 p-3">
              <span id="edit-${
                item.id
              }" class="listItemEdit cursor-pointer text-white text-xs bg-green-700 hover:bg-green-800 p-1 rounded-md ">Edit</span>
              <span id="delete-${
                item.id
              }" class="listDeleteBtn cursor-pointer text-white text-xs bg-red-700 hover:bg-red-800 p-1 rounded-md ">Delete</span>
              </td>
              </tr>
            </>
            `;
    });
    $("table").append(result);
  });
}
getContainer();

//home
$("#home").click(function () {
  getContainer();
  history.pushState({page:'home'},'home','/')
});


//back page
$(window).on("popstate", async(event)=>{
  const state= event.originalEvent.state;
  if(state.page =="home"){
    console.log('to home');
    await getContainer()
  }else{
    console.log('to detail post');
    await showDetail(state.idPost)
  }
})