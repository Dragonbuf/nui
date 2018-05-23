/**
 * Created by Lucas on 17/6/30.
 */
;
//页面加载所要进行的操作
$(function () {
    //设置ajax当前状态(是否可以发送);
    ajaxStatus = true;
});

/*//调用实例
 $(function () {
    $('#form-login').submitAjax();
 });*/
;(function ($, window, document) {
    var methods = {
        init: function (options) {      // ajax(post方式提交)
            var settings = $.extend({
                'csrfToken': $('meta[name="csrf-token"]').attr("content"),
                'url': $(this).attr('action'),
                'data': $(this).serialize(),
                'before': true,
                'cache': true,
                'alone': false,
                'type': 'post',
                'dataType': 'json',
            }, options);
            settings.headers = {'X-CSRF-TOKEN': settings.csrfToken};
            ajax(settings);
        },
        post: function (options) {   // post提交
            var settings = $.extend({
                'csrfToken': '',
                'data': {},
                'before': true,
                'async': false,
                'type': 'post',
                'dataType': 'json',
            }, options);
            if (settings.csrfToken) {
                settings.headers = {'X-CSRF-TOKEN': settings.csrfToken};
            }
            ajax(settings);
        },
        get: function (options) {   // get提交
            var settings = $.extend({
                'data': {},
                'before': true,
                'async': false,
                'type': 'get',
                'dataType': 'json',
            }, options);
            ajax(settings);
        },
        jsonp: function (options) {   // jsonp跨域请求(get方式提交)
            var settings = $.extend({
                'data': {},
                'before': true,
                'async': false,
                'data': 'get',
                'dataType': 'jsonp'
            }, options);
            ajax(settings);
        }
    };

    $.fn.submitAjax = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.submitAjax');
        }
    };

    // ajax封装
    function ajax(options) {
        var defaults = {
            type: 'post',   //请求类型
            dataType: 'json', //接收数据类型
            async: true,    //异步请求
            alone: false,   //独立提交(一次有效的提交)
            cache: false,   //浏览器历史缓存
            data: {},
            headers: {},
            before : function () {   //是否显示加载动画
                dialog.loading();
            },
            success: function (response) {
                /*console.log('请求成功');*/
                dialog.close();
                if (response.code == 200) {//服务器处理成功
                    setTimeout(function () {
                        dialog.alert({
                            text: response.message,
                            type: "success",
                            onclose: function () {

                                if (response.url) {
                                    location.replace(response.url);
                                } else {
                                    location.reload(true);
                                }
                            }
                        });
                    }, 200);
                } else {//服务器处理失败
                    setTimeout(function () {
                        dialog.alert(response.message, '', 'error');
                    }, 200);

                    if (alone) {//改变ajax提交状态
                        ajaxStatus = true;
                    }
                }
            },
            error: function (response) {
                /*console.log(response.code);//错误状态吗*/
                dialog.close();

                setTimeout(function () {
                    setTimeout(function () {
                        if (response.code == 404) {
                            dialog.alert(response.message, '', 'error');
                        } else if (response.code == 503) {
                            dialog.alert(response.message, '', 'error');
                        } else {
                            dialog.alert(response.message, '', 'error');
                        }
                    }, 200);
                    ajaxStatus = true;
                }, 500);
            }
        };

        defaults = $.extend(defaults, options);
        defaults.before = defaults.before === false ? false : function(){dialog.loading();}

        // /*判断是否可以发送请求*/
        if (!ajaxStatus) {
            return false;
        }
        ajaxStatus = false;//禁用ajax请求
        /*正常情况下1秒后可以再次多个异步请求，为true时只可以有一次有效请求（例如添加数据）*/
        if (!defaults.alone) {
            setTimeout(function () {
                ajaxStatus = true;
            }, 1000);
        }

        $.ajax({
            url: defaults.url,
            data: defaults.data,
            type: defaults.type,
            dataType: defaults.dataType,
            headers: defaults.headers,
            async: defaults.async,
            beforeSend: defaults.before,
            success: defaults.success,
            error: defaults.error,
            jsonpCallback: 'jsonp' + (new Date()).valueOf().toString().substr(-4)
        });
    }
})(jQuery, window, document);