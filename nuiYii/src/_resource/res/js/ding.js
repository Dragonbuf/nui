/**
 * Created by liqiao on 8/10/15.
 */

//logger.i('Here we go...');

logger.i(location.href);
//logger.i(_config);
/**
 * _config comes from server-side template. see views/index.jade
 */
dd.config({
    agentId: _config.agentId,
    corpId: _config.corpId,
    timeStamp: _config.timeStamp,
    nonceStr: _config.nonceStr,
    signature: _config.signature,
    jsApiList: [
        'runtime.info',
        'device.notification.prompt',
        'biz.chat.pickConversation',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.chat.open',
        'biz.util.open',
        'biz.user.get',
        'biz.contact.choose',
        'biz.telephone.call',
        'biz.util.uploadImage',
        'biz.chat.toConversation',
        'biz.util.share',
        'biz.ding.post']
});
dd.userid=0;

dd.ready(function() {
    logger.i('dd.ready !');

    dd.runtime.info({
        onSuccess: function(info) {
            logger.i('runtime info: ' + JSON.stringify(info));
        },
        onFail: function(err) {
            logger.e('fail: ' + JSON.stringify(err));
        }
    });

    dd.runtime.permission.requestAuthCode({
        corpId: _config.corpId, //企业id
        onSuccess: function (info) {
            logger.i('authcode: ' + info.code);
            var auth_code = info.code;
            $.ajax({
                url: '/ding-login',
                type:"POST",
                data: {"event":"get_userinfo","code":info.code,"corpId":_config.corpId, 'appId': _config.appId, 'bin_type':bin_type},
                dataType:'json',
                timeout: 900,
                success: function (data, status, xhr) {
                    var info = JSON.parse(data);
                    if (info.errcode === 0) {
                        logger.i('user id: ' + info.userid);
                        dd.userid = info.userid;
                        logger.e('location to : ' + info.to);
                        if (tourl) {
                            location.href = tourl;
                        }
                    }
                    else {
                        logger.e('auth error: ' + data);
                    }
                },
                error: function (xhr, errorType, error) {
                    logger.e(xhr.responseText);
                    logger.e(errorType + ', ' + error);
                }
            });

        },
        onFail: function (err) {
            logger.e('requestAuthCode fail: ' + JSON.stringify(err));
        }
    });


    $('.dd-approval-chat').on('click', function() {
        var apply_id = $('#apply_id').val()
        $.get("/apply/apply/chat?id="+apply_id, function (result) {
            /**
             * 跳转到对话界面
             */
            dd.biz.chat.toConversation({
                corpId: _config.corpId, //企业id
                chatId:result,//会话Id
                onSuccess : function(res) {

                },
                onFail : function(err) {
                }
            });
        });
    })


})

dd.error(function(err) {
    logger.e('dd error: ' + JSON.stringify(err));
});
