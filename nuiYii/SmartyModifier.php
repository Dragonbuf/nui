<?php
/**
 * Created by PhpStorm.
 * User: z
 * Date: 18-5-21
 * Time: 下午1:43
 */

namespace nui;


class SmartyModifier
{
    public static function comment($string, $comment = '') {
        return $string;
    }

    public static function get($string,$key)
    {
        if (empty($string)) {
            return '';
        }

        foreach ($string as $str){
            if($str['key'] == $key){
                return $str['value'];
            }
        }


    }

    public static function devide_by($param,$by)
    {
        return $param/$by;
    }

    public static function d_10000($param)
    {
        if (!is_numeric($param)) {
            return $param;
        }

        return ($param/10000).'万';
    }

    public static function d($param)
    {
        if (!is_numeric($param)) {
            return $param;
        }
        return rtrim(rtrim($param,'.0'),'0');
    }

    public static function multiply_by($param,$by)
    {
        return $param*$by;
    }


    /**
     * %{ $a |params:'a,12,13'}  =>  $a['a']['12']['13']
     * @param $string
     * @param string $keys
     * @return mixed
     */
    public static function array_params($string,$keys = '')
    {
        $array = json_decode($string);
        $keyArray = explode(',',$keys);
        foreach ($keyArray as $key){
            $array = $array[$key];
        }
        return $array;
    }

    public static function boolname($status )
    {
        if ($status === 0) return '否';
        if ($status === 1) return '是';
    }

    public static function year($datatime)
    {
        return date('Y年', strtotime($datatime));
    }

    public static function month($datatime)
    {
        return date('Y年m月', strtotime($datatime));
    }

    public static function day($datatime)
    {
        return date('Y年m月d日', strtotime($datatime));
    }

    public static function hour($datatime)
    {
        return date('Y年m月d日 H时', strtotime($datatime));
    }

    public static function minute($datatime)
    {
        return date('Y年m月d日 H时i分', strtotime($datatime));
    }

    public static function second($datatime)
    {
        return date('Y年m月d日 H时i分s秒', strtotime($datatime));
    }
}