import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Invoices from "./scenes/global/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Bump from "./scenes/bump";
// import FAQ from "./scenes/global/faq";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Profile from "./scenes/profile";


function App() {
  const [ theme, colorMode ] = useMode();
  return (
      <ColorModeContext.Provider value={ colorMode }>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="app">
                <Sidebar />
              <main className="content">
                <Topbar/>
                  <Routes>
                      <Route path="/" element={<Dashboard/ >} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/contacts" element={<Contacts/ >} />
                      <Route path="/form" element={<Form/ >} />
                      <Route path="/bar" element={<Bar/>} />
                      <Route path="/bump" element={<Bump />} />
                      <Route path="/line" element={<Line />} />
                      {/*<Route path="/faq" element={<FAQ/>} />*/}
                      <Route path="/geography" element={<Geography /> }/>
                      <Route path="/profile" element={<Profile />} />
                  </Routes>
              </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
