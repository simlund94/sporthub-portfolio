import {useLeagueAllSeasonsById, useLeagueStandingsById} from "../hooks/LeagueHooks.jsx";
import {useEffect, useState} from "react";
import LeagueStandingsTableWithSeasons from "../components/genericComponents/LeagueStandingsTableWithSeasons.jsx";
import GamesTable from "../components/genericComponents/GamesTable.jsx";
import {useEventByLeagueId} from "../hooks/EventHooks.jsx";

const LeaguePage = ({initialLeagueId}) => {
    const [leagueId, setLeagueId] = useState(initialLeagueId);

    useEffect(() => {
        setLeagueId(initialLeagueId);
    }, [initialLeagueId]);

    const resultAllSeasons = useLeagueAllSeasonsById(leagueId); // Hämta alla ligans säsonger
    const resultStandings = useLeagueStandingsById(leagueId); // Hämta statistik för rådande liga/säsong
    const [order, setOrder] = useState("asc");
    const [status, setStatus] = useState("FINISHED");
    const leagueData = useEventByLeagueId(leagueId, status, order);

    const currentYear = new Date().getFullYear().toString();

    console.log("currentYear", currentYear);


    console.log("LeagueData",leagueData);

    // Loading screen
    if (resultAllSeasons.loading || !resultAllSeasons.data) return <div>Loading...</div>
    if (resultStandings.loading || !resultStandings.data) return <div>Loading...</div>

    const standings = resultStandings.data.groups[0].standings;
    const allSeasons = resultAllSeasons.data.leagues;
    const leagueName =  resultAllSeasons.data.leagues[0].name;

    const currentSeason = allSeasons.find(l => l.id === leagueId)?.season.slug;
    const isCurrentSeason = currentSeason?.includes(currentYear);
console.log("currentSeason",currentSeason);
    // Debugging
    console.log(resultAllSeasons);
    console.log(standings);
    console.log(allSeasons);


    return (
        <div className="p-4">
            <h1 className="text-6xl text-center font-bold my-4 mx-2 glass p-12">{leagueName}</h1>
            <div role="tablist" className="hidden md:tabs md:tabs-border">
                {allSeasons.map(item => (
                    <button
                        role="tab"
                        key={item.id}
                        className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                        onClick={() => {
                            setLeagueId(item.id);
                        }}>
                        {item.season.slug}
                    </button>
                ))}
            </div>
            {/* Mobile season chooser */}
            <details className="dropdown md:hidden">
                <summary className="btn m-1">{currentSeason}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {allSeasons.map(item => (
                        <li>
                            <button
                                role="tab"
                                key={item.id}
                                className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                                onClick={() => setLeagueId(item.id)}>
                                {item.season.slug}
                            </button>
                        </li>
                    ))}
                </ul>
            </details>

            <div className="container mt-4 max-w-4xl  mb-10">
                <button
                    type="button"
                    className={`btn mt-4 mx-2 transition-colors duration-200 ${
                        status === "FINISHED" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setStatus("FINISHED")
                        setOrder("desc")
                    }}
                >
                    Senaste matcher
                </button>

                <button
                    type="button"
                    className={`btn mt-4 mx-2 transition-colors duration-200 ${
                        status === "UPCOMING" ? "btn-warning" : "btn-outline btn-warning"
                    } ${!isCurrentSeason ? "btn-disabled" : ""}`}
                    disabled={!isCurrentSeason}
                    onClick={() => {
                        setStatus("UPCOMING")
                        setOrder("asc")
                    }}
                >
                    Kommande Matcher
                </button>
                <GamesTable
                    items={leagueData.data}
                    loading={leagueData.loading}
                    showDate= {true}
                    error={leagueData.err}

                />

            </div>
            <h1 className="text-4xl  font-bold my-4 mx-2 glass p-2">Tabell: {currentSeason}</h1>
            <LeagueStandingsTableWithSeasons
                standings={standings}
                allSeasons={allSeasons}
                leagueId={leagueId}
                setLeagueId={setLeagueId}/>


        </div>
    )

}

export default LeaguePage