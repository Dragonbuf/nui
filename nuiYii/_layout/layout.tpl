<!DOCTYPE html>
<!--
   This is a starter template page. Use this page to start your project from
   scratch. This page gets rid of all links and provides the needed markup only.
   -->
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="%{$csrf_token}">
    <title>%{block name="html-title"}产品 - %{/block}管理中心 - %{$nuiDefaultName}</title>
    %{include file="file:[nui]_layout/header-res.tpl"}
</head>

<body class="fix-sidebar fix-header">
<!-- Preloader -->
<div class="preloader">
    <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
</div>
<div class="loading" id="page-loading">
    <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
</div>
<div id="wrapper">
    %{include file="file:[nui]_layout/html-header.tpl"}
    %{include file="file:[nui]_layout/menu.tpl"}

    <!-- Page Content -->
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row bg-title">
                <!-- .page title -->
                <div class="col-lg-12">
                    <h4 class="page-title pull-left">%{block name="page-title"}产品%{/block}</h4>
                    <!-- /.page title -->
                    <!-- .breadcrumb -->
                    <div class="pull-right">
                        %{block name="page-action"}
                            <a href="javascript: void(0);" target="_blank" class="btn btn-danger pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light">新增</a>
                        %{/block}
                    </div>
                    <!-- /.breadcrumb -->
                </div>
                <!-- /.page title -->
            </div>
            %{if $success}
            <div class="alert alert-success alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
               <strong>成功！</strong>  %{$success}
            </div>
            %{/if}
            %{if $error}
            <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
               <strong>失败</strong> %{$error}
            </div>
            %{/if}

            <!-- .row -->
            <div class="row">
                <div class="col-md-12">
                    %{block name="main"}
                    <div class="white-box">
                        <h3 class="box-title">测试页面 </h3>
                    </div>

                    %{/block}
                </div>
            </div>
            <!-- .row -->
        </div>
        <!-- /.container-fluid -->
        <footer class="footer text-center"> %{$smarty.now|date_format:'%Y'} &copy; %{$nuiDefaultName} </footer>
    </div>
    <!-- /#page-wrapper -->
</div>
%{include file="file:[nui]_layout/footer-res.tpl"}
</body>

</html>