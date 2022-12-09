
var apiHost = "http://localhost:3000/";
var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get("id");
var authorId = "1";
var authorText = "Izrail";

var users;

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


//GET AUTHOR
function getProfile() {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: "json",
      url: apiHost + "user",
    })
      .done(function (datas) {
        users = datas
        
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

// GET COMMENTS
function getComments(postId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: "json",
      url: apiHost + "comments?postId=" + postId,
    })
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        reject(err);
      });
  });
}




