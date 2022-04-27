import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";

import PageReestr from "../views/Reestr/PageReestr.vue";
import NotFound from "../views/NotFound.vue";
import PageDeveloping from "../views/PageDeveloping.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: BaseLayout,
    children: [
      {
        path: "/reestr",
        name: "reestr",
        component: PageReestr,
      },
      {
        path: "/developing",
        name: "developing",
        component: PageDeveloping,
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const pathDev = [
    "scans",
    "originals",
    "forPayment",
    "contract1",
    "contract2",
  ];
  if (pathDev.includes(to.name ? to.name : "")) {
    next("/developing");
  }
  next();
});

export default router;
