Usage
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
                    'menu' => [
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
                    ],
                    'admin' => [
                        'id'=>1,
                        'email' =>'nui@nui.com',
                        'avatar' => '',
                        'name' => 'nui',
                    ],
                    'nuiDefaultName' => 'nui',
                    'function_class' => '',
                    'block_class' => '',
                    'modifier_class' => ''
                ],
            ],
        ],
    ],
];
```
