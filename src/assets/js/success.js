
function jump(){
    var num=5;
    var interval=setInterval(function(){
    if(num==0){
    clearInterval(interval);
    location.href="login.html"
    }
    countdown.innerHTML=num--;
    },1000);
}
function GetQueryString(name)   //获取数据函数
  {
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r!=null)return  unescape(r[2]); return null;
  }
// 激活界面函数,检查页面参数
function callActivation(data, callback) { 
  // console.log(data);
  // callback({
  //       error_code: 0,
  //       data: {
  //           code: 200,
  //           message: "激活成功！"
  //       }
  //   })
  $.ajax({
    type: "post",
    url: "http://140.207.48.210:8022/api/sys/emailUrl",
    data: data,
    dataType: "json",
    success: callback
  });
}

let uid=GetQueryString('uid');


    $(function(){
      let token=localStorage.token||undefined;
      if(token){
        location.href="login.html"
      }else{
          console.log("等待激活");
      }
    })

$(
  callActivation(uid, function (response) {
    console.log(response);
    if( response.code === 200){
      console.log("成功:"+response.message)
      jump();
    }else {
      console.log("失败："+response.message)
    }
  })
)
