/**
 * Created by xuhao on 2018/6/27.
 */
$(function() {
  var pages = 1
  var pageSize = 3
  var arr = []
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
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
          itemTexts: function(type, page, current) {
            switch(type) {
              case 'first':
                return '首页';
              case 'prev':
                return "上一页";
              case 'next':
                return "下一页";
              case 'last':
                return '尾页';
              case 'page':
                return page;
            }
          },
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
      url: '/category/querySecondCategoryPaging',
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
    $('.dropdownText').text($(this).text())
    $('.brandId').val($(this).data('id'))
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result.picAddr);
      arr.unshift(data.result)
      if(arr.length > 3) {
        arr.pop()
        $('#imgBox img:last-of-type').remove()
      }
      if(arr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
        console.log(arr);
      }
      $('#imgBox').prepend('<img src="' + data.result.picAddr + '" alt="" width="100" height="100">')
    }
  })

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]+\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^[3-4]+[2-9]+[-]+[3-4]+[0-9]$/,
            message: '尺码格式, 必须是 32-49'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      },
    }
  })

  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    //console.log($('#form').serialize());
    var car = $('#form').serialize() +'&picName1='+ arr[0].picName + '&picAddr1=' + arr[0].picAddr
      +'&picName2='+ arr[1].picName + '&picAddr2=' + arr[1].picAddr
      +'&picName3='+ arr[2].picName + '&picAddr3=' + arr[2].picAddr
    //console.log(car);
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      //第1张图片的 名称picName1
      //第1张图片的 地址picAddr1
      //第2张图片的 名称picName2
      //第2张图片的 地址picAddr2
      //第3张图片的 名称picName3
      //picAddr3
      data: car,
      dataType: 'json',
      success: function(info) {
        //console.log(info);
        $('#myModals').modal('hide')
        $('#form').data('bootstrapValidator').resetForm(true)
        pages = 1
        rander()
      }
    })
  })

})

