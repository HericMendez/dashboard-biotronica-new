import {
  faSatelliteDish,
  faMobile,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
/* export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
      children: [
        {
          name: 'Default',
          to: '/',
          exact: true,
          active: true
        },
        {
          name: 'Analytics',
          to: '/dashboard/analytics',
          active: true
        },
        {
          name: 'CRM',
          to: '/dashboard/crm',
          active: true
        },
        {
          name: 'E Commerce',
          to: '/dashboard/e-commerce',
          active: true
        },
        {
          name: 'LMS',
          to: '/dashboard/lms',
          active: true,
          badge: {
            type: 'success',
            text: 'New'
          }
        },
        {
          name: 'Management',
          to: '/dashboard/project-management',
          active: true
        },
        {
          name: 'SaaS',
          to: '/dashboard/saas',
          active: true
        },
        {
          name: 'Support desk',
          to: '/dashboard/support-desk',
          active: true,
          badge: {
            type: 'success',
            text: 'New'
          }
        }
      ]
    }
  ]
}; */
export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'Dashboard',
      icon: 'chart-line',
      to: '/',
      active: true
    },

    {
      name: 'Devices',
      icon: faMobile,
      to: '/devices',
      active: true
    },

    {
      name: 'Gateways',
      icon: faSatelliteDish,
      to: '/gateways',
      active: true
    },

    {
      name: 'Sair',
      icon: faArrowLeft,
      to: '/logout',
      active: true
    }
    /*  {
      name: 'Kanban',
      icon: ['fab', 'trello'],
      to: '/app/kanban',
      active: true
    } */
  ]
};

export default [appRoutes];
