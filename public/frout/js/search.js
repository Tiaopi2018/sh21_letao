/**
 * Created by xuhao on 2018/6/29.
 */
$(function() {
   //var arr = [ "1"];
   //var str = JSON.stringify( arr );
   //localStorage.setItem( "search_list", str );
  function getHistory() {
    var history = localStorage.getItem('search_list') || '[]'
    var arr = JSON.parse(history)
    return arr
  }
  render()
  function render() {
    var arr = getHistory()
    $('.history').html(template('tmp', { arr : arr}))
  }

  $('.search_button').click(function() {
    var key = $('.search_input').val()
    if(key === '') {
      mui.toast('请输入搜索关键字')
      return
    }
    var arr = getHistory()
    var index = arr.indexOf(key)
    if(index > -1) {
      arr.splice(index, 1)
    }
    if(arr.length >= 5) {
      arr.pop()
    }
    arr.unshift(key)
    str = JSON.stringify(arr)
    localStorage.setItem( "search_list", str )
    render()
    $('.search_input').val('')

    location.href = 'searchList.html?key=' + key
  })

  $('.history_title .pull-right').click(function() {
      mui.confirm('你是否要清空所有的历史记录?', '温馨提示', ['取消','确定'], function(e) {
      if(e.index == 1) {
        localStorage.removeItem('search_list')
        render()
      }
    })
  })

  $('.history').on('click', '.btn_delete', function() {
    var index = $(this).data('index')
    var arr = getHistory()
    arr.splice(index, 1)
    str = JSON.stringify(arr)
    localStorage.setItem( "search_list", str )
    render()
  })
})
