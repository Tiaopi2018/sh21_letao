/**
 * Created by xuhao on 2018/6/27.
 */
$(function() {
  var pages = 1
  var pageSize = 5
  var currentId
  var isDelete
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: pages,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        $('tbody').html(template('tmp', info))

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: pages,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            pages = page
            rander()
          }
        })
      }
    })
  }

  $('tbody').on('click', '.btn', function() {
    $('#myModals').modal('show')
    currentId = $(this).data('id')
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1
  })
  $('.modal-footer.user .btn-primary').click(function() {
    $.ajax({
      type:'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function(info) {
        $('#myModals').modal('hide')
        pages = 1
        rander()
      }
    })
  })
})