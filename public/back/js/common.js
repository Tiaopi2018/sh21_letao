/**
 * Created by xuhao on 2018/6/25.
 */
if(location.href.indexOf('login.html') === -1) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function(info) {
      if(info.error == 400) {
        location.href = 'login.html'
      }
      if(info.success) {
        console.log( "当前用户已登陆" );
      }
    }
  })
}

NProgress.start();

setTimeout(function() {
  NProgress.done();
},500)

$(document).ajaxStart(function () {
  NProgress.start();
});

$(document).ajaxStop(function () {
  setTimeout(function() {
    NProgress.done();
  },500)
});

$(function() {
  $('.nav .category').click(function() {
    $('.lt_aside .child').stop().slideToggle();
  })

  $('.lt_topbar .pull-left').click(function() {
    $('.lt_topbar').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
    $('.lt_aside').toggleClass('hidemenu')
  })

  $('.lt_topbar .pull-right').click(function() {
    $('#myModal').modal('show')
  })
  $('.modal-footer .btn-default')
  $('.modal-footer .btn-primary').click(function() {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function(info) {
        location.href = 'login.html'
      }
    })
  })

})