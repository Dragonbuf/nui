/**
 * Created by liqiao on 8/10/15.
 */

logger.i('Here we go...');

logger.i(location.href);

/**
 * _config comes from server-side template. see views/index.jade
 */
DingTalkPC.config({
    agentId: _config.agentId,
    corpId: _config.corpId,
    timeStamp: _config.timeStamp,
    nonceStr: _config.nonceStr,
    signature: _config.signature,
    jsApiList: [
        'runtime.permission.requestAuthCode',
        'device.notification.alert',
        'device.notification.confirm',
        'biz.contact.choose',
        'device.notification.prompt',
        'biz.ding.post'
        ] // 必填，需要使用的jsapi列表
});
DingTalkPC.userid=0;
DingTalkPC.ready(function(res){
    logger.i('dd.ready!');

    DingTalkPC.runtime.permission.requestAuthCode({
        corpId: _config.corpId, //企业ID
        onSuccess: function(info) {
            logger.i('authcode: ' + info.code);
            var auth_code = info.code;
	    $.ajax({
                url: '/ding-login',
                type:"POST",
                data: {"event":"get_userinfo","code":info.code,"corpId":_config.corpId, 'bin_type':bin_type},
                dataType:'json',
                timeout: 1000,
                success: function (data, status, xhr) {
                    var info = JSON.parse(data);
                    if (info.errcode === 0) {
                        logger.i('user id: ' + info.userid);
                        DingTalkPC.userid = info.userid;
                        window.location.href = tourl;
                    }
                    else {
                        logger.e('auth error: ' + data);
                    }
                },
                error: function (xhr, errorType, error) {
                    logger.e(errorType + ', ' + error);
                }
            });
        },
        onFail : function(err) {
	logger.e(JSON.stringify(err));
	}

    });
});

DingTalkPC.error(function(err) {
    logger.e('dd error: ' + JSON.stringify(err));
});
