import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';

import { ReactComponent as CRWNLogo } from '../../assets/crown.svg';
import '../navigation/navigation.styles.scss';

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className='logo-container' to="/">
          <CRWNLogo className='logo'/>
        </Link>
        <div className='links-container'>
          <Link className='nav-links-container' to="/shop">
            SHOP
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
