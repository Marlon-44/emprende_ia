import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import DashboardPanel from "./Pages/DashboardPanel";
import LandingPage from "./Pages/Landing";
import { Module } from "./Pages/Module";

const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage/>}></Route>
                    <Route path="/dashboard" element={<DashboardPanel/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/module" element={<Module/>}></Route>
                </Routes>
            
            </BrowserRouter>
        )
}

export default AppRoutes;