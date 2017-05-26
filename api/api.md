# api.md

## 售后系统JSON接口

### 格式

```json
{
    "border": true,
    "className": [],
    "style": {},
    "table": [
        [
            {
                "type": "",
                "name": "",
                "readOnly": false,
                "defaultValue": "",
                "target": "",
                "source": "",
                "sync":  "",
                "option": [["", ""]],
                "action": {
                    "type": "submit",
                    "handler": "/api/submitRequest"
                },
                "className": [
                    "text-right",
                    {"xs": 12, "offset": 6},
                    {"sm": 12, "offset": 6},
                    {"md": 12, "offset": 6},
                    {"lg": 12, "offset": 6},
                ],
                "title":  "",
                "style":  {},
                "maxLength": 8,
                "placeholder": "",
                "validate": {
                    "reg": "^$",
                    "maxLength": 8,
                    "required": true
                },
                "validateMessage": "",
                "validatePosition": "right",
                "children": []
            }
        ]
    ]
}
```

---

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|border|boolean|是否显示表格边框|true|
|table|array|二维数组表格, table>包含tr数组>包含td.td中是各种元素|[[td, td], [td, td]]|
|type|string|元素类型|select, input, label, div, textarea, hidden|
|name|string|需要提交的元素必须设置**name**，用来绑定事件，验证输入的唯一标示，整个json配置文件中不能重复|"customer"|
|readOnly|boolean|元素是否是只读|true|
|defaultValue|any|元素默认值||
|target|string|select元素专有属性, 联动的目标**name**||
|source|string|select元素专有属性, **target**元素的**name**, 表示此元素的数据受带有**target**元素的影响||
|sync|string|数据同步指定的**name**, 不能与**target**同时使用||
|option|array, string|select元素专有选项, 用于显示固定的选择选项. array时，第一个元素表示select option的value, 第二个元素表示option的显示内容; string时, option的value以及显示内容相同|[["100001", "用户1"], ["100002", "用户2"], ...]|
|action|object|按钮触发事件的选项|{"type": "submit", "handler": "/api/submitIssue"}|
|action.type|string 取值范围: "submit"|按钮出发事件的类型|"submit"|
|action.handler|string|指定与后台交互请求api|"/api/submitIssue"|
|className|array|元素class样式, 第一个元素是自定义的样式，其他是栅格样式|["text-center", {"xs": 12, "offset": 6}, ...] 参考*README.md*中(How to view api and layout) *layout.html*|
|style|object|元素自定义的内敛样式，使用React中的驼峰命名规范|{"zIndex": 9999}|
|title|string|元素鼠标移动上去显示的提示信息||
|maxLength|number|指定用户输入元素的最大长度|8|
|placeholder|string|用户输入的提示信息|"请输入电话"|
|validate|object|验证**name**元素的用户输入是否正确|{"reg": "^d?$", "maxLength": 8, "required": true}|
|validate.reg|string|正则验证|"^d?$"|
|validate.maxLength|number|长度验证|8|
|validate.required|boolean|是否必须输入|true|
|validateMessage|string|用户输入错误时的通用提示信息|"电话号码输入有误, 请重新输入"|
|validatePosition|string, 可选值 "top", "bottom", "left", "right"|错误信息显示在相对于元素的位置|"right"|
|children|array|td元素特有属性包含正常的**type**类型|[{"type": "label", "defaultValue": "xx"}]|



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