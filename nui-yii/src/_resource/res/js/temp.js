$(document).ready(function () {
    $(function () {
        $(".preloader").fadeOut();
        $('#side-menu').metisMenu();
    });
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
        $(parent + " .select2").select2({formatNoMatches:'', width: '100%'});
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
    // Switchery
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    $(parent + ' .js-switch').each(function () {
        if (typeof Switchery !== 'undefined') new Switchery($(this)[0], $(this).data());
    });

    // Daterange picker
    if ($.fn.daterangepicker) {
        $(parent + ' .input-daterange-datepicker').daterangepicker({
            buttonClasses: ['btn', 'btn-sm']
            , format: 'yyyy-mm-dd'
            , applyClass: 'btn-danger'
            , cancelClass: 'btn-inverse'
        });
        $(parent + ' .input-daterange-timepicker').daterangepicker({
            timePicker: true
            , format: 'YYYY-MM-DD h:mm A'
            , timePickerIncrement: 1
            , timePicker12Hour: 1
            , timePickerSeconds: true
            , buttonClasses: ['btn', 'btn-sm']
            , applyClass: 'btn-danger'
            , cancelClass: 'btn-inverse'
        });
        $(parent + ' .input-limit-datepicker').daterangepicker({
            format: 'MM/DD/YYYY'
            , minDate: '06/01/2017'
            , maxDate: '06/30/2017'
            , buttonClasses: ['btn', 'btn-sm']
            , applyClass: 'btn-danger'
            , cancelClass: 'btn-inverse'
            , dateLimit: {
                days: 6
            }
        });
    }

    $('[data-provides="fileinput"]').each(function () {
        var $this = $(this);
        var $file = $this.find(':file'), $dismiss = $this.find('[data-dismiss="fileinput"]'), $nooss = $this.data('nooss'), $is_uploading = function () { return $file.data('uploading') };
        var $hidden = $('#' + $file.attr('name').replace('file-', '')), xhr, ajaxing = false;
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
                $loading.removeClass().addClass('fileinput-state').html('');
            }
        });

        $dismiss.on('click.oss', function (e) {
            cancel();
            $loading.removeClass().addClass('fileinput-state').html('');
            $hidden.val('');
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
            if (!file.xhr || !file.xhr.responseXML) return ;
            var dom = file.xhr.responseXML;
            var hidden = $this.find(':hidden[value="' + dom.children[0].children[1].innerHTML + '"]');
            hidden.next().remove();
            hidden.remove();
        }).on('success', function (file, xml) {
            var dom = file.xhr.responseXML;
            $this.append('<input type="hidden" name="' + d.name + '[]" value="' + dom.children[0].children[1].innerHTML + '">');
            $this.append('<input type="hidden" name="origin-' + d.name + '[]" value="' + file.name + '">');
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
/* ========================================================================
 * Bootstrap (plugin): validator.js v0.11.9
 * ========================================================================
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Cina Saffary.
 * Made by @1000hz in the style of Bootstrap 3 era @fat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ======================================================================== */


+function ($) {
    'use strict';

    // VALIDATOR CLASS DEFINITION
    // ==========================

    function getValue($el) {
        return $el.is('[type="checkbox"]') ? $el.prop('checked')                                     :
            $el.is('[type="radio"]')    ? !!$('[name="' + $el.attr('name') + '"]:checked').length :
                $el.is('select[multiple]')  ? ($el.val() || []).length                                :
                    $el.val()
    }

    var Validator = function (element, options) {
        this.options    = options
        this.validators = $.extend({}, Validator.VALIDATORS, options.custom)
        this.$element   = $(element)
        this.$btn       = $('button[type="submit"], input[type="submit"]')
            .filter('[form="' + this.$element.attr('id') + '"]')
            .add(this.$element.find('input[type="submit"], button[type="submit"]'))

        this.update()

        this.$element.on('input.bs.validator change.bs.validator focusout.bs.validator', $.proxy(this.onInput, this))
        this.$element.on('submit.bs.validator', $.proxy(this.onSubmit, this))
        this.$element.on('reset.bs.validator', $.proxy(this.reset, this))

        this.$element.find('[data-match]').each(function () {
            var $this  = $(this)
            var target = $this.attr('data-match')

            $(target).on('input.bs.validator', function (e) {
                getValue($this) && $this.trigger('input.bs.validator')
            })
        })

        // run validators for fields with values, but don't clobber server-side errors
        this.$inputs.filter(function () {
            return getValue($(this)) && !$(this).closest('.has-error').length
        }).trigger('focusout')

        this.$element.attr('novalidate', true) // disable automatic native validation
    }

    Validator.VERSION = '0.11.9'

    Validator.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)'

    Validator.FOCUS_OFFSET = 20

    Validator.DEFAULTS = {
        delay: 500,
        html: false,
        disable: true,
        focus: true,
        custom: {},
        errors: {
            match: 'Does not match',
            minlength: 'Not long enough'
        },
        feedback: {
            success: 'glyphicon-ok',
            error: 'glyphicon-remove'
        }
    }

    Validator.VALIDATORS = {
        'native': function ($el) {
            var el = $el[0]
            if (el.checkValidity) {
                return !el.checkValidity() && !el.validity.valid && (el.validationMessage || "error!")
            }
        },
        'match': function ($el) {
            var target = $el.attr('data-match')
            return $el.val() !== $(target).val() && Validator.DEFAULTS.errors.match
        },
        'minlength': function ($el) {
            var minlength = $el.attr('data-minlength')
            return $el.val().length < minlength && Validator.DEFAULTS.errors.minlength
        }
    }

    Validator.prototype.update = function () {
        var self = this

        this.$inputs = this.$element.find(Validator.INPUT_SELECTOR)
            .add(this.$element.find('[data-validate="true"]'))
            .not(this.$element.find('[data-validate="false"]')
                .each(function () { self.clearErrors($(this)) })
            )

        this.toggleSubmit()

        return this
    }

    Validator.prototype.onInput = function (e) {
        var self        = this
        var $el         = $(e.target)
        var deferErrors = e.type !== 'focusout'

        if (!this.$inputs.is($el)) return

        this.validateInput($el, deferErrors).done(function () {
            self.toggleSubmit()
        })
    }

    Validator.prototype.validateInput = function ($el, deferErrors) {
        var value      = getValue($el)
        var prevErrors = $el.data('bs.validator.errors')

        if ($el.is('[type="radio"]')) $el = this.$element.find('input[name="' + $el.attr('name') + '"]')

        var e = $.Event('validate.bs.validator', {relatedTarget: $el[0]})
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return

        var self = this

        return this.runValidators($el).done(function (errors) {
            $el.data('bs.validator.errors', errors)

            errors.length
                ? deferErrors ? self.defer($el, self.showErrors) : self.showErrors($el)
                : self.clearErrors($el)

            if (!prevErrors || errors.toString() !== prevErrors.toString()) {
                e = errors.length
                    ? $.Event('invalid.bs.validator', {relatedTarget: $el[0], detail: errors})
                    : $.Event('valid.bs.validator', {relatedTarget: $el[0], detail: prevErrors})

                self.$element.trigger(e)
            }

            self.toggleSubmit()

            self.$element.trigger($.Event('validated.bs.validator', {relatedTarget: $el[0]}))
        })
    }


    Validator.prototype.runValidators = function ($el) {
        var errors   = []
        var deferred = $.Deferred()

        $el.data('bs.validator.deferred') && $el.data('bs.validator.deferred').reject()
        $el.data('bs.validator.deferred', deferred)

        function getValidatorSpecificError(key) {
            return $el.attr('data-' + key + '-error')
        }

        function getValidityStateError() {
            var validity = $el[0].validity
            return validity.typeMismatch    ? $el.attr('data-type-error')
                : validity.patternMismatch ? $el.attr('data-pattern-error')
                    : validity.stepMismatch    ? $el.attr('data-step-error')
                        : validity.rangeOverflow   ? $el.attr('data-max-error')
                            : validity.rangeUnderflow  ? $el.attr('data-min-error')
                                : validity.valueMissing    ? $el.attr('data-required-error')
                                    :                            null
        }

        function getGenericError() {
            return $el.attr('data-error')
        }

        function getErrorMessage(key) {
            return getValidatorSpecificError(key)
                || getValidityStateError()
                || getGenericError()
        }

        $.each(this.validators, $.proxy(function (key, validator) {
            var error = null
            if ((getValue($el) || $el.attr('required')) &&
                ($el.attr('data-' + key) !== undefined || key == 'native') &&
                (error = validator.call(this, $el))) {
                error = getErrorMessage(key) || error
                !~errors.indexOf(error) && errors.push(error)
            }
        }, this))

        if (!errors.length && getValue($el) && $el.attr('data-remote')) {
            this.defer($el, function () {
                var data = {}
                data[$el.attr('name')] = getValue($el)
                $.get($el.attr('data-remote'), data)
                    .fail(function (jqXHR, textStatus, error) { errors.push(getErrorMessage('remote') || decodeURI(error)) })
                    .always(function () { deferred.resolve(errors)})
            })
        } else deferred.resolve(errors)

        return deferred.promise()
    }

    Validator.prototype.validate = function () {
        var self = this

        $.when(this.$inputs.map(function (el) {
            return self.validateInput($(this), false)
        })).then(function () {
            self.toggleSubmit()
            self.focusError()
        })

        return this
    }

    Validator.prototype.focusError = function () {
        if (!this.options.focus) return

        var $input = this.$element.find(".has-error :input:first")
        if ($input.length === 0) return

        $('html, body').animate({scrollTop: $input.offset().top - Validator.FOCUS_OFFSET}, 250)
        $input.focus()
    }

    Validator.prototype.showErrors = function ($el) {
        var method = this.options.html ? 'html' : 'text'
        var errors = $el.data('bs.validator.errors')
        var $group = $el.closest('.form-group')
        var $block = $group.find('.help-block.with-errors')
        var $feedback = $group.find('.form-control-feedback')

        if (!errors.length) return

        errors = $('<ul/>')
            .addClass('list-unstyled')
            .append($.map(errors, function (error) { return $('<li/>')[method](error) }))

        $block.data('bs.validator.originalContent') === undefined && $block.data('bs.validator.originalContent', $block.html())
        $block.empty().append(errors)
        $group.addClass('has-error has-danger')

        $group.hasClass('has-feedback')
        && $feedback.removeClass(this.options.feedback.success)
        && $feedback.addClass(this.options.feedback.error)
        && $group.removeClass('has-success')
    }

    Validator.prototype.clearErrors = function ($el) {
        var $group = $el.closest('.form-group')
        var $block = $group.find('.help-block.with-errors')
        var $feedback = $group.find('.form-control-feedback')

        $block.html($block.data('bs.validator.originalContent'))
        $group.removeClass('has-error has-danger has-success')

        $group.hasClass('has-feedback')
        && $feedback.removeClass(this.options.feedback.error)
        && $feedback.removeClass(this.options.feedback.success)
        && getValue($el)
        && $feedback.addClass(this.options.feedback.success)
        && $group.addClass('has-success')
    }

    Validator.prototype.hasErrors = function () {
        function fieldErrors() {
            return !!($(this).data('bs.validator.errors') || []).length
        }

        return !!this.$inputs.filter(fieldErrors).length
    }

    Validator.prototype.isIncomplete = function () {
        function fieldIncomplete() {
            var value = getValue($(this))
            return !(typeof value == "string" ? $.trim(value) : value)
        }

        return !!this.$inputs.filter('[required]').filter(fieldIncomplete).length
    }

    Validator.prototype.onSubmit = function (e) {
        this.validate()
        if (this.isIncomplete() || this.hasErrors()) e.preventDefault()
    }

    Validator.prototype.toggleSubmit = function () {
        if (!this.options.disable) return
        this.$btn.toggleClass('disabled', this.isIncomplete() || this.hasErrors())
    }

    Validator.prototype.defer = function ($el, callback) {
        callback = $.proxy(callback, this, $el)
        if (!this.options.delay) return callback()
        window.clearTimeout($el.data('bs.validator.timeout'))
        $el.data('bs.validator.timeout', window.setTimeout(callback, this.options.delay))
    }

    Validator.prototype.reset = function () {
        this.$element.find('.form-control-feedback')
            .removeClass(this.options.feedback.error)
            .removeClass(this.options.feedback.success)

        this.$inputs
            .removeData(['bs.validator.errors', 'bs.validator.deferred'])
            .each(function () {
                var $this = $(this)
                var timeout = $this.data('bs.validator.timeout')
                window.clearTimeout(timeout) && $this.removeData('bs.validator.timeout')
            })

        this.$element.find('.help-block.with-errors')
            .each(function () {
                var $this = $(this)
                var originalContent = $this.data('bs.validator.originalContent')

                $this
                    .removeData('bs.validator.originalContent')
                    .html(originalContent)
            })

        this.$btn.removeClass('disabled')

        this.$element.find('.has-error, .has-danger, .has-success').removeClass('has-error has-danger has-success')

        return this
    }

    Validator.prototype.destroy = function () {
        this.reset()

        this.$element
            .removeAttr('novalidate')
            .removeData('bs.validator')
            .off('.bs.validator')

        this.$inputs
            .off('.bs.validator')

        this.options    = null
        this.validators = null
        this.$element   = null
        this.$btn       = null
        this.$inputs    = null

        return this
    }

    // VALIDATOR PLUGIN DEFINITION
    // ===========================


    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var options = $.extend({}, Validator.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var data    = $this.data('bs.validator')

            if (!data && option == 'destroy') return
            if (!data) $this.data('bs.validator', (data = new Validator(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.validator

    $.fn.validator             = Plugin
    $.fn.validator.Constructor = Validator


    // VALIDATOR NO CONFLICT
    // =====================

    $.fn.validator.noConflict = function () {
        $.fn.validator = old
        return this
    }


    // VALIDATOR DATA-API
    // ==================

    $(window).on('load', function () {
        $('[data-toggle="validator"]').each(function () {
            var $form = $(this)
            Plugin.call($form, $form.data())
        })
    })

}(jQuery);
/**
 * Created by root on 17-7-13.
 */
$.fn.validator.Constructor.DEFAULTS.errors = _err = {
    equals: "值不相等，应该相等",
    notequals: "值相等，应当不相等",
    bigger: "that's not valid",
    biggerequals: "that's not valid",
    less: "that's not valid",
    lessequals: "that's not valid",
    extension: "不允许此类型文件上传",
    type: "不允许此类型文件上传",
    minsize: "文件太小了",
    maxsize: "文件太大了",
    uploading: "文件正在上传中"
}
$.fn.validator.Constructor.VALIDATORS.equals = function($el) {
    var matchValue = $el.data("equals")
    return $el.val()*1 !== matchValue*1 && _err.equals
}
$.fn.validator.Constructor.VALIDATORS.notequals = function($el) {
    var matchValue = $el.data("notequals")
    return $el.val()*1 === matchValue*1 && _err.notequals
}
$.fn.validator.Constructor.VALIDATORS.bigger = function($el) {
    var matchValue = $el.data("bigger")
    return $el.val()*1 <= matchValue*1 && _err.bigger
}
$.fn.validator.Constructor.VALIDATORS.biggerequals=function($el) {
    var matchValue = $el.data("biggerequals")
    return $el.val()*1 < matchValue*1 && _err.biggerequals
}
$.fn.validator.Constructor.VALIDATORS.less= function($el) {
    var matchValue = $el.data("less")
    return $el.val()*1 >= matchValue*1 && _err.less
}
$.fn.validator.Constructor.VALIDATORS.lessequals = function($el) {
    var matchValue = $el.data("lessequals")
    return $el.val()*1 > matchValue*1 && _err.lessequals
}
$.fn.validator.Constructor.VALIDATORS.file = function ($el) {
    var extensions = $el.data('extensions');
    var mimetypes = $el.data('mimetypes');
    var minsize = $el.data('minsize');
    var maxsize = $el.data('maxsize');

    if ($el.get(0).files.length == 0) return false;

    if ($el.data('uploading')) return _err.uploading;

    var file = $el.get(0).files[0];
    var ext = file && file.name.substr(file.name.lastIndexOf('.') + 1) || '';

    if (extensions && (!ext || !extensions.match(new RegExp("\\b" + ext + "\\b")))) {
        return _err.extension;
    }
    var t = mimetypes && mimetypes.split(',') || [], valid_type = false, ta = file.type.split('/');
    for (var i in t) {
        var row = t[i];
        if (row == '*/*') {
            valid_type = true;
            break;
        }

        var p = row.split('/');
        if ((p[0] == '*' || p[0] == ta[0]) && (p[1] == '*' || p[1] == ta[1])) {
            valid_type = true;
            break;
        }
    }

    if (t.length > 0 && !valid_type) return _err.type;

    if (minsize && file.size < minsize) return _err.minsize;
    if (maxsize && file.size > maxsize) return _err.maxsize;

    return false;
}

$.fn.validator.Constructor.VALIDATORS.dropzone = function ($el) {
    var $real_el = $el.closest('.dropzone');

    if ($el.data('uploading')) return _err.uploading;

    return false;
}
/*! art-template@4.12.1 for browser | https://github.com/aui/art-template */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.template=t():e.template=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t,n){(function(t){e.exports=!1;try{e.exports="[object process]"===Object.prototype.toString.call(t.process)}catch(n){}}).call(t,n(4))},function(e,t,n){"use strict";var r=n(8),i=n(3),o=n(23),s=function(e,t){t.onerror(e,t);var n=function(){return"{Template Error}"};return n.mappings=[],n.sourcesContent=[],n},a=function c(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};"string"!=typeof e?t=e:t.source=e,t=i.$extend(t),e=t.source,!0===t.debug&&(t.cache=!1,t.minimize=!1,t.compileDebug=!0),t.compileDebug&&(t.minimize=!1),t.filename&&(t.filename=t.resolveFilename(t.filename,t));var n=t.filename,a=t.cache,u=t.caches;if(a&&n){var p=u.get(n);if(p)return p}if(!e)try{e=t.loader(n,t),t.source=e}catch(d){var l=new o({name:"CompileError",path:n,message:"template not found: "+d.message,stack:d.stack});if(t.bail)throw l;return s(l,t)}var f=void 0,h=new r(t);try{f=h.build()}catch(l){if(l=new o(l),t.bail)throw l;return s(l,t)}var m=function(e,n){try{return f(e,n)}catch(l){if(!t.compileDebug)return t.cache=!1,t.compileDebug=!0,c(t)(e,n);if(l=new o(l),t.bail)throw l;return s(l,t)()}};return m.mappings=f.mappings,m.sourcesContent=f.sourcesContent,m.toString=function(){return f.toString()},a&&n&&u.set(n,m),m};a.Compiler=r,e.exports=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,t.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t}},function(e,t,n){"use strict";function r(){this.$extend=function(e){return e=e||{},s(e,e instanceof r?e:this)}}var i=n(0),o=n(12),s=n(13),a=n(14),c=n(15),u=n(16),p=n(17),l=n(18),f=n(19),h=n(20),m=n(22),d={source:null,filename:null,rules:[f,l],escape:!0,debug:!!i&&"production"!==process.env.NODE_ENV,bail:!0,cache:!0,minimize:!0,compileDebug:!1,resolveFilename:m,include:a,htmlMinifier:h,htmlMinifierOptions:{collapseWhitespace:!0,minifyCSS:!0,minifyJS:!0,ignoreCustomFragments:[]},onerror:c,loader:p,caches:u,root:"/",extname:".art",ignore:[],imports:o};r.prototype=d,e.exports=new r},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(r){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){},function(e,t,n){"use strict";var r=n(7),i=n(1),o=n(24),s=function(e,t){return t instanceof Object?r({filename:e},t):i({filename:e,source:t})};s.render=r,s.compile=i,s.defaults=o,e.exports=s},function(e,t,n){"use strict";var r=n(1),i=function(e,t,n){return r(e,n)(t)};e.exports=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=n(9),o=n(11),s="$data",a="$imports",c="print",u="include",p="extend",l="block",f="$$out",h="$$line",m="$$blocks",d="$$slice",v="$$from",g="$$options",y=function(e,t){return e.hasOwnProperty(t)},b=JSON.stringify,x=function(){function e(t){var n,i,y=this;r(this,e);var b=t.source,x=t.minimize,w=t.htmlMinifier;if(this.options=t,this.stacks=[],this.context=[],this.scripts=[],this.CONTEXT_MAP={},this.ignore=[s,a,g].concat(t.ignore),this.internal=(n={},n[f]="''",n[h]="[0,0]",n[m]="arguments[1]||{}",n[v]="null",n[c]="function(){var s=''.concat.apply('',arguments);"+f+"+=s;return s}",n[u]="function(src,data){var s="+g+".include(src,data||"+s+",arguments[2]||"+m+","+g+");"+f+"+=s;return s}",n[p]="function(from){"+v+"=from}",n[d]="function(c,p,s){p="+f+";"+f+"='';c();s="+f+";"+f+"=p+s;return s}",n[l]="function(){var a=arguments,s;if(typeof a[0]==='function'){return "+d+"(a[0])}else if("+v+"){"+m+"[a[0]]="+d+"(a[1])}else{s="+m+"[a[0]];if(typeof s==='string'){"+f+"+=s}else{s="+d+"(a[1])}return s}}",n),this.dependencies=(i={},i[c]=[f],i[u]=[f,g,s,m],i[p]=[v,u],i[l]=[d,v,f,m],i),this.importContext(f),t.compileDebug&&this.importContext(h),x)try{b=w(b,t)}catch(E){}this.source=b,this.getTplTokens(b,t.rules,this).forEach(function(e){e.type===o.TYPE_STRING?y.parseString(e):y.parseExpression(e)})}return e.prototype.getTplTokens=function(){return o.apply(undefined,arguments)},e.prototype.getEsTokens=function(e){return i(e)},e.prototype.getVariables=function(e){var t=!1;return e.filter(function(e){return"whitespace"!==e.type&&"comment"!==e.type}).filter(function(e){return"name"===e.type&&!t||(t="punctuator"===e.type&&"."===e.value,!1)}).map(function(e){return e.value})},e.prototype.importContext=function(e){var t=this,n="",r=this.internal,i=this.dependencies,o=this.ignore,c=this.context,u=this.options,p=u.imports,l=this.CONTEXT_MAP;y(l,e)||-1!==o.indexOf(e)||(y(r,e)?(n=r[e],y(i,e)&&i[e].forEach(function(e){return t.importContext(e)})):n="$escape"===e||"$each"===e||y(p,e)?a+"."+e:s+"."+e,l[e]=n,c.push({name:e,value:n}))},e.prototype.parseString=function(e){var t=e.value;if(t){var n=f+"+="+b(t);this.scripts.push({source:t,tplToken:e,code:n})}},e.prototype.parseExpression=function(e){var t=this,n=e.value,r=e.script,i=r.output,s=this.options.escape,a=r.code;i&&(a=!1===s||i===o.TYPE_RAW?f+"+="+r.code:f+"+=$escape("+r.code+")");var c=this.getEsTokens(a);this.getVariables(c).forEach(function(e){return t.importContext(e)}),this.scripts.push({source:n,tplToken:e,code:a})},e.prototype.checkExpression=function(e){for(var t=[[/^\s*}[\w\W]*?{?[\s;]*$/,""],[/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,"$1})"],[/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,"$1}"]],n=0;n<t.length;){if(t[n][0].test(e)){var r;e=(r=e).replace.apply(r,t[n]);break}n++}try{return new Function(e),!0}catch(i){return!1}},e.prototype.build=function(){var e=this.options,t=this.context,n=this.scripts,r=this.stacks,i=this.source,c=e.filename,l=e.imports,d=[],x=y(this.CONTEXT_MAP,p),w=0,E=function(e,t){var n=t.line,i=t.start,o={generated:{line:r.length+w+1,column:1},original:{line:n+1,column:i+1}};return w+=e.split(/\n/).length-1,o},k=function(e){return e.replace(/^[\t ]+|[\t ]$/g,"")};r.push("function("+s+"){"),r.push("'use strict'"),r.push(s+"="+s+"||{}"),r.push("var "+t.map(function(e){return e.name+"="+e.value}).join(",")),e.compileDebug?(r.push("try{"),n.forEach(function(e){e.tplToken.type===o.TYPE_EXPRESSION&&r.push(h+"=["+[e.tplToken.line,e.tplToken.start].join(",")+"]"),d.push(E(e.code,e.tplToken)),r.push(k(e.code))}),r.push("}catch(error){"),r.push("throw {"+["name:'RuntimeError'","path:"+b(c),"message:error.message","line:"+h+"[0]+1","column:"+h+"[1]+1","source:"+b(i),"stack:error.stack"].join(",")+"}"),r.push("}")):n.forEach(function(e){d.push(E(e.code,e.tplToken)),r.push(k(e.code))}),x&&(r.push(f+"=''"),r.push(u+"("+v+","+s+","+m+")")),r.push("return "+f),r.push("}");var T=r.join("\n");try{var O=new Function(a,g,"return "+T)(l,e);return O.mappings=d,O.sourcesContent=[i],O}catch(F){for(var $=0,j=0,S=0,_=void 0;$<n.length;){var C=n[$];if(!this.checkExpression(C.code)){j=C.tplToken.line,S=C.tplToken.start,_=C.code;break}$++}throw{name:"CompileError",path:c,message:F.message,line:j+1,column:S+1,source:i,generated:_,stack:F.stack}}},e}();x.CONSTS={DATA:s,IMPORTS:a,PRINT:c,INCLUDE:u,EXTEND:p,BLOCK:l,OPTIONS:g,OUT:f,LINE:h,BLOCKS:m,SLICE:d,FROM:v,ESCAPE:"$escape",EACH:"$each"},e.exports=x},function(e,t,n){"use strict";var r=n(10),i=n(2)["default"],o=n(2).matchToToken,s=function(e){return e.match(i).map(function(e){return i.lastIndex=0,o(i.exec(e))}).map(function(e){return"name"===e.type&&r(e.value)&&(e.type="keyword"),e})};e.exports=s},function(e,t,n){"use strict";var r={"abstract":!0,await:!0,"boolean":!0,"break":!0,"byte":!0,"case":!0,"catch":!0,"char":!0,"class":!0,"const":!0,"continue":!0,"debugger":!0,"default":!0,"delete":!0,"do":!0,"double":!0,"else":!0,"enum":!0,"export":!0,"extends":!0,"false":!0,"final":!0,"finally":!0,"float":!0,"for":!0,"function":!0,"goto":!0,"if":!0,"implements":!0,"import":!0,"in":!0,"instanceof":!0,"int":!0,"interface":!0,"let":!0,"long":!0,"native":!0,"new":!0,"null":!0,"package":!0,"private":!0,"protected":!0,"public":!0,"return":!0,"short":!0,"static":!0,"super":!0,"switch":!0,"synchronized":!0,"this":!0,"throw":!0,"transient":!0,"true":!0,"try":!0,"typeof":!0,"var":!0,"void":!0,"volatile":!0,"while":!0,"with":!0,"yield":!0};e.exports=function(e){return r.hasOwnProperty(e)}},function(e,t,n){"use strict";function r(e,t,n,r){var i=new String(e);return i.line=t,i.start=n,i.end=r,i}var i=function(e,t){for(var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},i=[{type:"string",value:e,line:0,start:0,end:e.length}],o=0;o<t.length;o++)!function(e){for(var t=e.test.ignoreCase?"ig":"g",o=e.test.source+"|^$|[\\w\\W]",s=new RegExp(o,t),a=0;a<i.length;a++)if("string"===i[a].type){for(var c=i[a].line,u=i[a].start,p=i[a].end,l=i[a].value.match(s),f=[],h=0;h<l.length;h++){var m=l[h];e.test.lastIndex=0;var d=e.test.exec(m),v=d?"expression":"string",g=f[f.length-1],y=g||i[a],b=y.value;u=y.line===c?g?g.end:u:b.length-b.lastIndexOf("\n")-1,p=u+m.length;var x={type:v,value:m,line:c,start:u,end:p};if("string"===v)g&&"string"===g.type?(g.value+=m,g.end+=m.length):f.push(x);else{d[0]=new r(d[0],c,u,p);var w=e.use.apply(n,d);x.script=w,f.push(x)}c+=m.split(/\n/).length-1}i.splice.apply(i,[a,1].concat(f)),a+=f.length-1}}(t[o]);return i};i.TYPE_STRING="string",i.TYPE_EXPRESSION="expression",i.TYPE_RAW="raw",i.TYPE_ESCAPE="escape",e.exports=i},function(e,t,n){"use strict";(function(t){function r(e){return"string"!=typeof e&&(e=e===undefined||null===e?"":"function"==typeof e?r(e.call(e)):JSON.stringify(e)),e}function i(e){var t=""+e,n=a.exec(t);if(!n)return e;var r="",i=void 0,o=void 0,s=void 0;for(i=n.index,o=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:s="&#34;";break;case 38:s="&#38;";break;case 39:s="&#39;";break;case 60:s="&#60;";break;case 62:s="&#62;";break;default:continue}o!==i&&(r+=t.substring(o,i)),o=i+1,r+=s}return o!==i?r+t.substring(o,i):r}/*! art-template@runtime | https://github.com/aui/art-template */
    var o=n(0),s=Object.create(o?t:window),a=/["&'<>]/;s.$escape=function(e){return i(r(e))},s.$each=function(e,t){if(Array.isArray(e))for(var n=0,r=e.length;n<r;n++)t(e[n],n);else for(var i in e)t(e[i],i)},e.exports=s}).call(t,n(4))},function(e,t,n){"use strict";var r=Object.prototype.toString,i=function(e){return null===e?"Null":r.call(e).slice(8,-1)},o=function s(e,t){var n=void 0,r=i(e);if("Object"===r?n=Object.create(t||{}):"Array"===r&&(n=[].concat(t||[])),n){for(var o in e)e.hasOwnProperty(o)&&(n[o]=s(e[o],n[o]));return n}return e};e.exports=o},function(e,t,n){"use strict";var r=function(e,t,r,i){var o=n(1);return i=i.$extend({filename:i.resolveFilename(e,i),bail:!0,source:null}),o(i)(t,r)};e.exports=r},function(e,t,n){"use strict";var r=function(e){console.error(e.name,e.message)};e.exports=r},function(e,t,n){"use strict";var r={__data:Object.create(null),set:function(e,t){this.__data[e]=t},get:function(e){return this.__data[e]},reset:function(){this.__data={}}};e.exports=r},function(e,t,n){"use strict";var r=n(0),i=function(e){if(r){return n(5).readFileSync(e,"utf8")}var t=document.getElementById(e);return t.value||t.innerHTML};e.exports=i},function(e,t,n){"use strict";var r={test:/{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,use:function(e,t,n,i){var o=this,s=o.options,a=o.getEsTokens(i),c=a.map(function(e){return e.value}),u={},p=void 0,l=!!t&&"raw",f=n+c.shift(),h=function(t,n){console.warn((s.filename||"anonymous")+":"+(e.line+1)+":"+(e.start+1)+"\nTemplate upgrade: {{"+t+"}} -> {{"+n+"}}")};switch("#"===t&&h("#value","@value"),f){case"set":i="var "+c.join("").trim();break;case"if":i="if("+c.join("").trim()+"){";break;case"else":var m=c.indexOf("if");~m?(c.splice(0,m+1),i="}else if("+c.join("").trim()+"){"):i="}else{";break;case"/if":i="}";break;case"each":p=r._split(a),p.shift(),"as"===p[1]&&(h("each object as value index","each object value index"),p.splice(1,1));i="$each("+(p[0]||"$data")+",function("+(p[1]||"$value")+","+(p[2]||"$index")+"){";break;case"/each":i="})";break;case"block":p=r._split(a),p.shift(),i="block("+p.join(",").trim()+",function(){";break;case"/block":i="})";break;case"echo":f="print",h("echo value","value");case"print":case"include":case"extend":if(0!==c.join("").trim().indexOf("(")){p=r._split(a),p.shift(),i=f+"("+p.join(",")+")";break}default:if(~c.indexOf("|")){var d=a.reduce(function(e,t){var n=t.value,r=t.type;return"|"===n?e.push([]):"whitespace"!==r&&"comment"!==r&&(e.length||e.push([]),":"===n&&1===e[e.length-1].length?h("value | filter: argv","value | filter argv"):e[e.length-1].push(t)),e},[]).map(function(e){return r._split(e)});i=d.reduce(function(e,t){var n=t.shift();return t.unshift(e),"$imports."+n+"("+t.join(",")+")"},d.shift().join(" ").trim())}l=l||"escape"}return u.code=i,u.output=l,u},_split:function(e){e=e.filter(function(e){var t=e.type;return"whitespace"!==t&&"comment"!==t});for(var t=0,n=e.shift(),r=/\]|\)/,i=[[n]];t<e.length;){var o=e[t];"punctuator"===o.type||"punctuator"===n.type&&!r.test(n.value)?i[i.length-1].push(o):i.push([o]),n=o,t++}return i.map(function(e){return e.map(function(e){return e.value}).join("")})}};e.exports=r},function(e,t,n){"use strict";var r={test:/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,use:function(e,t,n,r){return n={"-":"raw","=":"escape","":!1,"==":"raw","=#":"raw"}[n],t&&(r="/*"+r+"*/",n=!1),{code:r,output:n}}};e.exports=r},function(e,t,n){"use strict";var r=n(0),i=function(e,t){if(r){var i,o=n(21).minify,s=t.htmlMinifierOptions,a=t.rules.map(function(e){return e.test});(i=s.ignoreCustomFragments).push.apply(i,a),e=o(e,s)}return e};e.exports=i},function(e,t){!function(e){e.noop=function(){}}("object"==typeof e&&"object"==typeof e.exports?e.exports:window)},function(e,t,n){"use strict";var r=n(0),i=/^\.+\//,o=function(e,t){if(r){var o=n(5),s=t.root,a=t.extname;if(i.test(e)){var c=t.filename,u=!c||e===c,p=u?s:o.dirname(c);e=o.resolve(p,e)}else e=o.resolve(s,e);o.extname(e)||(e+=a)}return e};e.exports=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.name,n=e.source,r=e.path,i=e.line,o=e.column,s=e.generated,a=e.message;if(!n)return a;var c=n.split(/\n/),u=Math.max(i-3,0),p=Math.min(c.length,i+3),l=c.slice(u,p).map(function(e,t){var n=t+u+1;return(n===i?" >> ":"    ")+n+"| "+e}).join("\n");return(r||"anonymous")+":"+i+":"+o+"\n"+l+"\n\n"+t+": "+a+(s?"\n   generated: "+s:"")}var a=function(e){function t(n){r(this,t);var o=i(this,e.call(this,n.message));return o.name="TemplateError",o.message=s(n),Error.captureStackTrace&&Error.captureStackTrace(o,o.constructor),o}return o(t,e),t}(Error);e.exports=a},function(e,t,n){"use strict";e.exports=n(3)}])});
(function ($) {
    $.fn.page = function (options) {
        var defaults = {
            pages: 0,
            page: 1,
            group: 5,
            first: false,
            last: false,
            prev: false,
            next: false,
            jump: false,
            show_total: false,

            callback: function (page) {
                if (location.search.indexOf('page=') > -1) {
                    location.search = location.search.replace(/page=(\d+)/, "page=" + page);
                } else if (location.search.length > 1) {
                    location.search = location.search + '&page=' + page;
                } else {
                    location.search = '?page=' + page;
                }
            }
        };

        var tpl = '{{if pages}} <ul class="pagination pagination-{{groupid}}"> {{if first}}<li class="{{if from<2}}disabled{{/if}}"><a href="javascript:void(0)" data-num="1"><i class="fa fa-angle-double-left"></i></a></li>{{/if}} {{if prev}}<li class="{{if page<2}}disabled{{/if}}"><a href="javascript:void(0)" data-num="{{page-1}}"><i class="fa fa-angle-left"></i></a></li>{{/if}} {{each arr}}<li class="{{if page==$value}}active{{/if}}"><a href="javascript:void(0)" data-num="{{$value}}">{{$value}}</a></li>{{/each}} {{if next}}<li class="{{if page>=pages}}disabled{{/if}}"><a href="javascript:void(0)" data-num="{{page+1}}"><i class="fa fa-angle-right"></i></a></li>{{/if}} {{if last}}<li class="{{if to>=pages}}disabled{{/if}}"><a href="javascript:void(0)" data-num="{{pages}}"><i class="fa fa-angle-double-right"></i></a></li>{{/if}} {{if jump}} <li> <div class="pull-left text-muted page-jumper"> 到第 <input id="page-no-{{groupid}}" value="{{page}}" size="6"> 页{{if show_total}}, 共 {{pages}} 页{{/if}} <button class="btn btn-info page-btn-group-{{groupid}}" type="button">确定</button></div> </li> {{else if show_total}} <li> <div class="pull-left text-muted page-jumper"> 共 {{pages}} 页</div> </li> {{/if}} </ul> {{/if}}';

        options = $.extend(defaults, options);

        $.each(['pages', 'page', 'group'], function (i, t) {
            options[t] = parseInt(options[t]);
        });
        function range(page, group) {
            var from = Math.max(page - parseInt(group / 2), 1);
            var to = Math.min(from + group, options.pages + 1);
            from = Math.max(to - group, 1);
            return [from, to];
        }

        function render(container) {
            var r = range(options.page, options.group), from = r[0], to = r[1];

            options.arr = [];
            for (var i = from; i < to; i ++) {
                options.arr.push(i);
            }

            container.html(template.render(tpl, options));
        }

        function callback(index, num) {
            num = parseInt(num);
            num = Math.max(Math.min(num, options.pages), 1);
            options.page = parseInt(num);
            render($('.pagination-' + index).parent());
            'function' == typeof options.callback && options.callback(num);
        }

        this.each(function (index) {
            var container = $(this);
            options.groupid = index;

            render(container);

            container.on('click', 'a', function () {
                if ($(this).closest('li').hasClass('disabled')) return ;

                callback(index, $(this).data('num'));
            });
            container.on('click', 'button', function () {
                callback(index, $('#page-no-' + index).val());
            });
            $('#page-no-' + index).keypress(function (e) {
                if (e.which == 13) {
                    callback(index, $(this).val());
                }
            });
        })
    }
})(jQuery);
_init_dialog = function () {

    var toast_defaults = {
        text: '',
        title: "",
        type: "info",
        position: "top-right",
        duration: 4000,
        onclose: function () {}
    }

    function dialog_toast(options, title, type) {
        var opts;
        if (typeof options == "string") {
            opts = $.extend({}, toast_defaults, {
                text: options,
                title: title || "",
                type: type || "info"
            });
        } else {
            opts = $.extend({}, toast_defaults, options);
        }

        if (opts.type == 'danger') opts.type = 'error';

        $.toast({
            text: opts.text,
            heading: opts.title,
            hideAfter: opts.duration,
            loader: false,
            stack: 6,
            position: opts.position,
            icon: opts.type,
            afterHidden: opts.onclose
        });
    }

    var alert_defaults = {
        text: '',
        title: "",
        type: null,
        html: true,
        allowEscapeKey: false,
        confirmButtonText: "确定",
        onclose: function (isConfirm) {}
    }

    function dialog_alert(options, title, type) {
        var opts;
        if (typeof options == "string") {
            opts = $.extend({}, alert_defaults, {
                text: options,
                title: title || "",
                type: type || null
            });
        } else {
            opts = $.extend({}, alert_defaults, options);
        }

        if (opts.type == 'danger') opts.type = 'error';

        swal(opts, opts.onclose);
    }

    var confirm_defaults = $.extend({}, alert_defaults, {
        cancelButtonText: "取消",
        showCancelButton: true,
    });
    function dialog_confirm(options, title, type, callback) {
        var opts;
        if (typeof options == "string") {
            opts = $.extend({}, confirm_defaults, {
                text: options,
                title: title || "",
                type: type || null,
                onclose: callback
            });
        } else {
            opts = $.extend({}, confirm_defaults, options);
        }

        if (opts.type == 'danger') opts.type = 'error';

        swal(opts, opts.onclose);
    }

    function dialog_loading(timeout, callback) {
        $('#page-loading').show();
        reset_timer(dialog_loading, timeout, callback);
    }
    
    function reset_timer(who, timeout, callback) {
        if (who.timer) {
            clearTimeout(who.timer);
            who.timer = null;
        }
        if (typeof timeout == 'number' && timeout > 0) {
            who.timer = setTimeout(function () {
                $('#page-loading').hide();
                typeof callback == 'function' && callback();
            }, timeout);
        }
    }

    var html_defaults = {
        esc: false,
        small: false,
        musk: true,
        animate: true,
        title: false,
        cancelButton: false,
        confirmButton: "确定",
        closeable: true,
        onclose: function (isConfirm) {}
    };

    dialog_html.id = "__my_dialog_html_id";
    dialog_html.exists = false;
    dialog_html.triggerred = false;
    var html_tpl = '<div class="modal" id="' + dialog_html.id + '" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title" id="myModalLabel"></h4>' +
        '</div>' +
        '<div class="modal-body"></div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default action-cancel"></button>' +
        '<button type="button" class="btn btn-primary action-confirm"></button>' +
        '</div></div></div></div>';

    function dialog_html($obj, param1, param2) {
        if (!dialog_html.exists) {
            $('#' + dialog_html.id).remove();
        }
        $(document.body).append(html_tpl);

        var opts = {};
        if ($.isPlainObject(param1)) {
            opts = param1;
        }
        if ($.isPlainObject(param2)) {
            opts = param2;
        }
        if (typeof param1 == 'function') {
            opts.onclose = param1;
        }
        if (typeof param1 == 'string') {
            opts.title = param1;
        }
        if (typeof param2 == 'function') {
            opts.onclose = param2;
        }
        if (typeof param2 == 'string') {
            opts.title = param2;
        }
        var options = $.extend({}, html_defaults, opts);

        var obj = $('#' + dialog_html.id);
        obj.find('.modal-body').children().remove();
        set_class(obj.find('.modal'), 'fade', options.animate);
        set_class(obj.find('.modal-dialog'), 'modal-sm', options.small);
        set_class(obj.find('.modal-header'), 'hidden', !options.title && !options.closeable);
        set_class(obj.find('.modal-header button'), 'hidden', !options.closeable);
        if (options.title) obj.find('.modal-header h4').html(options.title);
        set_class(obj.find('.modal-footer'), 'hidden', !options.cancelButton && !options.confirmButton);
        set_class(obj.find('.modal-footer .action-cancel'), 'hidden', !options.cancelButton);
        set_class(obj.find('.modal-footer .action-confirm'), 'hidden', !options.confirmButton);
        if (options.cancelButton) obj.find('.modal-footer .action-cancel').html(typeof options.cancelButton=="string" ? options.cancelButton : "取消");
        if (options.confirmButton) obj.find('.modal-footer .action-confirm').html(typeof options.confirmButton=="string" ? options.confirmButton : "确定");

        // add body
        obj.find('.modal-body').append(typeof $obj == 'string' ? $obj : $obj instanceof jQuery ? $obj.clone(true) : "");

        obj.off('hide.bs.modal');
        obj.find('.modal-footer button').off('click');
        obj.on('hide.bs.modal', function (e) {
            if (dialog_html.triggerred) {
                dialog_html.triggerred = false;
                return;
            }
            if (typeof options.onclose == 'function') {
                options.onclose(false);
            }
        });

        obj.find('.modal-footer button').on('click', function (e) {
            if (typeof options.onclose == 'function') {
                var result = options.onclose($(this).hasClass('action-confirm'));
                $this = $(this);
                if (!$this.hasClass('action-confirm') || (typeof result == 'undefined' || result)) {
                    dialog_html.triggerred = true;
                    obj.modal('hide');
                }
            } else {
                obj.modal('hide');
            }
        });

        obj.modal({
            backdrop: options.musk,
            keyboard: options.esc,
            show: true
        });
    }

    function set_class(obj, cls, condition) {
        if (condition) obj.addClass(cls);
        else obj.removeClass(cls);
    }
    
    function dialog_close() {
        $('#page-loading').hide();
        $('#' + dialog_html.id).modal('hide');
        swal.close();
    }

    dialog = {
        toast: dialog_toast,
        alert: dialog_alert,
        confirm: dialog_confirm,
        // prompt: dialog_prompt,
        loading: dialog_loading,
        html: dialog_html,
        close: dialog_close
    };
};

if (typeof dialog !== 'undefined') {
    alert('dialog exists!');
} else {
    _init_dialog();
}