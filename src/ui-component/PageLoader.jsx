// material-ui
import { styled } from '@mui/material/styles';
import LoaderLogo from './LoaderLogo';

// styles
const PageLoaderWrapper = styled('div')({
  zIndex: 1301,
  width: '100%',
  backgroundColor: 'white', // Transparent black background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  animation: 'fadeInOut 2s infinite', // Add animation property
  '@keyframes fadeInOut': {
    // Define the fadeInOut animation
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
});

// ==============================|| PageLoader ||============================== //
const PageLoader = () => (
  <PageLoaderWrapper>
    <LoaderLogo size={120} />
  </PageLoaderWrapper>
);

export default PageLoader;
