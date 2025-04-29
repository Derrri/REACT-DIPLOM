import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeWrapper from "./components/Client/HomeWrapper";
import Home from "./components/Client/Home";
import Hall from "./components/Client/Hall-hall_components/Hall";
import Payment from "./components/Client/Payment";
import Ticket from "./components/Client/Ticket";
import AdminWrapper from "./components/Admin/AdminWrapper";
import Login from "./components/Admin/Login";
import AdminControlCenter from "./components/Admin/AdminControlCenter"; 
import AddHallPopup from "./components/Admin/AdminControlComponents/AdminHallComponents/AddHallPopup";
import AddMoviePopup from "./components/Admin/AdminControlComponents/AdminMovieSeancesComponents/AddMoviePopup";
import AddSeance from "./components/Admin/AdminControlComponents/AdminMovieSeancesComponents/AddSeance";
import { DataProvider } from "./components/DataContext";

const App = () => {
    return (
        <DataProvider>
<Router>
    <Routes>
        <Route path="/" element={<HomeWrapper><Home /></HomeWrapper>} />
        <Route path="/Hall" element={<HomeWrapper><Hall /></HomeWrapper>} />
        <Route path="/Payment" element={<HomeWrapper><Payment /></HomeWrapper>} />
        <Route path="/Ticket" element={<HomeWrapper><Ticket /></HomeWrapper>} />
        <Route path="/admin/login" element={<AdminWrapper><Login /></AdminWrapper>} />
        <Route path="/admin/control-center" element={<AdminWrapper><AdminControlCenter /></AdminWrapper>} />
        <Route path="/admin/add-hall" element=
         {<AdminWrapper><AddHallPopup /></AdminWrapper>} /> 
        <Route path="/admin/add-movie" element=
         {<AdminWrapper><AddMoviePopup /></AdminWrapper>} />
         <Route path="/admin/add-movie-time" element=
         {<AdminWrapper><AddSeance /></AdminWrapper>} />
    </Routes>
</Router>
        </DataProvider>
    );
};

export default App;