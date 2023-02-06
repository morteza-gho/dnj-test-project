import Home from "../components/Home/Home.vue";

const routes = [
   { path: "/", name: 'home', component: Home },
   { path: '/discussions', name: 'discussions', component: () => import('../components/discussions/discussions.vue') },
   { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/Global/NotFound.vue') },
];

export default routes;