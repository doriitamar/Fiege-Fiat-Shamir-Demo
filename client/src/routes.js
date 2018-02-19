import VueRouter from 'vue-router';
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

let routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
];

export default new VueRouter({
    routes
});