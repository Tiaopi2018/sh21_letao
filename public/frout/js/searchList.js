/**
 * Created by xuhao on 2018/6/29.
 */
$(function() {
  var key = getSearchObj().key
  $('.search_input').val(key)
  render()
  function render() {
    $('.product_ul').html('<div class="loader"></div>')
    var obj = {}
    obj.proName = $('.search_input').val()
    obj.page = 1
    obj.pageSize = 100
    var $current = $('.history_title li a.current')
    if($current.length > 0) {
      var type = $current.data('type')
      obj[type] = $current.find('i').hasClass('fa-angle-down') ? 2 : 1
    }
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: obj,
      dataType: 'json',
      success: function(info) {
        setTimeout(function() {
          $('.product_ul').html(template('tmp', info))
        }, 600)
      }
    })
  }
  $('.search_button').click(function() {
    console.log($('.search_input').val());
    render()
  })

  $('.history_title .rank').click(function() {
    if($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
      render()
    } else {
      $(this).addClass('current').parent().siblings().children().removeClass('current')
      render()
    }
  })
})