import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import workplace from './views/nav2/workplace.vue'
import Page5 from './views/nav2/Page5.vue'
import TreeList from './views/nav3/TreeList.vue'
import EditTable from './views/nav3/EditTable.vue'

import echarts from './views/charts/echarts.vue'

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
        name:'首页' ,
        children:[
            { path: '/main', component: Main, name: '首页'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component: Table, name: '用户管理' },
            { path: '/form', component: Form, name: '角色管理' },
            { path: '/user', component: user, name: '菜单管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '组件管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/workplace', component: workplace, name: '图表库' },
            { path: '/page5', component: Page5, name: '富文本' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '多级菜单',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点
        children: [
            { path: '/TreeList', component: TreeList, name: '二级菜单1' },
            { path: '/EditTable', component: EditTable, name: '三级菜单1' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
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