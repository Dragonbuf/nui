<!-- Left navbar-header -->
<div class="navbar-default sidebar" role="navigation">

    <div class="sidebar-nav slimscrollsidebar">
        <div class="sidebar-head">
            <h3><span class="fa-fw open-close"><i class="ti-close ti-menu"></i></span> <span class="hide-menu">菜单</span></h3> </div>
        <div class="user-profile">
            <div class="dropdown user-pro-body">
                <div class="m-b-20 m-t-20"><img src="%{$admin.avatar}" alt="user-img" onerror="this.src='/nuiImage/default_avatar.png'" class="img-circle img-thumbnail"></div>
                <span class="text-muted">%{$admin.name}</span>
            </div>
        </div>
        <ul class="nav" id="side-menu">
            %{if is_array($sidebar) && !empty($sidebar)}
            %{foreach $sidebar as $value}
            <li>
                <a href="%{$value.path}" class="waves-effect">
                    <i class="%{$value.icon}" style="width: 16px; display: inline-block;"></i>
                    <span class="hide-menu p-l-10">
                        %{$value.name}
                        %{if is_array($value) && $value.child}<i class="fa arrow"></i>%{/if}
                    </span>
                </a>
                %{if is_array($value) && $value.child}
                <ul class="nav nav-second-level">
                    %{foreach $value.child as $val}
                    <li>
                        <a href="%{$val['path']}" class="waves-effect">
                            <i class="%{$val.icon|default:"fa fa-circle-thin"}"></i>
                            <span class="p-l-10">%{$val.name}</span>
                        </a>
                    </li>
                    %{/foreach}

                </ul>
                %{/if}
            </li>
            %{/foreach}
            %{/if}
        </ul>
    </div>
</div>
<script>
    var ____menu_path = location.href;
    function setMenu(path) {
        ____menu_path = path;
    }
    $(function () {
        $('#side-menu a').each(function (index, item) {
            ____menu_path = ____menu_path.replace(/#.*$/, '');
            if (____menu_path.indexOf($(item).attr('href')) > -1) {
                $(item).parents('.nav li').addClass('active');
                $('.active > a').addClass('active');
                return false;
            }
        });
    });
</script>
<!-- Left navbar-header end -->