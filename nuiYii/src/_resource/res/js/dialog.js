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