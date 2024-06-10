import bsulogo from '../assets/images/pages/bsulogo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {
  return (
    <>
      <img src={bsulogo} alt="BSU logo" width={props.size} />
    </>
  );
};

export default Logo;
