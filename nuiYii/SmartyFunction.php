<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 18-5-21
 * Time: 下午1:43
 */

namespace nuiYii;


class SmartyFunction
{
    public static $vars = [];
    /**
     * @param $name
     * @param $res
     * @param $smarty \Smarty
     */
    public static function append($name, $res)
    {
        self::$vars[$name][basename($res)] = $res;
    }

    /**
     * <div class="form-group">
     *
     * </div>
     *
     * @param $params
     * @param $smarty \Smarty
     * @return string
     */
    public static function input_text($params, $smarty)
    {
        $html = '';

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        if (isset($params['value'])) $attr['value'] = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $attr['value'] = $_POST[$params['name']];

        $class = ['form-control'];
        if ($params['class']) $class[] = $params['class'];


        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        if (in_array($params['type'], ['password'])) {
            $attr['type'] = $params['type'];
        } else {
            $attr['type'] = 'text';
        }
        if ($params['type'] == 'currency') {
            $js = "/nuiRes/plugins/bower_components/auto-numeric/";
            if (YII_DEBUG) {
                $js .= "autoNumeric.js";
            } else {
                $js .= "autoNumeric.min.js";
            }
            self::append("js", $js);
            $class[] = 'currency';
        }
        $attr['class'] = implode(' ', $class);
        if ($params['password'] == '1' || strtolower($params['password']) == 'on') $attr['type'] = 'password';
        if ($params['readonly'] == '1' || strtolower($params['readonly']) == 'on') $attr['readonly'] = 'readonly';
        if ($params['disabled'] == '1' || strtolower($params['disabled']) == 'on') $attr['disabled'] = 'disabled';
        if ($params['autofocus'] == '1' || strtolower($params['autofocus']) == 'on') $attr['autofocus'] = 'on';
        if ($params['autocomplete'] == '1' || strtolower($params['autocomplete']) == 'on') $attr['autocomplete'] = 'on';
        if ($params['remote']) $attr['data-remote'] = $params['remote'];
        if ($params['match']) $attr['data-match'] = $params['match'];

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['input-group'];
        if ($params['no-bg-addon']) $class[] = 'no-bg-addon';

        $has_addon = false;
        $input_group_html = "";
        if ($params['prefix'] || $params['suffix'] || $params['btn-left'] || $params['btn-right']) {
            $has_addon = true;
            $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class)]);
        }


        if ($params['btn-left']) {
            $btn_id = $input_id . "-btn-left";
            $btn_class = '';
            if ($params['btn-left-id']) $btn_id = $params['btn-left-id'];
            if ($params['btn-left-class']) $btn_class = $params['btn-left-class'];

            $input_group_html .= '<span class="input-group-btn"><button type="button" class="btn waves-effect waves-light ' . $btn_class . '" id="' . $btn_id . '">' . $params['btn-left'] . '</button></span>';
        }

        if ($params['prefix']) {
            $input_group_html .= '<div class="input-group-addon">' . $params['prefix'] . '</div>';
        }

        $input_group_html .= $input_html;

        if ($params['suffix']) {
            $input_group_html .= '<div class="input-group-addon">' . $params['suffix'] . '</div>';
        }

        if ($params['btn-right']) {
            $btn_id = $input_id . "-btn-right";
            $btn_class = '';
            if ($params['btn-right-id']) $btn_id = $params['btn-right-id'];
            if ($params['btn-right-class']) $btn_class = $params['btn-right-class'];

            $input_group_html .= '<span class="input-group-btn"><button type="button" class="btn waves-effect waves-light ' . $btn_class . '" id="' . $btn_id . '">' . $params['btn-right'] . '</button></span>';
        }

        if ($has_addon) $input_group_html .= '</div>';

        if (SmartyBlock::isInline()) {
            return SmartyBlock::inline_html($input_group_html, $params['cols']);
        }

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    public static function textarea($params, $smarty)
    {
        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];
        if ($params['rows']) $attr['rows'] = $params['rows'];
        if ($params['cols']) $attr['cols'] = $params['cols'];
        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];

        $value = "";
        if (isset($params['value'])) $value = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $value = $_POST[$params['name']];

        $class = ['form-control'];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        $input_html = SmartyBlock::tag_html('textarea', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $input_html .= (htmlspecialchars($value)) . "</textarea>";

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    public static function checkbox($params, $smarty)
    {
        if (!isset($params['data'])) {
            throw new \Exception("请设置data属性");
        }

        $attr = [];
        $name = "";
        if ($params['name']) $name = $params['name'];

        $value = [];
        if ($params['value']) {
            $value = is_array($params['value']) ? $params['value'] : explode(',', $params['value']);
        }
        if ($params['name'] && $_POST[$params['name']]) {
            $value = is_array($_POST[$params['name']]) ? $_POST[$params['name']] : explode(',', $_POST[$params['name']]);
        }

        $class = ['form-control'];
        $attr['class'] = implode(' ', $class);

        $checkboxClass = ['checkbox'];
        if ($params['class']) $checkboxClass[] = $params['class'];

        $attr2 = [];
        $attr2['class'] = implode(' ', $checkboxClass);
        $input_html = "";
        foreach ($params['data'] as $key => $label) {
            $attr3 = ['type' => 'checkbox', 'value' => $key, 'name' => $name . '[]', "id" => $name . $key];
            if (in_array($key, $value)) {
                $attr3['checked'] = "checked";
            }
            $input_html .= SmartyBlock::tag_html('div', $attr2) .
                SmartyBlock::tag_html('input', $attr3) .
                SmartyBlock::tag_html('label', ["for" => $name . $key]) . $label .
                "</label></div>";
        }
        $attr = [];
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }



    /**
     * @param $params
     * @param $smarty \Smarty
     * @return string
     * @throws \Exception
     */
    public static function select($params, $smarty)
    {
        if (!isset($params['data'])) {
            throw new \Exception("请设置data属性");
        }

        if (YII_DEBUG) {
            $jses = ["/nuiRes/plugins/bootstrap-duallistbox/jquery.bootstrap-duallistbox.min.js", "/nuiRes/plugins/select2/js/select2.full.js", "/nuiRes/plugins/bower_components/bootstrap-select/bootstrap-select.min.js"];
            $csses = ["/nuiRes/plugins/bootstrap-duallistbox/bootstrap-duallistbox.min.css", "/nuiRes/plugins/select2/css/select2.css", "/nuiRes/plugins/bower_components/bootstrap-select/bootstrap-select.min.css"];
        } else {

            $jses = ["/nuiRes/plugins/bootstrap-duallistbox/jquery.bootstrap-duallistbox.min.js", "/nuiRes/plugins/select2/js/select2.full.min.js", "/nuiRes/plugins/bower_components/bootstrap-select/bootstrap-select.min.js"];
            $csses = ["/nuiRes/plugins/bootstrap-duallistbox/bootstrap-duallistbox.min.css", "/nuiRes/plugins/select2/css/select2.min.css", "/nuiRes/plugins/bower_components/bootstrap-select/bootstrap-select.min.css"];
        }

        $addition_html = '';

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];

        if ($params['name']) $attr['name'] = $params['name'];

        $style = intval($params['style']);
        if (!in_array($style, array(1, 2, 3))) $style = 2;

        self::append("js", $jses[$style - 1]);
        self::append("css", $csses[$style - 1]);


        $class = ['select' . $style];
        if ($params['class']) {
            array_push($class, $params['class']);
        }
        $js = "";
        if (isset($params['multiple']) && ($params['multiple'] == 1 || strtolower($params['multiple']) == 'on' || strtolower($params['multiple']) == 'multiple')) {
            $value = [];
            if ($params['value']) {
                $value = is_array($params['value']) ? $params['value'] : explode(',', $params['value']);
            }
            if ($params['name'] && $_POST[$params['name']]) {
                $value = is_array($_POST[$params['name']]) ? $_POST[$params['name']] : explode(',', $_POST[$params['name']]);
            }

            $class[] = "select$style-multiple";
            $attr['multiple'] = "multiple";
            $attr['name'] .= '[]';

            // add hidden fields to save ordered values
            $attr2 = [];
            $attr2['name'] = $params['name'] . '-ordered';
            $attr2['id'] = $attr2['name'];
            $attr2['type'] = 'hidden';
            $addition_html = SmartyBlock::tag_html('input', $attr2);

            if ($value) {
                foreach ($value as &$item) {
                    $item = addslashes($item);
                }

                $json = "['" . implode("','", $value) . "']";
                $js = '<script>$("#' . $attr['id'] . '").val(' . $json . ');$("#' . $attr['id'] . '-ordered").val("' . addslashes($params['value']) . '");</script>';
            };
        } else {
            $class[] = "form-control";
            if ($params['value']) {
                $js = '<script>$("#' . $attr['id'] . '").val("' . addslashes($params['value']) . '");</script>';
            };
        }
        $attr['class'] = implode(' ', $class);
        if ($params['placeholder']) $attr['data-placeholder'] = $params['placeholder'];

        $select_html = SmartyBlock::tag_html('select', $attr);

        $map_group = $params['map-group'] ?: "";
        $map_key = $params['map-key'] ?: "key";
        $map_value = $params['map-value'] ?: "value";
        $data = (array)$params['data'];
        $map = [];
        if ($map_group) {
            foreach ($data as $row) {
                $map[$row[$map_group]][] = ['key' => $row[$map_key], 'value' => $row[$map_value]];
            }

            foreach ($map as $group => $row) {
                $select_html .= '<optgroup label="' . $group . '">';
                $select_html .= self::get_option_html($row);
                $select_html .= '</optgroup>';
            }
        } else {
            foreach ($data as $key => $value) {
                if (is_array($value)) {
                    $map[] = ['key' => $value[$map_key], 'value' => $value[$map_value]];
                } else {
                    $map[] = ['key' => $key, 'value' => $value];
                }
            }
            $select_html .= self::get_option_html($map);
        }

        $attr = [];
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = isset($params['label']) ? SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>' : "";
        $select_html .= '</select>';

        $select_html .= $addition_html;

        if (SmartyBlock::isInline()) {
            return SmartyBlock::inline_html($select_html, $params['cols']);
        }

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';
        $wrap_html = SmartyBlock::layout($select_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>' . $js;

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }
    private static function get_option_html($options)
    {
        $html = "";
        foreach ($options as $v) {
            $html .= '<option value="' . htmlspecialchars($v['key']) . '" label="' . htmlspecialchars($v['value']) . '">' . ($v['value']) . '</option>';
        }

        return $html;
    }

    /**
     * 复选框的样式
     * @param $params
     * @param $smarty
     * @return string
     * @throws \Exception
     */
    public static function radio($params, $smarty)
    {
        if (!isset($params['data'])) {
            throw new \Exception("请设置data属性");
        }
        $html = '';

        $attr = [];
        $id = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        $name = "";
        if ($params['name']) $name = $params['name'];

        $value = '';
        if (isset($params['value'])) $value = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $value = $_POST[$params['name']];

        $class = ['form-control'];
        $attr['class'] = implode(' ', $class);

        $radioClass = ['radio'];
        if ($params['class']) $radioClass[] = $params['class'];

        $ckdivattr = [];
        $ckdivattr['class'] = implode(' ', $radioClass);

        $input_html = "";
        foreach ($params['data'] as $key => $datum) {
            $ckattr = ['type' => 'radio', 'value' => $key, 'name' => $name, "id" => $name . $key];
            if ($key == $value) {
                $ckattr['checked'] = "checked";
            }
            $input_html .= SmartyBlock::tag_html('div', $ckdivattr) .
                SmartyBlock::tag_html('input', $ckattr) .
                SmartyBlock::tag_html('label', ["for" => $name . $key]) . $datum .
                "</label></div>";
        }
        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    public static function button($params, $smarty)
    {
        $html = '';

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        $value = "";
        if ($params['value'])
            $value = $params['value'];
        else {
            $value = $input_id;
        }

        $isdropdown = false;
        if ($params['dropdown'] == '1' || strtolower($params['dropdown']) == 'on') $isdropdown = true;
        $class = ['btn'];
        if ($isdropdown) {
            $class[] = "dropdown-toggle";
            $attr['data-toggle'] = "dropdown";
        }
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        $attr['type'] = $params['type'] ? $params['type'] : "button";
        $input_html = SmartyBlock::tag_html('button', $attr);
        $input_html .= ($value);
        if ($isdropdown) $input_html .= '<span class="caret"></span>';
        $input_html .= "</button>";

        return $input_html;
    }

    public static function date($params, $smarty)
    {
        if (YII_DEBUG) {
            self::append("js", "/nuiRes/plugins/bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js");
            self::append("css", "/nuiRes/plugins/bower_components/bootstrap-datepicker/css/bootstrap-datepicker.css");
        } else {
            self::append("js", "/nuiRes/plugins/bower_components/bootstrap-datepicker/js/bootstrap-datepicker.min.js");
            self::append("css", "/nuiRes/plugins/bower_components/bootstrap-datepicker/css/bootstrap-datepicker.min.css");
        }
        self::append("js", "/nuiRes/plugins/bower_components/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js");

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        if ($params['value']) $attr['value'] = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $attr['value'] = $_POST[$params['name']];

        $class = ['form-control'];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        $attr['type'] = 'text';
        $attr['readonly'] = 'readonly';

        $format = ($params['format']) ? $params['format'] : 'yyyy-mm-dd';
        if ($format) {
            $attr['data-format'] = $format;
        }

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['input-group datepicker date'];

        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class)]);
        $input_group_html .= $input_html;

        $input_group_html .= '<span class="input-group-addon"><i class="icon-calender"></i></span>';
        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    public static function text($params, $smarty)
    {
        $attr = [];
        $text = "";
        if ($params['value']) $text = $params['value'];

        $class = ['form-control-static'];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);


        $input_html = SmartyBlock::tag_html('p', $attr);

        $attr = [];
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['input-group'];

        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class)]);
        $input_group_html .= $input_html.$text."<p>";
        $input_group_html .= '</div>';
        $wrap_html = SmartyBlock::layout($input_group_html, '');

        $html = '<div class="form-group m-b-0">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        return $html;
    }


    public static function daterange($params, $smarty)
    {
        self::append("js", "/nuiRes/plugins/bower_components/moment/moment.js");
        if (YII_DEBUG) {
            self::append("css", "/nuiRes/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.css");
            self::append("js", "/nuiRes/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.js");
        } else {
            self::append("css", "/nuiRes/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.min.css");
            self::append("js", "/nuiRes/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.min.js");
        }

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        if ($params['value']) $attr['value'] = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $attr['value'] = $_POST[$params['name']];

        $class = ['form-control date-range-picker'];
        if ($params['class']) $class[] = $params['class'];
        if ($params['time'] == '1' || strtolower($params['time']) == 'on') {
            $class[] = 'withtime';
            if ($params['time-increment']) {
                $attr['data-time-increment'] = $params['time-increment'];
            } else {
                $attr['data-time-increment'] = 1;
            }
        }
        $attr['class'] = implode(' ', $class);

        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        $attr['type'] = 'text';
        $attr['readonly'] = 'readonly';

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['input-group'];

        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class)]);
        $input_group_html .= $input_html;

        $input_group_html .= '<span class="input-group-addon"><i class="icon-calender"></i></span>';


        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    /**
     * 时间控件
     * @param $params
     * @param $smarty
     * @return string
     */
    public static function time($params, $smarty)
    {
        self::append("js", "/nuiRes/plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.js");
        self::append("css", "/nuiRes/plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.css");
        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        if ($params['value']) $attr['value'] = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $attr['value'] = $_POST[$params['name']];

        $class = ['form-control'];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        $attr['type'] = 'text';
        $autoclose = ($params['autoclose'] == '1' || strtolower($params['autoclose']) == 'on') ? true : false;
        if ($params['readonly'] == '1' || strtolower($params['readonly']) == 'on') $attr['readonly'] = 'readonly';

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['input-group', 'clockpicker'];

        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class), 'data-autoclose' => $autoclose, "data-placement" => "bottom", "data-align" => "top"]);
        $input_group_html .= $input_html . '<span class="input-group-addon"> <span class="glyphicon glyphicon-time"></span></span>';

        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    /**
     * 颜色选择器控件
     * @param $params
     * @param $smarty
     * @return string
     */
    public static function color($params, $smarty)
    {

        self::append("js", "/nuiRes/plugins/bower_components/jquery-asColorPicker-master/libs/jquery-asColor.js");
        self::append("js", "/nuiRes/plugins/bower_components/jquery-asColorPicker-master/libs/jquery-asGradient.js");
        self::append("js", "/nuiRes/plugins/bower_components/jquery-asColorPicker-master/dist/jquery-asColorPicker.min.js");
        self::append("css", "/nuiRes/plugins/bower_components/jquery-asColorPicker-master/css/asColorPicker.css");

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        if ($params['value']) $attr['value'] = $params['value'];
        if ($params['name'] && $_POST[$params['name']]) $attr['value'] = $_POST[$params['name']];

        $class = ['form-control', "complex-colorpicker"];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        $attr['type'] = 'text';

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['input-group'];

        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class)]);
        $input_group_html .= $input_html;
        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    /**
     * file上传控件
     * @param $params
     * @param $smarty
     * @return string
     */
    public static function file($params, $smarty)
    {
        self::append("js", "/nuiRes/js/jasny-bootstrap.js");

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = $params['name'];

        $class = [];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        $attr['type'] = 'file';

        if ($params['readonly'] == 1 || $params['readonly'] == 'on') {
            $attr['readonly'] = 'readonly';
        }

        if ($params['disabled'] == 1 || $params['disabled'] == 'on') {
            $attr['disabled'] = 'disabled';
        }

        if ($params['extensions']) {
            $attr['data-extensions'] = $params['extensions'];
        }
        $attr['data-file'] = 'file';

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['fileinput fileinput-new input-group'];
        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class), 'data-provides' => "fileinput"]);
        $input_group_html .= SmartyBlock::tag_html('div', ['class' => "form-control", 'data-trigger' => "fileinput"]);

        $input_group_html .= '<i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div>';
        $input_group_html .= '<span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">选择</span> <span class="fileinput-exists">选择</span>';
        $input_group_html .= $input_html;
        $input_group_html .= '</span><a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">移除</a>';
        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    /**
     * file上传控件
     * @param $params
     * @param $smarty
     * @return string
     */
    public static function ossfile($params, $smarty)
    {
        self::append("js", "/nuiRes/js/jasny-bootstrap.js");

        $attr = [];
        $attr['id'] = $params['id'] ?: $params['name'];
        if ($attr['id']) {
            $attr['id'] = 'file-' . $attr['id'];
        }
        $input_id = $attr['id'];
        if ($params['name']) $attr['name'] = 'file-' . $params['name'];

        $class = [];
        if ($params['class']) $class[] = $params['class'];
        $attr['class'] = implode(' ', $class);

        if ($params['placeholder']) $attr['placeholder'] = $params['placeholder'];
        $attr['type'] = 'file';

        if ($params['readonly'] == 1 || $params['readonly'] == 'on') {
            $attr['readonly'] = 'readonly';
        }

        if ($params['disabled'] == 1 || $params['disabled'] == 'on') {
            $attr['disabled'] = 'disabled';
        }

        if ($params['extensions']) {
            $attr['data-extensions'] = $params['extensions'];
        }
        $attr['data-file'] = 'oss';
        $attr['data-ossserver'] = $params['ossserver'];
        $attr['data-ossdir'] = $params['ossdir'];
        $attr['data-authurl'] = $params['authurl'];
        if ($params['ossparam']) $attr['data-ossparam'] = $params['ossparam'];
        if ($params['extensions']) $attr['data-extensions'] = $params['extensions'];
        if ($params['mimetypes']) $attr['data-mimetypes'] = $params['mimetypes'];
        if ($params['minsize']) $attr['data-minsize'] = $params['minsize'];
        if ($params['maxsize']) $attr['data-maxsize'] = $params['maxsize'];

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($params['name']) $attr['name'] = $params['name'];
        $attr['id'] = $params['id'] ?: $params['name'];
        $attr['type'] = 'hidden';
        $input_html .= SmartyBlock::tag_html('input', $attr);

        $attr = [];
        if ($input_id) $attr['for'] = $input_id;
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>';

        $class = ['fileinput fileinput-new input-group'];
        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class), 'data-provides' => "fileinput"]);
        $input_group_html .= SmartyBlock::tag_html('div', ['class' => "form-control", 'data-trigger' => "fileinput"]);

        $input_group_html .= '<i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span><span class="fileinput-state"></span><span class="fileinput-progress"></span> </div>';
        $input_group_html .= '<span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">选择</span> <span class="fileinput-exists">选择</span>';
        $input_group_html .= $input_html;
        $input_group_html .= '</span><a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">移除</a>';
        $input_group_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_group_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    /**
     * 多文件上传控件
     * @param $params
     * @param $smarty
     * @return string
     */
    public static function dropzone($params, $smarty)
    {

        if (YII_DEBUG) {
            self::append("css", "/nuiRes/plugins/bower_components/dropzone-master/dist/dropzone.css");
            self::append("js", "/nuiRes/plugins/bower_components/dropzone-master/dist/dropzone.js");
        } else {
            self::append("css", "/nuiRes/plugins/bower_components/dropzone-master/dist/min/dropzone.min.css");
            self::append("js", "/nuiRes/plugins/bower_components/dropzone-master/dist/min/dropzone.min.js");
        }

        $attr = [];
        if ($params['name']) $attr['name'] = $params['name'];

        $attr['type'] = 'file';
        $attr['multiple'] = 'multiple';
        if ($params['ossserver']) {
            $attr['data-dropzone'] = 'oss';
        }

        $input_html = SmartyBlock::tag_html('input', $attr);

        $attr = [];
        $attr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = $params['label'] ? SmartyBlock::tag_html('label', $attr) . $params['label'] . '</label>' : '';

        $id = $params['id'];

        $class = ['input-group', 'fallback'];
        $input_group_html = SmartyBlock::tag_html('div', ['class' => implode(' ', $class)]) . $input_html . '</div>';

        $attr = [];
        if ($params['ossserver'])$attr['data-ossserver'] = $params['ossserver'];
        if ($params['ossdir'])$attr['data-ossdir'] = $params['ossdir'];
        if ($params['authurl'])$attr['data-authurl'] = $params['authurl'];
        if ($params['ossparam']) $attr['data-ossparam'] = $params['ossparam'];
        if ($params['extensions']) $attr['data-extensions'] = $params['extensions'];
        if ($params['mimetypes']) $attr['data-mimetypes'] = $params['mimetypes'];
        if ($params['maxsize']) $attr['data-maxsize'] = floatval($params['maxsize']) / 1024 / 1024;
        if ($params['removeable']) $attr['data-removeable'] = $params['removeable'];
        if ($params['paralleluploads']) $attr['data-paralleluploads'] = $params['paralleluploads'];
        if ($params['maxfiles']) $attr['data-maxfiles'] = $params['maxfiles'];
        if ($params['url']) $attr['data-url'] = $params['url'];
        $attr['class'] = 'dropzone';
        $attr['id'] = $id;
        $attr['data-name'] = $params['name'];

        $dropzone_html = SmartyBlock::tag_html('div', $attr);
        $dropzone_html .= $input_group_html;
        $dropzone_html .= '</div>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($dropzone_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name'] && !$params['ossserver']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    public static function switcher($params, $smarty)
    {
        self::append("css", "/nuiRes/plugins/bower_components/switchery/dist/switchery.min.css");
        self::append("js", "/nuiRes/plugins/bower_components/switchery/dist/switchery.min.js");
        $attr = [];
        if ($params['name']) $attr['name'] = $params['name'];
        $attr['id'] = $params['id'] ?: $params['name'];

        $class = ['form-control'];
        $attr['class'] = implode(' ', $class);

        $checkboxClass = ['js-switch'];
        if ($params['class']) $checkboxClass[] = $params['class'];

        $attr['class'] = implode(' ', $checkboxClass);
        $attr['type'] = 'checkbox';
        if (\Yii::$app->request->isPost) {
            if ($params['name'] && $_POST[$params['name']]) {
                $attr['checked'] = 'checked';
            }
        } elseif ($params['value'] && ($params['value'] == 1 || strtolower($params['value']) == 'on')) {
            $attr['checked'] = 'checked';
            $attr['value'] = '1';
        }
        if ($params['readonly'] == '1' || strtolower($params['readonly']) == 'on') $attr['readonly'] = 'readonly';
        if ($params['disabled'] == '1' || strtolower($params['disabled']) == 'on') $attr['disabled'] = 'disabled';
        $attr['data-color'] = self::get_option_color($params['color']);
        $input_html = SmartyBlock::tag_html('input', $attr);
        $labelattr = [];
        $labelattr['class'] = SmartyBlock::get_label_class() . ' control-label';
        $label_html = SmartyBlock::tag_html('label', $labelattr) . $params['label'] . '</label>';

        $help_html = '<div class="help-block with-errors"></div>';
        if ($params['help']) $help_html .= '<div class="help-block">' . $params['help'] . '</div>';

        $wrap_html = SmartyBlock::layout($input_html, $help_html);

        $html = '<div class="form-group">';
        $html .= $label_html;
        $html .= $wrap_html;
        $html .= '</div>';

        if ($params['id'] ?: $params['name']) SmartyBlock::add_field($params['name'], $params['id']);

        return $html;
    }

    private static function get_option_color($name)
    {
        $color = "#99d683";
        switch ($name) {
            case "info":
                $color = "#13dafe";
                break;
            case "danger":
                $color = "#f96262";
                break;
            case "success":
                $color = "#f96262";
                break;
            case "warning":
                $color = "#ffca4a";
                break;
        }

        return $color;
    }

    public static function end_body($params, $smarty) {
        ob_start();
        \Yii::$app->view->endBody();
        $html = ob_get_clean();
        return $html;
    }
}