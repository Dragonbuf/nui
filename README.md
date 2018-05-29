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
                    'options' => [
                        "left_delimiter" => "%{",
                        'caching' => false,
                        'compile_check' => true,
                    ],
                    'nuiDefaultName' => '和签',
                ],
            ],
    ],
];
```
