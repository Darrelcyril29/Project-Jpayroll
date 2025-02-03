export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'master',
    title: 'Master',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'clientStatus',
        title: 'Client Status',
        type: 'item',
        classes: 'nav-item',
        url: '/ClientStatus',
        icon: 'login',
        breadcrumbs: false,
        children:[
          {
            id: 'ChangeClient',
            title: 'Change Order Client',
            type: 'item',
            classes: 'nav-item',
            url: '/ChangeClient',
            icon: 'login',
          }
        ]
      },
      {
        id: 'changeORder',
        title: 'Change Order',
        type: 'item',
        classes: 'nav-item',
        url: '/ChangeOrder',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'UserDataTable',
        title: 'User Details',
        type: 'item',
        classes: 'nav-item',
        url: '/UserDataTable',
        icon: 'profile',
        breadcrumbs: false,
      } 
    ]
  },
  // {
  //   id: 'authentication',
  //   title: 'Authentication',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'login',
  //       title: 'Login',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/login',
  //       icon: 'login',
  //       target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'register',
  //       title: 'Register',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/register',
  //       icon: 'profile',
  //       target: true,
  //       breadcrumbs: false
  //     }
  //   ]
  // },

];
