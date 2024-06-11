import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Pos from './scenes/pos';
import { ColorModeContext, useMode } from './theme';

import themes from './themes';
import ToastCon from './themes/toast';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={themes({
          borderRadius: 10,
        })}
      >
        <CssBaseline />
        <div className="app">
          {/* <Sidebar /> */}
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/pos" element={<Pos />} />
            </Routes>
          </main>
          <ToastCon />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
