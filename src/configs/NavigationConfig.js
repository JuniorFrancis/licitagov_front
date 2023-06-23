import { SoundOutlined, OrderedListOutlined  } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}`,
  title: 'Menu',
  icon: SoundOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'dashboard',
      path: `${APP_PREFIX_PATH}/dashboard`,
      title: 'Dashboard',
      icon: OrderedListOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
