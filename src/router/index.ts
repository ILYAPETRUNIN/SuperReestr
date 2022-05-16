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
    redirect: { name: "reestr" },
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
      {
        path: "/contract1",
        name: "contract1",
        component: PageDeveloping,
      },
      {
        path: "/contract2",
        name: "contract2",
        component: PageDeveloping,
      },
      {
        path: "/scans",
        name: "scans",
        component: PageDeveloping,
      },
      {
        path: "/originals",
        name: "originals",
        component: PageDeveloping,
      },
      {
        path: "/forPayment",
        name: "forPayment",
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

export default router;
