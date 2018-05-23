/**
 * Created by lw on 2017/1/5.
 */
var page=1,flag=false,progress,totalPage,stop=true;
var type = document.getElementById('type').value;
var title = document.getElementById('title').value;
var menuType = 0;
if (type == 'cctomelist') {
    menuType = 3;
} else if (type == 'mylaunchlist') {
    menuType = 1;
} else if (type =='myapprovedlist') {
    menuType = 4;//我已审批的
}else {
    menuType = 2;
}
$(function(){
    FastClick.attach(document.body);
    var cid = module.getParameter('cid');
    module.init(cid);
    $('.loading').html('正在加载...').show();
    
});

var module = {
    //页面初始化
    init : function(cid){
        module.ajaxrequestReady(cid);//进入页面加载列表页
        module.moremessage(cid);//下拉加载更多信息
    },
    getParameter: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return -1;
    },
    //滑动到底部刷新加载更过信息
    moremessage:function(cid){
        $('.loading').on('click',function(){
            module.ajaxrequest(cid);//加载更多信息
            return false;
        })
    },

    //ajax请求
    ajaxrequest : function(cid){
        if(stop===true&&totalPage>=page){
            stop=false;
            $('.loading').html('正在加载...').show();
            $.ajax({
                type:'GET',
                asyn:false,
                url:'/mapprove/op/'+type,
                data:{'pageIndex':page, 'title':title},
                dataType: 'json',
                success: function(data){
                     //console.log(data);
                    var arr = data.items;
                    module.otherSplit(arr,0);
                        page++;
                        $('.loading').html('查看更多').show();
                },
                error: function(xhr, type){
                    //错误时提示
                },
                complete:function(){
                    setTimeout(function () {
                        if(flag){
                            $('.recomprogress').css({'transform':'rotate('+progress+'deg)', '-webkit-transform': 'rotate('+progress+'deg)', '-moz-transform':'rotate('+progress+'deg);'});
                            flag = false;
                        }
                    },500);
                    stop=true;
                }
            })
        } else {
            $('.loading').html('加载完成').show();
        }

    },
    ajaxrequestReady : function(cid){
            $.ajax({
                type:'GET',
                asyn:false,
                url:'/mapprove/op/'+type,
                data:{'pageIndex':page, 'title':title},
                dataType: 'json',
                success: function(data){
                    if(data.error == 0){
                        totalPage = Math.ceil(data.total/10);
                        var arr = data.items;
                        module.otherSplit(arr,0);
                            prepage=page;
                            page++;
                            $('.loading').html('查看更多').show();
                        if(arr.length<10){
                            $('.loading').html('加载完成').show();
                        }
                        if(totalPage ==0){
                            $('.loading').html('暂无数据').css({"padding":"4rem 0"}).show();
                        }
                        $('.log').html(data.sql);
                    } else if(data.error == 1){
                        $('.loading').html('页面错误').show();
                    }
                },
                error: function(xhr, type){
                    //错误时提示
                },
                complete:function(){
                    setTimeout(function () {
                        if(flag){
                            $('.recomprogress').css({'transform':'rotate('+progress+'deg)', '-webkit-transform': 'rotate('+progress+'deg)', '-moz-transform':'rotate('+progress+'deg);'});
                            flag = false;
                        }
                    },500);
                }
            })
        },
    
    //其他页字符串拼接
    otherSplit : function(arr,startnum){
        var html = '';
        //对应的标的字符串拼接
        $(arr).each(function(k, val) {
            tourl = '/mapprove/do?id='+val.id;
            html += '<div class="approveModules" onclick="location.href=\''+tourl+'\'">';
                html += '<ul class="clearfix">';
                html += '    <li class="f15 lf"><span>发起人</span>:'+val.launchper+'</li>';
                 html += '   <li class="f14 rg"><img src="http://ding1.njfae.cn/images/timer.png" alt=""> '+val.createTime+'</li>';
                html += '</ul>';
                html += '<p class="f17 clearfix">'+val.title+'</p>';
                if (val.result == 'had_approval') {
                    html += '<div class="f14 agree">';
                } else {
                    html += '<div class="f14 reject">';
                }
                html += val.sName;
                 if(val.result){
                html += '                        ('+val.resultName+')';
                 };
                 html += '   <span class="mark" id="m'+val.id+'" style="display:none"></span>';
                html += '</div>';
            html += '</div>';
        })
        $('#data').append(html);
        //console.log(menuType)
        $.get("/mapprove/op/msg-read-status", function (result) {
            var tmp;
            if (menuType == 3) {
                tmp = Object.keys(result.cctome);
            } else if (menuType == 1) {
                tmp = Object.keys(result.mylaunch);
            } else {
                tmp = new Array();
            }
            $(tmp).each(function(k,v){
                $("#m"+v).show();
            })
        });
    },
};