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

        var tpl = '<html> <head></head> <body> {{if pages>1}} <ul class="pagination pagination-{{groupid}}"> {{if first}} <li class="{{if page==1}}disabled{{/if}}"><a href="javascript:void(0)" data-num="1"><i class="fa fa-angle-double-left"></i></a></li>{{/if}} {{if prev}} <li class="{{if page<2}}disabled{{/if}}"><a href="javascript:void(0)" data-num="{{page-1}}"><i class="fa fa-angle-left"></i></a></li>{{/if}} {{each arr}} <li class="{{if page==$value}}active{{/if}}"><a href="javascript:void(0)" data-num="{{$value}}">{{$value}}</a></li>{{/each}} {{if next}} <li class="{{if page>=pages}}disabled{{/if}}"><a href="javascript:void(0)" data-num="{{page+1}}"><i class="fa fa-angle-right"></i></a></li>{{/if}} {{if last}} <li class="{{if page>=pages}}disabled{{/if}}"><a href="javascript:void(0)" data-num="{{pages}}"><i class="fa fa-angle-double-right"></i></a></li>{{/if}} {{if jump}} <li> <div class="pull-left text-muted page-jumper hidden-sm"> 到第 <input id="page-no-{{groupid}}" value="{{page}}" size="6" /> 页{{if show_total}}, 共 {{pages}} 页{{/if}} <button class="btn btn-info page-btn-group-{{groupid}}" type="button">确定</button> </div> </li> {{else if show_total}} <li> <div class="pull-left text-muted page-jumper hidden-sm"> 共 {{pages}} 页 </div> </li> {{/if}} </ul> {{/if}} </body> </html>';

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