import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'user',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.user',
    to: `${adminRoot}/user/list`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.list',
        to: `${adminRoot}/user/list`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.add-user',
        to: `${adminRoot}/user/add`,
      },
    ],
  },
  {
    id: 'company',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.company',
    to: `${adminRoot}/company`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.add-company',
        to: `${adminRoot}/company/add`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.update-company',
        to: `${adminRoot}/company/edit`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
