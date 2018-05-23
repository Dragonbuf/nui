<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 18-5-21
 * Time: 下午1:43
 */

namespace nuiYii;


use yii\base\Model;

class SmartyBlock
{
    private static $fields = [];

    private static $layout = 'h';
    private static $label_class = '';
    private static $item_class = '';

    private static $inline = false;

    public static function add_field($name, $id = '')
    {
        self::$fields[$name] = $id ?: $name;
    }

    public static function get_label_class()
    {
        if (self::$layout == 'h') return self::$label_class;
        return '';
    }
    public static function get_item_class()
    {
        if (self::$layout == 'h') return self::$item_class;
        return '';
    }

    public static function get_layout() {
        return self::$layout{0};
    }

    public static function isInline() {
        return self::$inline;
    }

    public static function tag_html($tag, $attr)
    {
        $html = '<' . $tag;
        foreach ($attr as $key => $item) {
            $html .= ' ' . $key . '="' . $item . '"';
        }

        return $html . '>';
    }

    public static function layout($control_html, $help_html) {
        if (SmartyBlock::get_layout() == 'h') {
            return SmartyBlock::tag_html('div', ['class' => SmartyBlock::get_item_class()]) . $control_html . $help_html . '</div>';
        }
        if (SmartyBlock::get_layout() == 'v') {
            return $control_html . $help_html;
        }

        return $control_html;
    }

    /**
     * @param $params
     * @param $content
     * @param \Smarty $smarty
     * @return string|void
     */
    public static function form($params, $content, $smarty)
    {
        if ($params['layout']) self::$layout = $params['layout'];
        if (self::$layout == 'h') {
            self::$label_class = $params['label-class'];
            self::$item_class = $params['item-class'];
            if (!self::$label_class) self::$label_class = 'col-sm-4 col-md-3 col-lg-2';
            if (!self::$item_class) self::$item_class = 'col-sm-8 col-md-9 col-lg-10';
        }



        if (!$content) {
            self::$fields = [];
            return ;
        }


        $js = "";
        if ($params['model']) {
            $models = [];
            $model_strs = explode(',', $params['model']);

            // 取出并验证所有的 model，用于处理 rules
            foreach ($model_strs as $model_str) {
                $model_str = trim($model_str);
                if (!$model_str) continue;

                $model = $smarty->tpl_vars[$model_str]?$smarty->tpl_vars[$model_str]->value:false;
                if (!$model) continue;

                if (!($model instanceof Model)) continue;

                $models[] = $model;
            }

            $js = self::validate($models);
        }

        $class = [];
        $attr = [];
        if (self::$layout{0} == 'h') $class[] = 'form-horizontal';
        if (self::$layout{0} == 'i') $class[] = 'form-inline';
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['id']) $attr['id'] = $params['id'];
        if ($params['action']) $attr['action'] = $params['action'];
        if ($params['method']) $attr['method'] = $params['method'];
        if ($params['enctype']) $attr['enctype'] = $params['enctype'];

        $csrf = "";
        if (strtolower($attr['method']) == 'post') {
            $csrf = "<input name=\"_csrf\" type=\"hidden\" id=\"_csrf\" value=\"" . \Yii::$app->request->csrfToken . "\">";
        }

        if ($js) $attr['data-toggle'] = "validator";

        $html = self::tag_html('form', $attr);
        $html .= $content;
        $html .= $csrf;
        $html .= '</form>';

        $html .= '<script' . '>' . $js . '</script>';

        self::$layout = 'h';
        self::$label_class = '';
        self::$item_class = '';
        return $html;
    }

    public static function validate($models)
    {
        $js = "";
        foreach ($models as $model) {
            $js .= self::yii_validate_model($model);
        }

        return $js;
    }

    private static function getColumns($rule)
    {
        if (is_array($rule[0])) return $rule[0];

        return [$rule[0]];
    }

    /**
     * todo 不依赖 yii
     * @param $model Model
     * @return string
     */
    private static function yii_validate_model(Model $model, $fields = [])
    {
        $rules = $model->rules();

        $fields = $fields ?: self::$fields;
        foreach ($fields as $k=>$field) {
            if (strpos($k, '][')) {
                unset($fields[$k]);
                $f =  preg_replace('/\[(.*?)\]/','',$k,1);
                preg_match('/\[(.*?)\]/',$f,$e);
                $fields[$e[1]] = $field;
            } else if (strpos($k, '[')) {
                $k = preg_replace('/\[.*?\]/', '', $k);
                $fields[$k] = $field;
            }
        }
        $fields = $fields ?: self::$fields;
        foreach ($fields as $k=>$field) {
            unset($fields[$k]);
            $k = preg_replace('/\[.*?\]/', '', $k);
            $fields[$k] = $field;
        }
        $js = '';
        foreach ($rules as $rule) {
            if (!is_array($rule)) continue;

            $method = 'validate_rule_' . $rule[1];
            if (!method_exists(SmartyBlock::class, $method)) continue;

            $columns = self::getColumns($rule);
            array_shift($rule);
            foreach ($columns as $column) {
                if (!array_key_exists($column, $fields)) continue;

                $js .= self::$method($fields[$column], $rule);
            }
        }

        return $js;
    }

    private static function validate_rule_required($column, $rule)
    {
        return "$('#$column').prop('required', true);$('#$column').attr('data-required-error', '不允许为空');";
    }

    private static function validate_rule_safe($column, $rule)
    {
        return "";
    }

    /**
     * 验证整数
     * @param $column
     * @param $rule
     * @return string
     */
    private static function validate_rule_integer($column, $rule)
    {
        return "$('#$column').attr('pattern', '^[0-9]*$');";
    }
    private static function validate_rule_number($column, $rule)
    {
        $match = '^(?:\\-?[0-9]+(?:\\.[0-9]{1,4})?)?$';
        return "$('#$column').attr('pattern', '".$match."');";
    }

    private static function validate_rule_url($column, $rule)
    {
        return "$('#$column').attr('type', 'url');";
    }
    private static function validate_rule_email($column, $rule)
    {
        return "$('#$column').attr('type', 'email');";
    }
    private static function validate_rule_string($column, $rule)
    {
        $rulestr = "";

        if (isset($rule['max'])) {
            $rulestr .= "$('#$column').attr('maxlength', '".$rule['max']."');";
        }

        if (isset($rule['min'])) {
            $rulestr .= "$('#$column').attr('minlength', '".$rule['min']."');$('#$column').attr('data-minlength-error', '请输入最少".$rule['min']."个字符');";
        }
        return $rulestr;
    }
    private static function validate_rule_file($column, $rule)
    {
        $str = "$('#$column')";
        if ($rule['extensions']) $str .= ".data('extensions', '" . $rule['extensions'] . "')";
        if ($rule['mimeTypes']) $str .= ".data('mimetypes', '" . $rule['mimeTypes'] . "')";
        if ($rule['minSize']) $str .= ".data('minsize', '" . $rule['minSize'] . "')";
        if ($rule['maxSize']) $str .= ".data('maxsize', '" . $rule['maxSize'] . "')";
        return $str . ';';
    }

    /**
     * 数字的比较
     * @param $column
     * @param $rule
     */
    private static function validate_rule_compare($column, $rule)
    {
        if (!isset($rule['compareValue']) || !isset($rule['operator']) || !isset($rule['type'])) {
            throw new \Exception('请设置compareValue,operator,type的值');
        }
        if ($rule['operator'] == "==" || $rule['operator'] == "===") {
            return "$('#$column').attr('data-equals', ".$rule['compareValue'].");";
        } else if ($rule['operator'] == "!=" || $rule['operator'] == "!==") {
            return "$('#$column').attr('data-notequals', ".$rule['compareValue'].");$('#$column').attr('data-notequals-error', '不能等于".$rule['compareValue']."');";
        } else if ($rule['operator'] == ">") {
            return "$('#$column').attr('data-bigger', ".$rule['compareValue'].");$('#$column').attr('data-bigger-error', '不能小于".$rule['compareValue']."');";
        } else if ($rule['operator'] == ">=") {
            return "$('#$column').attr('data-biggerequals', ".$rule['compareValue'].");$('#$column').attr('data-biggerequals-error', '不能小于".$rule['compareValue']."');";
        } else if ($rule['operator'] == "<") {
            return "$('#$column').attr('data-less', ".$rule['compareValue'].");$('#$column').attr('data-less-error', '不能小于".$rule['compareValue']."');";
        } else if ($rule['operator'] == "<=") {
            return "$('#$column').attr('data-lessequals', ".$rule['compareValue'].");$('#$column').attr('data-lessequals-error', '不能小于".$rule['compareValue']."');";
        } else {
            throw new \Exception('不识别的operator值');
        }
    }

    private static function validate_rule_match($column, $rule) {
        return "$('#$column').attr('pattern', '" . addslashes(trim($rule['pattern'], '/')) . "');";
    }

    /**
     * @param $params
     * @param $content
     * @param \Smarty $smarty
     * @return string|void
     */
    public static function buttonarea($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['form-group'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('div', $attr);
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $html .= SmartyBlock::tag_html('div', $attr) . '</div>';
        $html .= SmartyBlock::tag_html('div', ['class' => SmartyBlock::get_item_class()]);
        $html .= $content;
        $html .= '</div>';
        $html .= '</div>';
        return $html;
    }

    /**
     * @param $params
     * @param $content
     * @param \Smarty $smarty
     * @return string|void
     */
    public static function buttongroup($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['btn-group'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('div', $attr);
        $html .= $content;
        $html .= '</div>';
        return $html;
    }

    /**
     * @param $params
     * @param $content
     * @param \Smarty $smarty
     * @return string|void
     */
    public static function dropdown($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['dropdown-menu'];
        $attr = ["role"=>"menu"];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('ul', $attr);
        $html .= $content;
        $html .= '</ul>';
        return $html;
    }

    private static function get_option_style($name, $box = "panel-")
    {
        $color = $box."default";
        switch ($name) {
            case "info":
                $color = $box.$name;
                break;
            case "danger":
                $color = $box.$name;
                break;
            case "success":
                $color = $box.$name;
                break;
            case "warning":
                $color = $box.$name;
                break;
        }

        return $color;
    }

    /**
     * @param $params
     * @param $content
     * @param \Smarty $smarty
     * @return string|void
     */
    public static function panel($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['panel'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($params['theme']) $class[] = self::get_option_style($params['theme']);
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('div', $attr);
        $html .= $content;
        $html .= '</div>';
        return $html;
    }

    public static function panelheader($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['panel-heading'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        $html = self::tag_html('div', $attr).$content;

        $action = "";
        if ($params['collapse'] == '1' || strtolower($params['collapse']) == 'on') {
            $action .= SmartyBlock::tag_html('a', ['data-perform' => 'panel-collapse']) . '<i class="ti-minus"></i></a>';
        }
        if ($params['close'] == '1' || strtolower($params['close']) == 'on') {
            $action .= SmartyBlock::tag_html('a', ['data-perform' => 'panel-dismiss']) . '<i class="ti-close"></i></a>';
        }

        if ($action) {
            $html .= SmartyBlock::tag_html('div', ['class' => 'panel-action']) .$action. '</div>';
        }
        $html .= '</div>';
        return $html;
    }

    public static function panelbody($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['panel-wrapper collapse in'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        $html = self::tag_html('div', $attr);
        $html .= SmartyBlock::tag_html('div', ['class' => 'panel-body']) .$content. '</div>';
        $html .= '</div>';
        return $html;
    }

    public static function panelfooter($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['panel-footer'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        $html = self::tag_html('div', $attr);
        $html .= $content;
        $html .= '</div>';
        return $html;
    }

    public static function tab($params, $content, $smarty)
    {
        if (!$content) return ;

        $class = [];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($params['theme']) $class[] = self::get_option_style($params['theme']);
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('div', $attr);
        $html .= $content;
        $html .= '</div>';
        return $html;
    }

    public static function tabheader($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['nav  nav-tabs'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($params['theme']) $class[] = self::get_tab_style($params['theme']);
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('ul', $attr);
        $html .= $content;
        $html .= '</ul>';
        return $html;
    }

    public static function tabbody($params, $content, $smarty)
    {
        if (!$content) return ;
        $class = ['tab-content'];
        $attr = [];
        if ($params['class']) $class[] = $params['class'];
        if ($class) $attr['class'] = implode(' ', $class);
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['id']) $attr['id'] = $params['id'];
        $html = self::tag_html('ul', $attr);
        $html .= $content;
        $html .= '</ul>';
        return $html;
    }

    private static function get_tab_style($theme)
    {
        $css = ['nav-tabs', 'customtab', 'tabs-vertical', 'customvtab', 'customtab2'];
        return in_array($theme, $css) ? $theme : "";
    }

    public static function inline($params, $content, $smarty)
    {
        if (!$content) {
            if (self::$inline) {
                throw new \Exception("[Smarty][SmartyBlock] Already in an inline tag");
            }
            self::$inline = true;
            return ;
        }

        $attr = [];
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $input_group_html = SmartyBlock::tag_html('div', ['class' => 'row']);
        $input_group_html .= $content;
        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        self::$inline = false;

        return $html;
    }

    public static function inline_html($html, $cols = 1) {
        if ($cols < 1) {
            $cols = 1;
        }
        if ($cols > 12) {
            $cols = 12;
        }

        $cols = intval($cols);

        return '<div class="col-xs-' . $cols . '">' . $html . '</div>';
    }
}