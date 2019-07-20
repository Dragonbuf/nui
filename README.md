备注
-----
    这个项目是因为之前公司前端排期一直排不上，后端管理后台催的急，自己手撸了一个通用的后端管理框架，公司内部用还可以。 
-----
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
    return $this->render('index.tpl');
}
```

index.tpl 
```
%{extends "_layout/layout.tpl"}

%{block name="page-title"}main%{/block}

%{block name="page-action"}
    <a href="javascript: void(0);" target="_blank" class="btn btn-danger pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light">DELETE</a>
    %{/block}



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




#### notice
you can set flash message in Controller,nui will show error or success message in flash
```
\Yii::$app->getSession()->setFlash('error', 'This is the message');
  
\Yii::$app->getSession()->setFlash('success', 'This is the message');
```
