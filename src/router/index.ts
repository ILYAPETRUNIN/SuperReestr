import Vue from "vue";

import VueRouter, { RouteConfig } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";

import PageReestr from "../views/Reestr/PageReestr.vue";
import PageReestrView from "../views/Reestr/PageReestrView.vue";
import PageClients from "../views/Clients/PageClients.vue";
import NotFound from "../views/NotFound.vue";
import PageDeveloping from "../views/PageDeveloping.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: BaseLayout,
    redirect: { name: "reestr_view" },
    children: [
      {
        path: "/reestr",
        name: "reestr",
        component: PageReestr,
      },
      {
        path: "/reestr_view",
        name: "reestr_view",
        component: PageReestrView,
      },
      {
        path: "developing",
        name: "developing",
        component: PageDeveloping,
      },
      {
        path: "http://perevoz.datrans.ru:8443/",
        beforeEnter() {
          window.location.href = "http://perevoz.datrans.ru:8443";
        },
        name: "contract1",
        component: PageDeveloping,
      },
      {
        path: "http://perevoz.datrans.ru:8443/client",
        beforeEnter() {
          window.location.href = "http://perevoz.datrans.ru:8443/client";
        },
        name: "contract2",
        component: PageDeveloping,
      },
      {
        path: "http://perevoz.datrans.ru/#main-tab",
        beforeEnter() {
          window.location.href = "http://perevoz.datrans.ru/#main-tab";
        },
        name: "scans",
        component: PageDeveloping,
      },
      {
        path: "http://perevoz.datrans.ru/#tab-original",
        beforeEnter() {
          window.location.href = "http://perevoz.datrans.ru/#tab-original";
        },
        name: "originals",
        component: PageDeveloping,
      },
      {
        path: "http://perevoz.datrans.ru/#tab-paid",
        name: "forPayment",
        beforeEnter() {
          window.location.href = "http://perevoz.datrans.ru/#tab-paid";
        },
        component: PageDeveloping,
      },
      {
        path: "/clients",
        name: "clients",
        component: PageClients,
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
