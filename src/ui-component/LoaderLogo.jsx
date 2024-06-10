import React from 'react';
import PropTypes from 'prop-types';
import loaderLogo from '../assets/images/pages/loaderlogo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LoaderLogo = ({ size }) => {
  return (
    <>
      <img src={loaderLogo} alt="Loading..." width={size} />
    </>
  );
};

LoaderLogo.propTypes = {
  size: PropTypes.number.isRequired,
};

export default LoaderLogo;
