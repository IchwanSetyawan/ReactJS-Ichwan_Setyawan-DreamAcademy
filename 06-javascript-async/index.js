let postTitle = $(`#postTitleDetail`);
const postBody = $(`#postBody`);
const postDetail = $(`#postDetail`);
const postDetailTime = $(`#postDetailTime`);
var apiHost = "http://localhost:3000/";
var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get("id");
var authorId = "1";
var authorText = "Izrail";

//comment
var commentAuthor = $('commentAuthor')
var commentAuthorTime = $('commentAuthorTime')
var commentAuthorDate = $('commentAuthorDate')
var commentBody = $('commentBody')
var thumbnailComment = $('thumbnailComment')


const getPost = (postId) => { 
  $("#content").hide();
  $("#loading").show();
  
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "get",
      url: apiHost + "posts/" + postId,
    })
      .done(function (data) {
        $("#loading").hide();
        $("#content").show();
        resolve(data);

      })
      .fail((err) => reject(err));
  });
};
getPost(myParam)
  .then((response) => {
    postTitle.html(response.title);
    postBody.html(response.body);
    postDetail.html(response.author + ",");
    postDetailTime.html(response.lastModifiedAt);
  })
  .catch((err) => {
    console.log(err);
  });

//GET AUTHOR
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
      console.log(" authorId", authorId);
      var valtext = $("select option:selected").text();
      authorText = valtext;
      console.log(" authorText", authorText)
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


// GET COMMENTS
function getComments() {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: 'json',
      url: apiHost + "comments?postId="+myParam,
    })
      .done((data) => {
        console.log({data});
        resolve(data);
      })
      .fail((err) => {
        reject(err);
      });
  });
}

getComments().then((response)=>{
  console.log({response});
 
  var result = "";
  response.map((item)=>{
    var avatar = item.userId.slice(0,2)
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return result += ` <div class="my-4">
      <div class="flex gap-2 items-center">
          <span class="rounded-full flex items-center justify-center  h-14 w-14 bg-[#${randomColor}] text-white font-semibold" id="thumbnailComment">${avatar}</span>

      <div class="flex gap-2">
              <span id="commentAuthor" class="font-bold text-xl">${item.userId}</span>
              <span id="commentAuthorTime" class="font-bold text-xl">${item.createdAt}</span>
          </div>
      </div>
      <p id="commentBody" class="font-medium">${item.message}</p>
    </div> `
    // return result +=`
    //   <div class="my-4">
    //     <div class="flex gap-2 items-center">
       
    //       <span class="rounded-full flex items-center justify-center  h-14 w-14 bg-blue-900 text-white font-semibold" id="thumbnailComment">${item.author.slice(0,2)}</span>
      
    //       <div class="flex gap-2">
    //           <span id="commentAuthor" class="font-bold text-xl">${item.userId}</span>
    //           <span id="commentAuthorTime" class="font-bold text-xl">${item.createdAt}</span>
    //       </div>
    //     </div>
    //     <p id="commentBody" class="font-medium">${item.message}</p>
    //   </div>
    //   `
    }).join(' ');


  $('#commentUser').append(result);

}).catch((err)=>{
  console.log(err);
})

//Create Comments
let messageComment = $('#messageComment')
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();
let currentDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

$('#submitComment').click(function() {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: apiHost + 'comments',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
        postId:myParam,
        userId:authorText,
        message:messageComment.val(),
        createdAt:currentDate,
      })
    }).done(function (data) {
      alert('berhasil menambahkan komen')
      resolve({data})
      location.reload()
    }).fail(function(err) {
      reject(err)
      alert('gagal menambahkan komen')
      location.reload()
    })
  })
})