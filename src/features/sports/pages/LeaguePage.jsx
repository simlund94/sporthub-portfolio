import {useLeagueAllSeasonsById, useLeagueStandingsById} from "../hooks/LeagueHooks.jsx";
import {useEffect, useState} from "react";
import LeagueStandingsTableWithSeasons from "../components/LeagueStandingsTableWithSeasons.jsx";

const LeaguePage = ({initialLeagueId}) => {
    const [leagueId, setLeagueId] = useState(initialLeagueId);

    useEffect(() => {
        setLeagueId(initialLeagueId);
    }, [initialLeagueId]);

    const resultAllSeasons = useLeagueAllSeasonsById(leagueId); // Hämta alla ligans säsonger
    const resultStandings = useLeagueStandingsById(leagueId); // Hämta statistik för rådande liga/säsong

    // Loading screen
    if (resultAllSeasons.loading || !resultAllSeasons.data) return <div>Loading...</div>
    if (resultStandings.loading || !resultStandings.data) return <div>Loading...</div>

    const standings = resultStandings.data.groups[0].standings;
    const allSeasons = resultAllSeasons.data.leagues;
    const leagueName =  resultAllSeasons.data.leagues[0].name;

    const currentSeason = allSeasons.find(l => l.id === leagueId)?.season.slug;

    // Debugging
    console.log(resultAllSeasons);
    console.log(standings);
    console.log(allSeasons);

    return (
        <div className="p-4">
            <h2 className="text-3xl text-center font-bold my-4 mx-2">{leagueName}</h2>

            {/* Desktop season chooser*/}
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

            <LeagueStandingsTableWithSeasons
                standings={standings}
                allSeasons={allSeasons}
                leagueId={leagueId}
                setLeagueId={setLeagueId}/>

            <div className="flex justify-center">
                <div className="container px-2 rounded-lg shadow">
                </div>
            </div>

        </div>
    )

}

export default LeaguePage