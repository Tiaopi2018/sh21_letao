if(location.href.indexOf('login.html') === -1) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    success: function (info) {
      if(info.success) {
        console.log('以登陆');
      }
      if(info.error === 400) {
        location.href = 'login.html'
      }
    }
  })
}

NProgress.start()

setTimeout(function() {
  NProgress.done()
},500)

$(document).ajaxStart(function() {
  NProgress.start()
})
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done()
  },500)
})


$(function() {
  $('.category').click(function() {
    console.log(1);
    $('.child').stop().slideToggle()
  })

  $('.lt_topbar .pull-left').click(function() {
    $('.lt_main').toggleClass('hidemenu')
    $('.lt_topbar').toggleClass('hidemenu')
    $('.lt_aside').toggleClass('hidemenu')
  })
  $('.lt_topbar .pull-right').click(function() {
    $('#myModal').modal('show')
  })
  $('.public .btn-primary').click(function() {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function(info) {
        location.href = 'login.html'
      }
    })
  })

})

