import {useLeagueAllSeasonsById, useLeagueStandingsById, useLeagueWithTeamsById} from "../hooks.js";
import {useEffect, useState} from "react";

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

    // Debugging
    console.log(resultAllSeasons);
    console.log(standings);
    console.log(allSeasons);

    return (
        <div className="p-4">
            <h2 className="text-3xl text-center font-bold my-4 mx-2">{leagueName}</h2>

            <div className="flex justify-center">
                <div className="container px-2 rounded-lg shadow">

                    <div role="tablist" className="tabs tabs-border">
                        {allSeasons.map(item => (
                            <button
                                role="tab"
                                key={item.id}
                                className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                                onClick={() => setLeagueId(item.id)}>
                                {item.season.slug}
                            </button>
                        ))}
                    </div>

                    {/* Desktop table */}
                    {/*TODO För modularisering kan allt här under flyttas ut till en component */}
                    <table className="hidden md:table mx-auto table-zebra w-full table-pin-cols table-pin-rows">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Lag</th>
                            <th>M</th>
                            <th>V</th>
                            <th>O</th>
                            <th>F</th>
                            <th>GM</th>
                            <th>IM</th>
                            <th>+/-</th>
                            <th>TP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {standings.map((teamItem) => (
                            <tr>
                                <td>{teamItem.position}</td>
                                <td className="flex items-center gap-4">
                                    <img
                                        className="w-8 h-8 object-contain"
                                        src={teamItem.team.logo}
                                        alt={`${teamItem.team.name} logo`}
                                    />
                                    <span className={"text-2xl"}>{teamItem.team.name}</span>
                                </td>
                                <td>{teamItem.stats.find(t => t.name === "gp").value}</td>
                                <td>{teamItem.stats.find(t => t.name === "w").value}</td>
                                <td>{teamItem.stats.find(t => t.name === "d").value}</td>
                                <td>{teamItem.stats.find(t => t.name === "l").value}</td>
                                <td>{teamItem.stats.find(t => t.name === "gf").value}</td>
                                <td>{teamItem.stats.find(t => t.name === "ga").value}</td>
                                <td>{teamItem.stats.find(t => t.name === "gd").value}</td>
                                <td className="text-warning text-sm font-bold">{teamItem.stats.find(t => t.name === "pts").value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )

}

export default LeaguePage