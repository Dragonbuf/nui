_init_tree = function () {

    var containerdiv;
    function init(data, container) {
        containerdiv = container;
        $(container).treeview({
            data: data,
            showIcon: false,
            showCheckbox: true,
            selectedBackColor:'#fff',//选中背景颜色
            selectedColor:'#000',//选中之后文字颜色
            onNodeChecked: nodeChecked,
            onNodeUnchecked: nodeUnchecked,
            onNodeSelected:nodeSelect,
            onNodeUnselected:nodeUnSelect
        });
    }

    function nodeSelect(event, node){
        $(containerdiv).treeview('toggleNodeChecked', [ node.nodeId, { silent: true } ]);
    }

    function nodeUnSelect(event, node) {
        $(containerdiv).treeview('toggleNodeChecked', [ node.nodeId, { silent: true } ]);
    }
    var nodeCheckedSilent = false;
    function nodeChecked (event, node){
        if(nodeCheckedSilent){
            return;
        }
        nodeCheckedSilent = true;
        checkAllParent(node);
        checkAllSon(node);
        nodeCheckedSilent = false;
    }

    var nodeUncheckedSilent = false;
    function nodeUnchecked  (event, node){
        if(nodeUncheckedSilent)
            return;
        nodeUncheckedSilent = true;
        uncheckAllParent(node);
        uncheckAllSon(node);
        nodeUncheckedSilent = false;
    }

    //选中全部父节点
    function checkAllParent(node){
        var parentNode = $(containerdiv).treeview('getParent',node.nodeId);
        if(!("nodeId" in parentNode)){
            return;
        }else{
            $(containerdiv).treeview('checkNode', [parentNode.nodeId, {silent:true}]);
            checkAllParent(parentNode);
        }
    }
    //取消全部父节点
    function uncheckAllParent(node){
        var siblings = $(containerdiv).treeview('getSiblings', node.nodeId);
        var parentNode = $(containerdiv).treeview('getParent',node.nodeId);
        if(!("nodeId" in parentNode)) {
            return;
        }
        var isAllUnchecked = true;  //是否全部没选中
        for(var i in siblings){
            if(siblings[i].state.checked){
                isAllUnchecked=false;
                break;
            }
        }
        if(isAllUnchecked){
            $(containerdiv).treeview('uncheckNode', [parentNode.nodeId, {silent:true}]);
            uncheckAllParent(parentNode);
        }

    }

    //级联选中所有子节点
    function checkAllSon(node){
        if(node.nodes!=null&&node.nodes.length>0){
            for(var i in node.nodes){
                $(containerdiv).treeview('checkNode', [node.nodes[i].nodeId, {silent:true}]);
                checkAllSon(node.nodes[i]);
            }
        }
    }
    //级联取消所有子节点
    function uncheckAllSon(node){
        if(node.nodes!=null&&node.nodes.length>0){
            for(var i in node.nodes){
                $(containerdiv).treeview('uncheckNode', [node.nodes[i].nodeId, {silent:true}]);
                uncheckAllSon(node.nodes[i]);
            }
        }
    }

    function getChecked(container) {
        var $tree = $(container);
        arr = $tree.treeview('getChecked',0);
        var selectVal = new Array();
        $.each(arr, function (k,v) {
            selectVal[k] = v.id;
        })

        //去空值
        for(var i = 0 ;i<selectVal.length;i++)
        {
            if(selectVal[i] == "" || typeof(selectVal[i]) == "undefined")
            {
                selectVal.splice(i,1);
                i= i-1;
            }
        }
        return selectVal;
    }

    function itemOnclick(target){
        //找到当前节点id
        var nodeid = $(target).attr('data-nodeid');
        var tree = $(containerdiv);
        //获取当前节点对象
        var node = tree.treeview('getNode', nodeid);

        if(node.state.expanded){
            //处于展开状态则折叠
            tree.treeview('collapseNode', node.nodeId);
        } else {
            //展开
            tree.treeview('expandNode', node.nodeId);
        }
    }
    

    tree = {
        init: init,
        get:getChecked
    };
};

if (typeof tree !== 'undefined') {
    alert('tree exists!');
} else {
    _init_tree();
}
