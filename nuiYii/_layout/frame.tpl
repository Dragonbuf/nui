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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="%{$csrf_token}">
    <title>管理中心 - %{$nuiDefaultName}</title>
    %{include file="file:[nui]_layout/header-res.tpl"}
</head>

<body class="fix-sidebar fix-header">

    <!-- Page Content -->
    <div class="wrapper">
        <div class="container-fluid">
            <!-- .row -->
            <div class="row">
                <div class="col-md-12">
                    %{block name="frame-main"}
                    <div class="white-box">
                        <h3 class="box-title"></h3>
                    </div>
                    %{/block}
                </div>
            </div>
            <!-- .row -->
        </div>
        <!-- /.container-fluid -->
    </div>
    <!-- /#page-wrapper -->

</body>

</html>