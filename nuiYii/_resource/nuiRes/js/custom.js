$(document).ready(function () {
    $(".preloader").hide();
    $('#side-menu').metisMenu();
    // Theme settings
    $(".open-close").click(function () {
        $("body").toggleClass("show-sidebar").toggleClass("hide-sidebar");
        $(".sidebar-head .open-close i").toggleClass("ti-menu");

    });
    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    // Sets the min-height of #page-wrapper to window size
    $(function () {
        $(window).bind("load resize", function () {
            topOffset = 60;
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100; // 2-row-menu
            }
            else {
                $('div.navbar-collapse').removeClass('collapse');
            }
            height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        });
        var url = window.location;
        var element = $('ul.nav a').filter(function () {
            return this.href == url || url.href.indexOf(this.href) == 0;
        }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
    });
    // This is for resize window
    $(function () {
        $(window).bind("load resize", function () {
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 1170) {
                $('body').addClass('content-wrapper');
                $(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");

            }
            else {
                $('body').removeClass('content-wrapper');

            }
        });
    });

    // Collapse Panels
    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-collapse"]';
        $(panelSelector).each(function () {
            var $this = $(this)
                , parent = $this.closest('.panel')
                , wrapper = parent.find('.panel-wrapper')
                , collapseOpts = {
                toggle: false
            };
            if (!wrapper.length) {
                wrapper = parent.children('.panel-heading').nextAll().wrapAll('<div/>').parent().addClass('panel-wrapper');
                collapseOpts = {};
            }
            wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
                $this.children('i').removeClass('ti-minus').addClass('ti-plus');
            }).on('show.bs.collapse', function () {
                $this.children('i').removeClass('ti-plus').addClass('ti-minus');
            });
        });
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel');
            var wrapper = parent.find('.panel-wrapper');
            wrapper.collapse('toggle');
        });
    }(jQuery, window, document));
    // Remove Panels
    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-dismiss"]';
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel');
            removeElement();

            function removeElement() {
                var col = parent.parent();
                parent.remove();
                col.filter(function () {
                    var el = $(this);
                    return (el.is('[class*="col-"]') && el.children('*').length === 0);
                }).remove();
            }
        });
    }(jQuery, window, document));
    //tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    //Popover
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    // Task
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });
    $(".settings_box a").click(function () {
        $("ul.theme_color").toggleClass("theme_block");
    });
});
//Colepsible toggle
$(".collapseble").click(function () {
    $(".collapseblebox").fadeToggle(350);
});
// Sidebar
$('.slimscrollright').slimScroll({
    height: '100%'
    , position: 'right'
    , size: "5px"
    , color: '#dcdcdc'
    , });
$('.slimscrollsidebar').slimScroll({
    height: '100%'
    , position: 'right'
    , size: "6px"
    , color: 'rgba(0,0,0,0.3)'
    , });
// Resize all elements
$("body").trigger("resize");
// visited ul li
$('.visited li a').click(function (e) {
    $('.visited li').removeClass('active');
    var $parent = $(this).parent();
    if (!$parent.hasClass('active')) {
        $parent.addClass('active');
    }
    e.preventDefault();
});
// this is for close icon when navigation open in mobile view
$(".navbar-toggle").click(function () {
    $(".navbar-toggle i").toggleClass("ti-menu");
    $(".navbar-toggle i").addClass("ti-close");
});
function __render_form (parent) {
    parent = typeof parent == "string" ? parent : "";
    if ($.fn.bootstrapDualListbox) {
        $(parent + " .select1").bootstrapDualListbox({
            filterTextClear: '显示全部',
            filterPlaceHolder: '搜索',
            moveSelectedLabel: '使用选中项',
            moveAllLabel: '选择全部',
            removeSelectedLabel: '移除选中项',
            removeAllLabel: '移除全部',                                                      // string, filter the selected options
            infoText: '共 {0}',                                                        // text when all options are visible / false for no info text
            infoTextFiltered: '搜到 {0} / {1}', // when not all of the options are visible due to the filter
            infoTextEmpty: '没有了',
            selectorMinimalHeight: 200,
            moveOnSelect: false
        });
    }
    if ($.fn.select2) {
        $(parent + " .select2").select2({formatNoMatches:'', width: '100%',language:'zh-CN'}).on('select2:select', function (evt) {
            var self = $(this), id = self.attr('id');
            var o = $('#' + id + '-ordered');
            var ov = o.val() ? o.val().split(','): [];
            ov.push(evt.params.data.id);
            o.val(ov.join(','));
        }).on('select2:unselect', function (evt) {
            var self = $(this), id = self.attr('id');
            var o = $('#' + id + '-ordered');
            var ov = o.val() ? o.val().split(','): [];
            var idx = $.inArray(evt.params.data.id, ov);
            ov.splice(idx, 1);
            o.val(ov.join(','));
        });;
    }
    if ($.fn.selectpicker) {
        $(parent + " .select3").selectpicker();
    }

    // Colorpicker
    if ($.fn.clockpicker) {
        $(parent + ' .clockpicker').clockpicker({
            donetext: '完成'
            , }).find('input').change(function () {
            console.log(this.value);
        });

        $(parent + " .colorpicker").asColorPicker();
        $(parent + " .complex-colorpicker").asColorPicker({
            mode: 'complex'
        });
        $(parent + " .gradient-colorpicker").asColorPicker({
            mode: 'gradient'
        });
    }


    if (typeof AutoNumeric !== 'undefined') {
        new AutoNumeric(".currency", { currencySymbol : '￥',digitalGroupSpacing:3,unformatOnSubmit:true,digitGroupSeparator:"," });
    }

    // Switchery
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    $(parent + ' .js-switch').each(function () {
        if (typeof Switchery !== 'undefined') new Switchery($(this)[0], $(this).data());
    });

    if ($.fn.datepicker) {
        var _defaultOptions = {
            weekStart: 0,
            language: "zh-CN",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        };

        $('.datepicker').each(function() {
            if ($(this).data('datepicker-ignore')) return ;

            var options = $.extend({}, _defaultOptions);
            var format = $(this).data('format');
            options.format = format;

            $(this).datepicker(options);
            $(this).data('datepicker-ignore', 1);
        });
    }

    // Daterange picker
    if ($.fn.daterangepicker) {
        var _defaultOptions = {
            "autoApply": true,
            "ranges": {
                "今天": [moment(), moment()],
                "昨天": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                "最近7天": [moment().subtract(6, 'days'), moment()],
                "最近30天": [moment().subtract(29, 'days'), moment()],
                "本月": [moment().startOf('month'), moment().endOf('month')],
                "上月": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "locale": {
                "format": "YYYY-MM-DD",
                "separator": " - ",
                "applyLabel": "确定",
                "cancelLabel": "取消",
                "fromLabel": "从",
                "toLabel": "到",
                "daysOfWeek": [
                    "日",
                    "一",
                    "二",
                    "三",
                    "四",
                    "五",
                    "六"
                ],
                "monthNames": [
                    "一月",
                    "二月",
                    "三月",
                    "四月",
                    "五月",
                    "六月",
                    "七月",
                    "八月",
                    "九月",
                    "十月",
                    "十一月",
                    "十二月"
                ],
                "firstDay": 1
            },
            "showCustomRangeLabel": false,
            "alwaysShowCalendars": true,
            'autoUpdateInput' : false
        };

        $(parent + ' .date-range-picker').each(function () {
            var options = $.extend({}, _defaultOptions);
            if ($(this).hasClass('withtime')) {
                options.timePicker = true;
                options.timePicker24Hour = true;
                options.timePickerIncrement = $(this).data('time-increment') || 1;
                options.locale.format = "YYYY-MM-DD HH:mm:00";
            }
            $(this).daterangepicker(options).on('apply.daterangepicker',function (ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD')+'-'+picker.endDate.format('YYYY-MM-DD'))
            }).on('cancel.daterangepicker',function (ev, picker) {
                $(this).val('')
            });
        });
    }

    $('[data-provides="fileinput"]').each(function () {
        var $this = $(this);
        var $file = $this.find(':file'), $dismiss = $this.find('[data-dismiss="fileinput"]'), $nooss = $this.data('nooss'), $is_uploading = function () { return $file.data('uploading') };
        var $hidden = $('#' + $file.attr('name').replace('file-', '')), xhr, ajaxing = false;
        var $hidden2 = $('#' + $file.attr('name').replace('file-', 'filesize-'));
        var $loading = $this.find('.fileinput-state'), $progress = $this.find('.fileinput-progress');

        if ($nooss || $file.data('file') != 'oss') return ;

        function cancel() {
            ajaxing && xhr && typeof xhr.abort == 'function' && xhr.abort();
            reset();
        }

        function reset() {
            $file.data('uploading', 0);
            $file.removeAttr('disabled');
            progress();
        }

        function uploading() {
            $file.prop('disabled', 'disabled');
            $file.data('uploading', 1);
            $loading.removeClass().addClass('fileinput-state').addClass('text-mute').html('&nbsp;&nbsp;-&nbsp;&nbsp;<i class="fa fa-spin fa-circle-o-notch"></i> 上传中');
        }

        function progress(p) {
            $progress.html(p && " " + p + '%' || '');
        }

        function upload() {
            var $d = $file.data();
            $d.filename = $file.get(0).files.length > 0 && $file.get(0).files[0].name;
            if (!$d.filename) {
                return ;
            }

            uploading();
            $.post($d.authurl, $d, function (json) {
                if (!json.success) {
                    cancel();

                    var v = $file.closest('form').data('bs.validator');
                    v && $file.closest('form').data('bs.validator.errors', [json.error]) && v.showErrors($file);
                    return ;
                }

                // upload file
                var fd = new FormData();
                $.each(['key', 'success_action_status', 'OSSAccessKeyId', 'policy', 'Signature'], function (k, v) {
                    fd.append(v, json[v]);
                });
                fd.append('file', $file.get(0).files[0]);

                $.ajax({
                    url: json.ossurl,
                    data: fd,
                    method: 'post',
                    dataType: 'xml',
                    processData: false,
                    contentType: false,
                    success: function (xml) {
                        $loading.removeClass().addClass('fileinput-state').addClass('text-success').html('&nbsp;&nbsp;-&nbsp;&nbsp;<i class="fa  fa-check-circle"></i> 上传成功');
                        $hidden.val(json.ossurl + '/' + json.key);
                        $hidden2.val($file.get(0).files[0].size);
                    },
                    error: function () {
                        $loading.removeClass().addClass('fileinput-state').addClass('text-danger').html('&nbsp;&nbsp;-&nbsp;&nbsp;<i class="fa  fa-check-circle"></i> 上传失败');
                    },
                    complete: function () {
                        reset();
                        $file.val('');
                        var v = $file.closest('form').data('bs.validator');
                        v && v.clearErrors($file);
                    },
                    xhr: function () {
                        xhr = $.ajaxSettings.xhr();
                        //Download progress
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = (evt.loaded * 100.0 / evt.total);
                                if (percentComplete.toFixed) {
                                    percentComplete = percentComplete.toFixed(2);
                                } else {
                                    percentComplete = Math.floor(percentComplete);
                                }
                                progress(percentComplete);
                            }
                        }, false);
                        return xhr;
                    },
                });
            }, 'json').fail(function (e) {
                cancel();

                var v = $file.closest('form').data('bs.validator');
                v && $file.data('bs.validator.errors', ['上传失败：获取上传参数失败']) && v.showErrors($file);
            });
            ajaxing = true;
        }

        $file.on('change.oss', function (e) {
            if ($is_uploading()) {
                cancel();
            }

            var v = $file.closest('form').data('bs.validator');
            v && v.clearErrors($file);
            v && (defer = v.validateInput($file, false));
            try {
                v && v.showErrors($file);
            } catch (e) {}
            if ($file.closest('.has-error').length == 0) {
                upload();
            } else {
                reset();
                $file.val('');
                $hidden.val('');
                $hidden2.val('');
                $loading.removeClass().addClass('fileinput-state').html('');
            }
        });

        $dismiss.on('click.oss', function (e) {
            cancel();
            $loading.removeClass().addClass('fileinput-state').html('');
            $hidden.val('');
            $hidden2.val('');
        })
    });

    if (typeof Dropzone != 'undefined') $('.dropzone').each(function () {
        var $this = $(this), dropzone;
        var d = $this.data();

        if (d.dropzone) return ;

        var options = {};
        d.url && (options.url = d.url);
        d.paralleluploads && (options.parallelUploads = d.paralleluploads);
        d.maxsize && (options.maxFilesize = d.maxsize);
        var es = [];
        options.acceptedFiles = "";
        if (d.extensions) {
            var p = d.extensions.split(',');
            for (var i in p) {
                if (p[i]) {
                    es.push('.' + p[i]);
                }
            }
            options.acceptedFiles += es.join(',');
        }
        if (d.mimetypes) {
            options.acceptedFiles && (options.acceptedFiles += ',');
            options.acceptedFiles += d.mimetypes;
        }
        d.mimetypes && (options.capture = d.mimetypes);
        d.maxfiles && (options.parallelUploads = d.maxfiles);
        d.removeable && (options.addRemoveLinks = true);
        options.timeout = 120000;
        options.filesizeBase = 1024;

        options.beforeUpload = function (files, done) {
            if (!d.ossserver) return done();

            d.filename = files[0].name;

            ajax = $.post(d.authurl, d, function (json) {
                if (!json.success) {
                    done(json.error);
                    return ;
                }

                // upload file
                var fd = {};
                $.each(['key', 'success_action_status', 'OSSAccessKeyId', 'policy', 'Signature'], function (k, v) {
                    fd[v] = json[v];
                });

                dropzone.options.paramName = 'file';
                dropzone.options.url = json.ossurl;
                dropzone.options.params = fd;
                done();
            }, 'json').fail(function (e) {
                done('上传失败：获取上传参数失败');
            });
        };

        dropzone = new Dropzone($this.get(0), options);

        dropzone.on('addedfile', function (file) {
            $this.find(':file').data('uploading', dropzone.getActiveFiles().length);
        }).on('complete', function (file) {
            $this.find(':file').data('uploading', dropzone.getActiveFiles().length);
            if (!dropzone.getActiveFiles().length) {
                var v = $this.closest('form').data('bs.validator');
                v && v.clearErrors($this);
            }
        }).on('removedfile', function (file) {
            if (!file.xhr || !file.xhr.response) return ;
            var dom = $(file.xhr.response);
            var hidden = $this.find(':hidden[value="' + dom.find('Location').text() + '"]');
            hidden.next().next().remove();
            hidden.next().remove();
            hidden.remove();
        }).on('success', function (file, xml) {
            var dom = $(xml);
            $this.append('<input type="hidden" name="' + d.name + '[]" value="' + dom.find('Location').html() + '">');
            $this.append('<input type="hidden" name="origin-' + d.name + '[]" value="' + file.name + '">');
            $this.append('<input type="hidden" name="size-' + d.name + '[]" value="' + file.size + '">');
        })


        $this.closest('form').submit(function (e) {
            if (dropzone.getActiveFiles().length) {
                e.preventDefault();
                var v = $this.closest('form').data('bs.validator');
                v && $this.data('bs.validator.errors', ['正在上传，请稍候提交']) && v.showErrors($this);
                return false;
            }
        })

        $this.data('dropzone', 1);
    })
}
$(__render_form);

var dropzone_dict = {
    dictCancelUpload: "取消上传",
    dictCancelUploadConfirmation: "确定取消吗?",
    dictDefaultMessage: "请把文件拖到这里上传",
    dictFallbackMessage: "浏览器不支持拖文件上传",
    dictFallbackText: "点击下方浏览按钮上传文件",
    dictFileTooBig: "文件太大了 ({{filesize}}MB). 限制大小为: {{maxFilesize}}MB.",
    dictInvalidFileType: "文件类型错误",
    dictMaxFilesExceeded: "允许上传的文件数已满",
    dictRemoveFile: "删除",
    dictRemoveFileConfirmation: null,
    dictResponseError: "服务器错误，错误码： {{statusCode}}"
}
if (typeof Dropzone != 'undefined') {
    Dropzone.prototype.defaultOptions = $.extend(Dropzone.prototype.defaultOptions, dropzone_dict);
    Dropzone.autoDiscover = false;
}