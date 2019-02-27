<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 18-5-22
 * Time: 下午1:27
 */

namespace nuiYii;


use yii\smarty\ViewRenderer;

class Nui extends ViewRenderer
{
    /**
     * @var string 本类中的方法都可以直接当作标签使用
     */
    public $function_class = '';

    /**
     * @var string 本类中的方法都可以直接当作标签使用
     */
    public $block_class = '';

    /**
     * @var string 本类中的方法都可以直接当作修饰器使用
     */
    public $modifier_class = '';

    public $menu =  [
        [
            'path' => '',
            'icon' => '',
            'name' => '一级目录',
            'child' => [
                [
                    'path' => '',
                    'icon' => '',
                    'name' => '二级目录',
                ]
            ]
        ]
    ];

    public $admin = [
        'id' => 1,
        'avatar' => '/nuiImage/default_avatar.png',
        'name' => 'nui',
        'email' => 'nui@nui.com'
    ];

    public $nuiDefaultName = 'nui';

    public $userInfo = '';

    public $setting = '';

    public $logout = '';

    public function init()
    {
        parent::init();


        // todo ln -s
        $destPath = \Yii::getAlias('@runtime').'/../web';
        $localPath = dirname(__FILE__).'/_resource/';

        $imagePath = $destPath.'/nuiImage';
        if (!is_dir($imagePath)) {
            shell_exec('ln -s '.$localPath.'nuiImage '.$destPath.'/nuiImage');
        }
        $resPath = $destPath.'/nuiRes';
        if (!is_dir($resPath)) {
            $result = shell_exec('ln -s '.$localPath.'nuiRes '.$destPath.'/nuiRes');
        }

        if (!is_dir($imagePath)) {
            echo '自动执行失败，请手动执行 :  ln -s '.$localPath.'nuiImage '.$destPath.'/nuiImage <br>';
            die;
        }

        if (!is_dir($resPath)) {
            echo '自动执行失败，请手动执行 :  ln -s '.$localPath.'nuiRes '.$destPath.'/nuiRes <br>';
            die;
        }


        $this->function_class = $this->function_class ? : '\nuiYii\SmartyFunction';
        $this->block_class = $this->block_class ? : '\nuiYii\SmartyBlock';
        $this->modifier_class = $this->modifier_class ? : '\nuiYii\SmartyModifier';



        if ($this->function_class && class_exists($this->function_class)) {
            $methods = get_class_methods($this->function_class);

            foreach ($methods as $method) {
                $this->smarty->registerPlugin('function', str_replace('_', '', $method), array($this->function_class, $method));
            }
        }

        if ($this->block_class && class_exists($this->block_class)) {
            $methods = get_class_methods($this->block_class);

            foreach ($methods as $method) {
                $this->smarty->registerPlugin('block', str_replace('_', '', $method), array($this->block_class, $method));
            }
        }

        if ($this->modifier_class && class_exists($this->modifier_class)) {
            $methods = get_class_methods($this->modifier_class);

            foreach ($methods as $method) {
                $this->smarty->registerPlugin('modifier', str_replace('_', '', $method), array($this->modifier_class, $method));
            }
        }

        $this->smarty->addTemplateDir(dirname(__FILE__),'nui');


        $params['is_login'] = !\Yii::$app->user->isGuest;
        //$params['admin'] = \Yii::$app->user->getIdentity();
        $params['csrf_token'] = \Yii::$app->request->getCsrfToken();
        $params['IS_DEBUG'] = YII_DEBUG;
        $params['success'] = $this->getFlash('success');
        $params['error'] = $this->getFlash('error');


        $this->smarty->assign($params);

        $this->smarty->assign('sidebar',$this->menu);

        $this->smarty->assign('admin',$this->admin);

        $this->smarty->assign('nuiDefaultName',$this->nuiDefaultName);

        $this->smarty->assign('userInfo',$this->userInfo);
        $this->smarty->assign('setting',$this->setting);
        $this->smarty->assign('logout',$this->logout);

        $this->smarty->registerFilter('output', array($this, 'add_block'));
    }
    
    public function render($view, $file, $params)
    {
        $params['csrf_token'] = \Yii::$app->request->csrfToken;
        $params['success'] = \Yii::$app->getSession()->getFlash('success', null) ?? false; 
        $params['error'] = \Yii::$app->getSession()->getFlash('error', null) ?? false;
        return parent::render($view, $file, $params);
    }
    
    private function getFlash($name)
    {
        return \Yii::$app->session->getFlash($name);
    }

    /**
     * @param $tpl_source
     * @param $template \Smarty_Internal_Template
     * @return string
     */
    public function add_block($tpl_source, $template) {
        return str_replace(array('-------css-files--------', '-------js-files--------'), array($this->render_header_css(SmartyFunction::$vars), $this->render_footer_js(SmartyFunction::$vars)), $tpl_source);
    }

    public function render_header_css($vars)
    {
        $html = "";
        if (isset($vars['css']) && !is_array($vars['css'])) {
            $vars['css'] = [$vars['css']];
        }

        if (isset($vars['css']) && is_array($vars['css'])) {
            foreach ($vars['css'] as $item) {
                $html .= '<link href="' . $item . '" rel="stylesheet">';
            }
        }

        return $html;
    }


    public function render_footer_js($vars)
    {
        $html = "";
        if (isset($vars['js']) && !is_array($vars['js'])) {
            $vars['js'] = [$vars['js']];
        }

        if (isset($vars['js']) && is_array($vars['js'])) {
            foreach ($vars['js'] as $item) {
                $html .= '<script src="' . $item . '"></s' . 'cript>';
            }
        }

        return $html;
    }
}
