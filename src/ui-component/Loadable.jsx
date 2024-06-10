import { Suspense } from 'react';

// project imports
import Loader from './Loader';

import PageLoader from './PageLoader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const PageLoadable = (Component) => (props) =>
  (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );

export { Loadable, PageLoadable };
