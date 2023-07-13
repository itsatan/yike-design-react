import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '@/assets/logo.svg';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <header className={styles['navbar-wrapper']}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img
            src={logo}
            alt="logo"
          />
          <Link to="/">
            <h1>Yike Design React</h1>
          </Link>
        </div>
        <ul className={styles.nav}>
          <li>
            <Link
              to="/develop"
              className={pathname.startsWith('/develop') ? styles['activated'] : ''}
            >
              开发
            </Link>
          </li>
          <li>
            <Link
              to="/module"
              className={pathname.startsWith('/module') ? styles['activated'] : ''}
            >
              组件
            </Link>
          </li>
          <li>
            <Link
              to="http://www.huohuo90.com"
              target="_blank"
            >
              主站
            </Link>
          </li>
          <li>
            <Link
              to="https://github.com/itsatan/yike-design-react"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
