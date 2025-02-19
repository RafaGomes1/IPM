import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Login.vue'
import consulta from '../views/Consulta.vue'
import servicosPendentes from '../views/Servicos_pendentes.vue'
import servicosSuspensos from '../views/Servicos_suspensos.vue'
import servicosTerminados from '../views/Servicos_terminados.vue'
import historico from '../views/Historico.vue'
import NotFoundComponent from '../views/NotFound.vue'
import Servico from '../views/Servico.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/consulta',
    name: 'consulta',
    component: consulta,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/consulta/servicos_pendentes',
    name: 'servicosPendentes',
    component: servicosPendentes,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/consulta/servicos_suspensos',
    name: 'servicosSuspensos',
    component: servicosSuspensos,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/consulta/servicos_terminados',
    name: 'servicosTerminados',
    component: servicosTerminados,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/consulta/servico/:id',
    name: 'servicoDetails',
    component: Servico,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/consulta/servico/:id/historico/:vehicleId',
    name: 'historico',
    component: historico,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/:catchAll(.*)', // Catch all non-existing routes
    redirect: '/404' // Redirect to a 404 route
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundComponent // This should be your component for handling 404 errors
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const isAuthenticated = () => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('logintoken');
  return token !== null;
}



//se o gajo esta autenticado consegue ir para o next, senao fica na /

router.beforeEach((to, from, next) => {
  console.log(isAuthenticated());
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router
