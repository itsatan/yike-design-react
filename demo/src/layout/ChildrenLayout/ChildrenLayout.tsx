import { Content, Sidebar } from '@/components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ChildrenLayout.module.scss';
import { useEffect } from 'react';
import { MenuItemWithLink } from '@/components/Sidebar/Sidebar';
import { DEVELOP_NAVIGATOR_MENU_ITEM, MODULE_NAVIGATOR_MENU_ITEM } from '@/constant';

const ChildrenLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menu = pathname.startsWith('/module') ? MODULE_NAVIGATOR_MENU_ITEM : DEVELOP_NAVIGATOR_MENU_ITEM;

  useEffect(() => {
    if (['/develop', '/module'].includes(pathname)) {
      const currentMenuItem = menu.find((item) => 'href' in item) as MenuItemWithLink | undefined;
      if (currentMenuItem) {
        navigate(currentMenuItem.href);
      }
    }
  }, [menu, navigate, pathname]);

  return (
    <div className={styles['children-layout-wrapper']}>
      <Sidebar menu={menu} />
      <div className={styles['children-layout-content']}>
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default ChildrenLayout;
