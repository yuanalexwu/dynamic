# api.md

## 售后系统JSON接口

### 通用接口请求

**所有请求需要携带身份验证key**

> /api/xxx/xxx?key=4e4c621c02fa8af2ef2b2fbc249e8052

字段名|类型|说明|例子
:-----------:|:-----------:|:-----------:|:-----------:
key|string|标示请求用户的key|4e4c621c02fa8af2ef2b2fbc249e8052

### 通用接口返回结构

```json
{
    "status": 200,
    "msg": "",
    "devmsg": "",
    "data": {}
}
```

字段名|类型|说明|例子
:-----------:|:-----------:|:-----------:|:-----------:
status|number|返回状态值|200: 成功, 204: 错误
msg|string|用户提示信息|获取信息失败
devmsg|string|开发提示信息|请求id:xxx不存在
data|mix|返回的数据|

---

### 获取工单配置信息

#### 请求

> /gw/issuecenter/issue/config/:issueId

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|issueId|string,number|工单id|iid10001|

#### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": {
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
                    "target": [],
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
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|border|boolean|是否显示表格边框|true|
|table|array|二维数组表格, table>包含tr数组>包含td.td中是各种元素|[[td, td], [td, td]]|
|type|string|元素类型|select, input, label, div, textarea, hidden|
|name|string|需要提交的元素必须设置**name**，用来绑定事件，验证输入的唯一标示，整个json配置文件中不能重复|"customer"|
|readOnly|boolean|元素是否是只读|true|
|defaultValue|any|元素默认值||
|target|array|select元素专有属性, 联动的目标**name**数组||
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

---

## 获取客户列表

### 请求

> /gw/usercenter/customer/select

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": [
        {"custId": "cust1001", "name": "许厂矿"},
        {"custId": "cust1002", "name": "果园"},
    ]
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|custId|string|客户id||
|name|string|客户姓名||

---

## 获取联系人列表

### 请求

> /gw/usercenter/contact/select?custId=cust10001

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|custId|string|客户id||

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": [
        {"contactId": "catid1001", "phone": "13976524526", "name": "张三"},
        {"contactId": "catid1002", "phone": "13975524527", "name": "李四"},
    ]
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|contactId|string,number|客户id|'catid1001'|
|phone|string|联系人电话|'1387665512'|
|name|string|联系人姓名|'张三'|

---

## 获取设备列表

### 请求

> /gw/devicecenter/device/select?custId=cust10001

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|custId|string|客户id||

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": [
        {"deviceId": "devid1001", "devname": "设备1"},
        {"deviceId": "devid1002", "devname": "设备2"},
    ]
}
```

---

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|deviceId|string|设备id||
|devname|string|设备名称||

## 售后首页

### 请求

> /gw/issuecenter/home

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": {
        "total": 666,
        "handling": 666,
        "unhandling": 666,
        "finish": 666,
        "list": [
            {
                "issueId": "0001",
                "customer": "许厂矿",
                "contact": "张三",
                "tel": "13305498556",
                "device": "可制动装置",
                "submitDate": "2017-05-26",
                "handleDate": "2017-05-28",
                "desc": "不能正常运行"
            }
        ]
    }
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|total|number|工单总数||
|handling|number|正在处理工单数量||
|unhandling|number|未处理工单数量||
|finish|number|处理完成工单数量||
|list|array|最近处理工单信息列表||
|list[].issueId|string|工单id||
|list[].customer|string|客户名称||
|list[].contact|string|联系人||
|list[].tel|string|联系人电话||
|list[].device|string|维护的设备名称||
|list[].submitDate|string|工单提交时间||
|list[].handleDate|string|工单处理时间||
|list[].desc|string|工单描述||

---

## 获取售后工单列表

### 请求

> /gw/issuecenter/issue/list?stat=all&size=10&page=1

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|stat|string|工单查询状态: `'all'`, `'handling'`, `'unhandle'`, `'finish'`||
|size|number|每页数量|10|
|page|number|当前页|1|

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": {
        "total": 201,
        "page": 1,
        "size": 10,
        "list": [
            {
                "issueId": "0001",
                "customer": "许厂矿",
                "contact": "张三",
                "tel": "13305498556",
                "device": "可制动装置",
                "submitDate": "2017-05-26",
                "handleDate": "2017-05-28",
                "desc": "不能正常运行",
                "stat": "handling"
            },
            {
                "issueId": "0001",
                "customer": "许厂矿",
                "contact": "张三",
                "tel": "13305498556",
                "device": "可制动装置",
                "submitDate": "2017-05-26",
                "handleDate": "2017-05-28",
                "desc": "不能正常运行",
                "stat": "handling"
            },
            // ...
        ]
    }
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|total|number|工单总数||
|page|number|当前页码||
|size|number|每页显示数量||
|list|array|处理工单信息列表||
|list[].issueId|string|工单id||
|list[].customer|string|客户名称||
|list[].contact|string|联系人||
|list[].tel|string|联系人电话||
|list[].device|string|维护的设备名称||
|list[].submitDate|string|工单提交时间||
|list[].handleDate|string|工单处理时间||
|list[].desc|string|工单描述||
|list[].stat|string|工单当前状态, `'handling'`, `'unhandle'`, `finish`||

---

## 获取工单流程列表

### 请求

> /gw/issuecenter/process/select

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": [
        {"pro_uid": "300001", "pro_title": "流程1"},
        {"pro_uid": "300002", "pro_title": "流程2"},
        {"pro_uid": "300003", "pro_title": "流程3"}
    ]
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|pro_uid|string|流程id||
|pro_title|string|流程名称||

---

## 获取工单类型列表

### 请求

> /gw/issuecenter/issue_type/select

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": [
        ["10001", "故障报修"],
        ["10002", "安装调试"]
    ]
}
```

---

## 创建工单

### 请求

> /gw/issuecenter/issue/create?pro_uid=300001

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|pro_uid|string|流程id||

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
    "data": {
        "issueId": "0001"
    },
}
```

|字段名|类型|说明|例子|
|:-----------:|:-----------:|:-----------:|:-----------:|
|issueId|string|工单id||

---

## 售后保存接口

### 请求

> /gw/issuecenter/issue/save

```json
{
    "data": {
        "issueId": 0001,
        "customer": "许厂矿",
        "contact": "张三",
        "tel": "13305498556",
        "device": "可制动装置",
        "submitDate": "2017-05-26",
        "handleDate": "2017-05-28",
        "desc": "不能正常运行",
        "stat": "handling"
    }
}
```

### 返回

```json
{
    "status": 200,
    "msg": "成功",
    "devmsg": "",
}
```

---
