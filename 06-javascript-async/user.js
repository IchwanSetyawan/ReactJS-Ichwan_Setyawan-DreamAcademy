var apiHost = "http://localhost:3000/";
var users = "";
var posts = "";


function getUser() {
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
  });
}


function getPost() {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: "json",
      url: apiHost + "posts",
    })
      .done(function (data) {
        resolve(data);
      })
      .fail(function (err) {
        reject(err);
      });
  });
}


Promise.all([getPost(), getUser()]).then((res)=>{

    var result = res[1].map((itemUser) => {
        var resPos = res[0].filter((itemPost)=>{
            return itemPost.authorId == itemUser.id
        }).map((itemPostFilter)=>{
           return `<a href="/post/?id=${itemPostFilter.id}">${itemPostFilter.title}</a>`
        }).join(", ")
               
        return ( `
            <>
                <tr class="border border-slate-400 p-3">
                <td class="border border-slate-400 p-3" >${itemUser.id}</td>
                <td class="border border-slate-400 p-3" >
                ${itemUser.username}         
                </td>
                <td id="${itemUser.id}" class="gotToUser border border-slate-400 p-3">               
                ${resPos}           
                </td>            
                </tr>
            </>      
        `);
    });
    $("table").append(result);
})

