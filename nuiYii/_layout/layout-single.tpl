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

<body>
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

    %{block name="main"}
    <div class="white-box">
        <p>这是主要内容</p>
    </div>

    %{/block}
</div>
%{include file="file:[nui] _layout/footer-res.tpl"}
</body>

</html>