import './App.css'
import HomePage from "../features/sports/pages/HomePage.jsx";
import Navbar from "../features/sports/components/NavBar.jsx";
import Footer from "../features/sports/components/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventPage from "../features/sports/pages/EventPage.jsx";
import SPORTS from "../config.js";
import {useLeaguesWithSportIdAndQuery} from "../features/sports/hooks.js";
import LeaguePage from "../features/sports/pages/LeaguePage.jsx";
import TeamPage from "../features/sports/pages/TeamPage.jsx";

function App() {

    // TODO duplicerad kod, skicka ner till Navbar på något vis?
    const currentYear = new Date().getFullYear();
    const leaguesData = {};
    const errors = {};
    let loading = false;
    SPORTS.forEach((sport) => {
        const result = useLeaguesWithSportIdAndQuery(sport.sportId, `&activeDate=${currentYear + sport.activeYearOffset}`);
        leaguesData[sport.leagueKey] = result.data?.filter(l => !/final|kval/i.test(l.name)) || [];
        errors[sport.leagueKey] = result.error;
        loading = loading || result.loading;
    });

    function generateLeagueRoutes() {
        return Object.keys(leaguesData).flatMap(key =>
            leaguesData[key].map(league => (
                <Route
                    key={league.id}
                    path={`/league/${league.id}`}
                    element={
                        <LeaguePage
                            leagueName={league.name}
                            leagueId={league.id}
                        />
                    }
                />
            ))
        );
    }


    return (
        <BrowserRouter>
            <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
                <Navbar/>
                <main className="flex-grow">
                    <Routes>
                        {generateLeagueRoutes()}
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path="/event/:id" element={<EventPage/>}/>
                        <Route path="/team/:id" element={<TeamPage/>}/>
                        <Route path="/league/:id" element={<LeaguePage/>}/>

                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>

    )
}

export default App
