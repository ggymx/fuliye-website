function jump() {
  var num = 5;
  var interval = setInterval(function () {
    if (num == 1) {
      clearInterval(interval);
      location.href = "login.html"
    }
    countdown.innerHTML = num--;
  }, 1000);
}
function GetQueryString(name)   //获取数据函数
{
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
// 激活界面函数,检查页面参数
function callActivation(data, callback) {
  $.ajax({
    type: "post",
    url: url + "api/sys/emailUrl",
    // data: JSON.stringify(data),
    data: data,
    dataType: "json",
    success: callback
  });
}



$(function () {
  if (localStorage.token) {
    swal("Info", "You are already logged in！", "info")
      .then(function (value) {
        location.href = "home.html"
      })
  } else {
    console.log("等待激活");
  }
  localStorage.token = GetQueryString("name");

  let token = { "token": localStorage.token }

  //开始激活
  callActivation(token, function (res) {
    console.log(res);

    //激活成功
    if (res.message == 200) {
      delete localStorage.token
      delete localStorage.username
      swal("Done!", "Activation success!", "success")
        .then(jump());
        
      console.log("激活成功!")

      //激活失败，超时
    } else if (res.message == 4000) {
      delete localStorage.token
      delete localStorage.username
      swal({
        title: "Falied!",
        text: "TIME OUT! Please contact us!",
        icon: "error"
      })
        .then(function (value) {
         

          location.href = "contact_us.html"
        })
      console.log("激活失败！")
     
      //激活失败，其他原因
    } else {
      delete localStorage.token
      delete localStorage.username
      swal({
        title: "Falied!",
        text: "Activation failed! Please contact us!",
        icon: "error"
      })
        .then(function (value) {

          location.href = "contact_us.html"
        })
      console.log("激活失败！")
    }
  })
}

)
