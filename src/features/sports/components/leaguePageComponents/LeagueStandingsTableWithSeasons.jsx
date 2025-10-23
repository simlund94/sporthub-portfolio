import {useNavigate} from "react-router-dom";
import {useLeagueByIdWithEvents, useLeagueStandingsById} from "../../hooks/LeagueHooks.jsx";

const LeagueStandingsTableWithSeasons = ({leagueId}) => {
    const navigate = useNavigate();

    const {data, loading, err} = useLeagueStandingsById(leagueId);
    const {fixData} = useLeagueByIdWithEvents(leagueId);

    if (loading) return (
        <>
            <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
            <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
            <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
            <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
            <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
            <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
        </>
    );
    if (err) return <div>Error loading standings</div>;


    return (
        <div>
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
                    <th>Form</th>
                    <th>Nästa</th>
                </tr>
                </thead>
                <tbody>
                {data.map(teamItem => {
                    const teamId = teamItem.team.id;

                    // Get all matches involving this team
                    const teamEvents = fixData?.events?.filter(
                        ev =>
                            ev.homeTeam?.id === teamId ||
                            ev.visitingTeam?.id === teamId
                    ) || [];

                    // Separate finished and upcoming games
                    const finishedGames = teamEvents.filter(ev => ev.status === "FINISHED");
                    const upcomingGames = teamEvents.filter(ev => ev.status === "UPCOMING");

                    // --- FORM (last 5 finished games) ---
                    const lastFive = finishedGames.slice(-5);
                    const form = lastFive.map(ev => {
                        const isHome = ev.homeTeam.id === teamId;
                        const homeScore = ev.homeTeamScore ?? 0;
                        const awayScore = ev.visitingTeamScore ?? 0;

                        if (homeScore === awayScore) return "D";
                        if ((isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore))
                            return "W";
                        return "L";
                    }).join(" ");

                    const nextMatch = upcomingGames.length > 0 ? upcomingGames[0] : null;
                    const nextMatchLabel = nextMatch
                        ? `${nextMatch.homeTeam.name} vs ${nextMatch.visitingTeam.logos.small}`
                        : "-";

                    return (
                        <tr key={teamId} className="cursor-pointer hover:bg-base-200"
                            onClick={() => navigate(`/team/${teamId}`)}>
                            <td>{teamItem.position}</td>
                            <td className="flex items-center gap-4">
                                <img className="w-8 h-8 object-contain"
                                     src={teamItem.team.logo}
                                     alt={`${teamItem.team.name} logo`}/>
                                <span className="text-2xl">{teamItem.team.name}</span>
                            </td>
                            <td>{teamItem.stats.find(t => t.name === "gp")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "w")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "d")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "l")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "gf")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "ga")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "gd")?.value}</td>
                            <td className="text-warning text-sm font-bold">
                                {teamItem.stats.find(t => t.name === "pts")?.value}
                            </td>
                            <td>{form}</td>
                            <td>{nextMatchLabel}</td>
                        </tr>
                    );
                })}
                </tbody>


            </table>

            {/* Mobile table */}
            <div className="overflow-x-auto md:hidden">
                <table className="table mx-auto table-zebra w-full">
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
                    {data.map(teamItem => (
                        <tr key={teamItem.team.id} className="cursor-pointer hover:bg-base-200"
                            onClick={() => navigate(`/team/${teamItem.team.id}`)}>
                            <td>{teamItem.position}</td>
                            <td className="flex items-center gap-4">
                                <img className="w-8 h-8 object-contain" src={teamItem.team.logo}
                                     alt={`${teamItem.team.name} logo`}/>
                                <span>{teamItem.team.name}</span>
                            </td>
                            <td>{teamItem.stats.find(t => t.name === "gp")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "w")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "d")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "l")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "gf")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "ga")?.value}</td>
                            <td>{teamItem.stats.find(t => t.name === "gd")?.value}</td>
                            <td className="text-warning text-sm font-bold">{teamItem.stats.find(t => t.name === "pts")?.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeagueStandingsTableWithSeasons;
