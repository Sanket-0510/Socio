import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage.jsx"
import LoginPage from "./scenes/LoginPage/LoginPage.jsx";
import ProfilePage from "./scenes/ProfilePage/ProfilePage.jsx"
import {useMemo} from "react";
import {useSelector} from "react-redux"
import { CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme.js";
import { createTheme } from "@mui/material/styles";
function App() {
  const mode =useSelector((state=>state.mode));
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode])

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme = {theme}>
      <CssBaseline/>
        <Routes>
          <Switch>
          <Route exact path="/" element={<HomePage></HomePage>}/>
          <Route exact path="/home" element={<HomePage />}/>        
          <Route path="/profile" element={<ProfilePage/>}/>     
          </Switch>    

        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
