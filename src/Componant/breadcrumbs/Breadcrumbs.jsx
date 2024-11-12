import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './Breadcrumbs.css';

const breadcrumbNameMap = {
  '/': 'Home',
  '/login': 'Login',
  '/signup': 'Signup',
  '/about': 'About',
  '/account': 'Account',
  '/cart': 'Cart',
  '/details': 'Details',
  '/wishlist': 'Wishlist',
  '/checkout': 'Checkout',
  '/contact': 'Contact',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const hiddenPaths = ['/', '/login', '/signup'];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="breadcrumbs-container">
      <Link to="/" className="breadcrumb-item">
        <HomeIcon fontSize="small" />
      </Link>

      {pathnames.map((pathname, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        // فك الترميز لاسم المنتج
        const breadcrumbName = breadcrumbNameMap[to] || decodeURIComponent(pathname);

        return (
          <div key={to} className="breadcrumb-separator">
            <span>/</span>
            {isLast ? (
              <span className="breadcrumb-item-active">{breadcrumbName}</span>
            ) : (
              <Link to={to} className="breadcrumb-item-inactive">{breadcrumbName}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
