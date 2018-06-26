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
      url: '/category/querySecondCategoryPaging',
      data: {
        page: pages,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        //console.log(info);
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

  $('#addBtn').click(function() {
    $('#myModals').modal('show')

    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        $('.dropdown-menu').html(template('tpl', info))
      }
    })
  })

  $('.dropdown-menu').on('click', 'a', function() {
    var txt = $(this).text()
    $('.categoryId').val($(this).data('id'))

    $('.dropdownText').text(txt)

    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })

  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      $('#imgBox img').attr('src', data.result.picAddr)
      $('.brandLogo').val(data.result.picAddr)
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  });

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      },
    }
  })

  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info) {
        //console.log(info);
        $('#form').data('bootstrapValidator').resetForm(true)
        $('#myModals').modal('hide')
        pages = 1
        rander()
      }
    })
  })
})