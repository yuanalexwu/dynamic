# README.md

## How to develop

> run dev server

```shell
yarn dev
```

> run build

```shell
yarn build
```

## How to view and edit api

> run api server

```shell
cd api
sudo python -m SimpleHTTPServer 80
```

- `index.html` Api index page
- `demo.html` Api json data demo
- `layout.html` Layout page

## Mock

> run mock server

```shell
cd mock
node server.js
```

## Submitted data

> for mock/step1.json

```json
{
    "id": "工单Id",
    "issue_type": "工单故障类型",
    "customer": "客户ID",
    "device": "产品设备",
    "contact": "联系人",
    "tel": "联系电话",
    "desc": "问题描述",
}
```