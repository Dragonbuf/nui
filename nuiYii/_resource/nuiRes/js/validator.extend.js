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