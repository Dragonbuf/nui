Usage
-----
composer install dragonbuf/nui
-----

To use this extension, simply add the following code in your application configuration:

```php
return [
    //....
    'components' => [
        'view' => [
            'renderers' => [
                'tpl' => [
                    'class' => 'nuiYii\Nui',
                    //'cachePath' => '@runtime/Smarty/cache',
                    'options' => [
                        "left_delimiter" => "%{",
                        'caching' => false,
                        'compile_check' => true,
                    ],
                    'menu' => [
                        [
                            'path' => '/a',
                            'icon' => '',
                            'name' => 'a',
                            'child' => [
                                [
                                    'path' => '/b',
                                    'icon' => '',
                                    'name' => 'b',
                                ],
                                [
                                    'path' => '/c',
                                    'icon' => '',
                                    'name' => 'c',
                                ],
                                [
                                    'path' => '/d',
                                    'icon' => '',
                                    'name' => 'd',
                                ]
                            ]
                        ],
                        [
                            'path' => '/e',
                            'icon' => '',
                            'name' => 'e',
                            'child' => [
                                [
                                    'path' => '/f',
                                    'icon' => '',
                                    'name' => 'f',
                                ],
                            ]
                        ],
                        [
                            'path' => '/signer',
                            'icon' => '',
                            'name' => '个人中心',
                            'child' => [
                            ]
                        ]
                    ],
                    'nuiDefaultName' => 'nui',
                    'userInfo' => '/user-info',//个人中心
                    'setting' => '/setting',//设置
                    'logout' => '/site/logout'//退出
                ],
            ],
    ],
];
```



SiteController

```
public $layout = false
public function actionIndex()
{
    return $this->render('a.tpl');
}
```

a.tpl 
```
%{extends "_layout/layout.tpl"}

<div class="row">
    <div class="col-md-12">
        %{block name="main"}
        <div class="white-box">
            <h3 class="box-title">you can begin your view in this </h3>
        </div>

        %{/block}
    </div>
</div>
```
