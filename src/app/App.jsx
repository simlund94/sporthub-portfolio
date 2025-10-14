import './App.css'
import HomePage from "../features/sports/pages/HomePage.jsx";
import Navbar from "../features/sports/components/NavBar.jsx";
import Footer from "../features/sports/components/Footer.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import LeaguePage from "../features/sports/pages/LeaguePage.jsx";
import {useLeagues} from "../features/sports/hooks.js";
import SPORTS from "../config.js";

function App() {

    const leaguesData = {};
    const errors = {};
    let loading = false;
    const currentYear = new Date().getFullYear();

    SPORTS.forEach((sport) => {
        const result = useLeagues(sport.sportId, `&activeDate=${currentYear + sport.activeYearOffset}`);
        leaguesData[sport.leagueKey] = result.data?.filter(l => !/final|kval/i.test(l.name)) || [];
        errors[sport.leagueKey] = result.error;
        loading = loading || result.loading;
    });

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Navbar/>
                <main className="flex-grow">
                    <Routes>
                        {Object.keys(leaguesData).forEach((key) => {
                            console.log(leaguesData[key].name);
                            <Route path={"/" + leaguesData[key].name} element={<LeaguePage />} />
                        })}
                        <Route path={"/"} element={<HomePage/>} />
                    </Routes>
                </main>
                <Footer/>
            </div>

        </BrowserRouter>

)
}

export default App
