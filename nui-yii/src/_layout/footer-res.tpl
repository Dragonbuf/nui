<!-- Bootstrap Core JavaScript -->
<script src="/res/bootstrap/dist/js/bootstrap%{$min}.js"></script>
<!-- Sidebar menu plugin JavaScript -->
<script src="/res/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js"></script>
<!--Slimscroll JavaScript For custom scroll-->
<script src="/res/js/jquery.slimscroll.js"></script>
<!--Wave Effects -->
<script src="/res/js/waves.js"></script>
<!-- Custom Theme JavaScript -->
<!-- Do not delete start-->
-------js-files--------
<!-- Do not delete end -->
<script src="/res/plugins/bower_components/toast-master/js/jquery.toast.js"></script>
<script src="/res/plugins/bower_components/sweetalert/sweetalert.min.js"></script>

%{if $min}
<script src="/res/js/custom.min.js"></script>
%{else}
<script src="/res/js/custom.js"></script>
<script src="/res/js/validator.js"></script>
<script src="/res/js/validator.extend.js"></script>
<script src="/res/js/template-web.js"></script>
<script src="/res/js/jquery.page.js"></script>
<script src="/res/js/dialog.js"></script>
%{/if}
%{endbody}