/**
 * Created by xuhao on 2018/6/29.
 */
$(function() {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var id = info.rows[0].id
      $('.ul_left').html(template('tmp', info))
      render(id)
    }
  })

  $('.ul_left').on('click', 'a', function() {
    $(this).addClass('current').parent().siblings().children().removeClass('current')
    render($(this).data('id'))
  })
  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id : id
      },
      dataType: 'json',
      success: function(info) {
        if(info.total === 0) {
          $('.ul_right').html('<p>没有更多分类信息了</p>')
        } else {
          $('.ul_right').html(template('tpl', info))
        }
      }
    })
  }
})