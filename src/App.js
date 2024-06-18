import { CssBaseline, ThemeProvider } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Route, Routes } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Pos from './scenes/pos';

import themes from './themes';
import ToastCon from './themes/toast';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <ThemeProvider
      theme={themes({
        borderRadius: 10,
      })}
    >
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Pos />} />
          </Routes>
        </main>
        <ToastCon />
      </div>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
