# api.md

## 售后系统JSON接口

### 格式

```javascript
[ // root
    [ // row
        { // cell
            type: string                类型, 原生或自定义
            id: string
            name: string                名称, 唯一
            readOnly: boolean           只读, true
            defaultValue: string
            target: string              只用于select,联动加载哪个select 'name' 的数据(不能与sync同时使用)
            source: string              只用于select,被哪个select联动加载'name',元素自己不需要获取数据
            sync: string                数据同步指定的'name'(不能语target同时使用)
            option: [                   选项, type: 'select'时, option用于显示固定的选择选项
                ['', ''] | '',          Array: 0: id， 1: 显示名称; String: id 与 名称相同
            ],
            action: {                   按钮(上传)专有属性
                type: 'submit',         按钮操作类型，一般用来提交数据到后台
                handler: 'cancelRequest'提交到后台的路由(需要定义一些通用的后台接口，具体要和后台约定)
            },
            className: [
                '',                     自定义样式类, 'text-center font16 color-green'
                {xs: 12, offset: 6},    固定样式类, 会生成'dhms-xs-12 dhms-xs-offset-6'
                {sm: 12, offset: 6},    固定样式类, 会生成'dhms-sm-12 dhms-sm-offset-6'
                {md: 12, offset: 6},    固定样式类, 会生成'dhms-md-12 dhms-md-offset-6'
                {lg: 12, offset: 6},    固定样式类, 会生成'dhms-lg-12 dhms-lg-offset-6'
            ],
            title: string               标题
            style: object               inline样式
            maxLength: int              最大长度
            placeholder: string
            validate: object {          校验输入格式 
                reg: '^$',              正则字符串不包含前后'/'
                maxLength: 8,                 指定最大长度
                required: true           是否必填
            }
            validateMessage: string     校验失败提示
            children: array             子节点(optional)
        },
        {
        }
    ]
]
```

### DEMO

[demo](/demo.html)

## 售后保存接口

### 请求

```javascript
{
    data: {}  // 保存的数据: key是售后系统JSON接口的`name`
}
```

### 返回

```javascript
{
    stat: '200', // 200: 成功, 其他失败
    message: {}  // 错误返回的数据: key: 是售后系统JSON接口的`name`, value: 错误信息
}
```