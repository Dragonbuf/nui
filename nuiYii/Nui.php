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
            'name' => '',
            'child' => [
                [
                    'path' => '',
                    'icon' => '',
                    'name' => '',
                ]
            ]
        ]
    ];

    public $admin = [
        'avatar' => '',
        'name' => 'nui',
    ];

    public function init()
    {
        parent::init();


        $this->function_class = $this->function_class ? : '\nui\SmartyFunction';
        $this->block_class = $this->block_class ? : '\nui\SmartyBlock';
        $this->modifier_class = $this->modifier_class ? : '\nui\SmartyModifier';



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


        $this->smarty->assign('sidebar',$this->menu);

        $this->smarty->assign('admin',$this->admin);

        $this->smarty->registerFilter('output', array($this, 'add_block'));
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
