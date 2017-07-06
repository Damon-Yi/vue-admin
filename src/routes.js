import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
//import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import customer from './views/customer/customer.vue'
import vehicleType from './views/vehicleType/vehicleType.vue'
import contract from './views/contract&order/contract.vue'
import order from './views/contract&order/order.vue'
import insurance from './views/insuranceCompany/insurance.vue'
import company from './views/insuranceCompany/company.vue'
import message from './views/message/message.vue'
import wechat from './views/message/wechat.vue'
import send from './views/message/send.vue'
import ad from './views/advertisement/ad.vue'
import adPosition from './views/advertisement/adPosition.vue'
import user from './views/system/user.vue'
import role from './views/system/role.vue'
import menu from './views/system/menu.vue'
import holiday from './views/system/holiday.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/customer', component: customer, name: '客户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/vehicleType', component: vehicleType, name: '车型库查询' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '合同&订单管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/order', component: order, name: '订单管理' },
            { path: '/contract', component: contract, name: '合同管理'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '保险公司管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/company', component: company, name: '合作保险管理' },
            { path: '/insurance', component: insurance, name: '险种配置'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '消息管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/message', component: message, name: '短信提醒统计' },
            { path: '/wechat', component: wechat, name: '微信提醒统计' },
            { path: '/send', component: send, name: '消息发送' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/adPosition', component: adPosition, name: '广告位管理' },
            { path: '/ad', component: ad, name: '广告发布' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/user', component: user, name: '用户管理' },
            { path: '/role', component: role, name: '角色管理' },
            { path: '/menu', component: menu, name: '菜单管理' },
            { path: '/holiday', component: holiday, name: '节假日配置' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;