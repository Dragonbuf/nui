
<!-- Top Navigation -->
<nav class="navbar navbar-default navbar-static-top m-b-0">
    <div class="navbar-header">
        <!-- Toggle icon for mobile view -->
        <div class="top-left-part">
            <!-- Logo -->
            <a class="logo"  href="/">
                <!-- Logo icon image, you can use font-icon also -->
                <b>
                    <!--This is dark logo icon><img src="/nuiRes/plugins/images/admin-logo.png" alt="home" class="dark-logo" /-->
                    <!--This is light logo icon><img src="/nuiRes/plugins/images/admin-logo-dark.png" alt="home" class="light-logo" /-->
                </b>
                <!-- Logo text image you can use text also -->
                <span class="hidden-xs">
                         %{$nuiDefaultName}
                    <!--This is dark logo text><img src="/nuiRes/plugins/images/admin-text.png" alt="home" class="dark-logo" /-->
                    <!--This is light logo text><img src="/nuiRes/plugins/images/admin-text-dark.png" alt="home" class="light-logo" /-->
                    </span>
            </a>
        </div>
        <!-- /Logo -->
        <!-- Search input and Toggle icon -->
        <ul class="nav navbar-top-links navbar-left">
            <li><a href="javascript:void(0)" class="open-close waves-effect waves-light"><i class="ti-menu"></i></a></li>
        </ul>



        <ul class="nav navbar-top-links navbar-right pull-right">
            <!-- /.Task dropdown -->
            <li class="dropdown">

        </ul>



        <!-- This is the message dropdown -->
        <ul class="nav navbar-top-links navbar-right pull-right">
            <!-- /.Task dropdown -->
            <li class="dropdown">
                <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"> <img src="%{$admin.avatar}" onerror="this.src='/nuiImage/default_avatar.png'" alt="user-img" width="36" class="img-circle"><b class="hidden-xs">%{$admin.name}</b><span class="caret"></span> </a>
                <ul class="dropdown-menu dropdown-user">
                    <li>
                        <div class="dw-user-box">
                            <div class="u-img"><img src="%{$admin.avatar}" alt="user" onerror="this.src='/nuiImage/default_avatar.png'" /></div>
                            <div class="u-text"><h4>%{$admin.name}</h4><p class="text-muted">%{$admin.email}</p><a href="/system/admin/info?id=%{$admin.id}" class="btn btn-rounded btn-danger btn-sm">个人资料</a></div>
                        </div>
                    </li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#"><i class="ti-settings"></i> 账号设置</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="/login/logout"><i class="fa fa-power-off"></i> 退出登录</a></li>
                </ul>
                <!-- /.dropdown-user -->
            </li>

            <!-- /.dropdown -->
        </ul>


    </div>
    <!-- /.navbar-header -->
    <!-- /.navbar-top-links -->
    <!-- /.navbar-static-side -->
</nav>