import './App.css'
import HomePage from "../features/sports/pages/HomePage.jsx";
import Navbar from "../features/sports/components/NavBar.jsx";
import Footer from "../features/sports/components/Footer.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {useState} from "react";
import EventPage from "../features/sports/pages/EventPage.jsx";

function App() {

    const [leagueIds, setLeagueIds] = useState();

    return (
        <BrowserRouter>
            <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
                <Navbar leagueIds={leagueIds} setLeagueIds={setLeagueIds}/>
                <main className="flex-grow">
                    <Routes>

                        <Route path={"/"} element={<HomePage/>} />
                        <Route path="/event/:eventId" element={<EventPage />} />
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>

)
}

export default App
