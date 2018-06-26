/**
 * Created by xuhao on 2018/6/26.
 */
$(function() {
  var pages = 1
  var pageSize = 5
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: pages,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function(info) {
        //console.log(info);
        $('tbody').html(template('tmp', info))

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
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

  $('#addBtn').click(function() {
    $('#myModals').modal('show')
  })

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators:{
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info) {
        if(info.success) {

          $('#myModals').modal('hide')

          $('#form').data('bootstrapValidator').resetForm(true)

          pages = 1
          rander()
        }
      }
    })
  })
})