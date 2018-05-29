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
                    'class' => '\nui\Nui',
                    //'cachePath' => '@runtime/Smarty/cache',
                ],
            ],
        ],
    ],
];
```
