// var groups = {
//     type: 'group',
//     id: 'group1',
//     title: '企业',
//     pages: []
// };
CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    config.language = 'zh-cn';
    config.height = 600;
    config.width = 850;
    config.toolbarLocation = 'top';
    config.title = 'Contract Template',
    // config.uiColor = '#FFFFFF',
    // config.toolbar='Full';
     config.allowedContent = true,
    //config.extraAllowedContent = 'div(signers)[contenteditable]; span(signer-cover)[contenteditable]; img[*](*){*}',

    config.toolbar = [
        ['Font','Format','FontSize'],
        ['addpic','Bold','Italic','Underline'],
        ['TextColor','BGColor'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['Image','Table', 'Signer', 'TemplateTag'],
        ['Preview', 'Maximize']
    ];
    config.extraPlugins = 'signer,templatetag';
    //config.extraPlugins = 'HelloWorld';
    config.image_previewText = ' ';
    config.filebrowserImageUploadUrl = '/template/template/upload';
    //config.signers = signers;
   // config.groups = groups;

    config.templateTags = [
        {
            id: 'project',
            title: '项目',
            tags: [
                '%{$project.name|comment:"项目名称"}',
                '%{$project.type|comment:"产品类别"}',
                '%{$project.target|d10000|comment:"项目规模"}',
                '%{$project.apr|d|comment:"利率"}',
                '%{$project.duration|comment:"期限"}',
                '%{$project.min_invest|comment:"起投金额"}',
                '%{$project.yearly_days|comment:"全年天数"}',
                '%{$project.platform|comment:"发行平台"}',
                '%{$project.is_due_day_included|boolname|comment:"到期日计息"}',
                '%{$project.repayment_method|comment:"还款方式"}',
                '%{$project.repayment_circle|comment:"还款周期"}',
                '%{$project.repayment_day|comment:"还款日"}',
                '%{$project.remark|comment:"项目备注"}',
                '%{$project.creator_admin_id|comment:"创建者id"}',
                '%{$project.department|comment:"部门"}',
                '%{$project.update_time|day|comment:"编辑时间"}',
                '%{$project.create_time|day|comment:"创建时间"}'
            ]
        },
        {
            id: 'product',
            title: '产品',
            tags: [
                '%{$product.type|comment:"产品类型"}',
                '%{$product.name|comment:"产品名称"}',
                '%{$product.sn|comment:"产品编号"}',
                '%{$product.platform|comment:"发行平台"}',
                '%{$product.target|d10000|comment:"规模"}',
                '%{$product.duration|comment:"期限"}',
                '%{$product.min_invest|comment:"起投"}',
                '%{$product.apr|d|comment:"利率"}',
                '%{$product.step_rates|comment:"起投与利率"}',
                '%{$product.department|comment:"部门"}',
                '%{$product.creator_admin_id|comment:"添加人"}',
                '%{$product.extras|comment:"产品备注"}',
                '%{$product.create_time|day|comment:"创建时间"}',
                '%{$product.update_time|day|comment:"编辑时间"}'
            ]
        },
        {
            id: 'subproduct',
            title: '标的',
            tags: [
                '%{$subproduct.id|comment:"标的id"}',
                '%{$subproduct.sn|comment:"标的编号"}',
                '%{$subproduct.name|comment:"标的名称"}',
                '%{$subproduct.target|comment:"募集金额"}',
                '%{$subproduct.insert_start_date|comment:"起息日"}',
                '%{$subproduct.due_date|comment:"到期日"}',
                '%{$subproduct.cash_date|comment:"兑付日"}',
                '%{$subproduct.update_time|day|comment:"编辑时间"}',
                '%{$subproduct.create_time|day|comment:"创建时间"}'
            ]
        },
        {
            id: 'settlement',
            title: '清算',
            tags: [
                '%{$settlement.is_settlement|boolname|comment:"是否南金交清算"}',
                '%{$settlement.province|comment:"省级行政区"}',
                '%{$settlement.city|comment:"市级行政区"}',
                '%{$settlement.bank|comment:"清算银行"}',
                '%{$settlement.account_name|comment:"清算户名"}',
                '%{$settlement.card_no|comment:"清算卡号"}',
                '%{$settlement.direct_partner_id|comment:"资金投向"}',
                '%{$settlement.payment_partner_id|comment:"还款来源"}',
                '%{$settlement.fee_partner_id|comment:"费用承担方"}',
                '%{$settlement.tx_method|comment:"收付模式"}',
                '%{$settlement.update_time|day|comment:"编辑时间"}',
                '%{$settlement.create_time|day|comment:"创建时间"}'
            ]
        },
        //groups

    ];
    config.extendTemplateTags = [];
    //config.groups = [];
    config.extendSinners = [];
};