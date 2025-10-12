import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import DashboardPanel from "./Pages/DashboardPanel";

const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/dashboard" element={<DashboardPanel/>}></Route>

                </Routes>
            
            </BrowserRouter>
        )
}

export default AppRoutes;