import {useNavigate} from "react-router-dom";
import {useLeagueByIdLastFiveGames, useLeagueByIdWithEvents, useLeagueStandingsById} from "../../hooks/LeagueHooks.jsx";

const LeagueStandingsTableWithSeasons = ({leagueId}) => {
    const navigate = useNavigate();

    const {data, loading, err} = useLeagueStandingsById(leagueId);
// Calculate date range
    const today = new Date();
    const laterDate = new Date(today);
    laterDate.setDate(today.getDate() + 14);

// Format as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split("T")[0];

    const fromDate = formatDate(today);
    const toDate = formatDate(laterDate);

    const {data: eventsData, loading: eventsLoading, err: eventsError} =
        useLeagueByIdWithEvents(leagueId, "UPCOMING", fromDate, toDate);

    const { data: lastFiveGames, loading: lastFiveLoading, err: lastFiveErr } = useLeagueByIdLastFiveGames(leagueId);



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

                    // --- Get all matches involving this team (from eventsData for upcoming) ---
                    const teamEvents = eventsData?.filter(
                        ev => ev.homeTeam?.id === teamId || ev.visitingTeam?.id === teamId
                    ) || [];

                    // --- Get finished games for this team (from lastFiveGames) ---
                    const finishedGames = eventsData?.filter(
                        ev => ev.homeTeam?.id === teamId || ev.visitingTeam?.id === teamId
                    ) || [];

                    // Sort finished games by date (descending = latest first)
                    const sortedFinished = [...finishedGames].sort(
                        (a, b) => new Date(b.startDate) - new Date(a.startDate)
                    );

                    // Take last 5 only
                    const recentFive = sortedFinished.slice(0, 5);

                    // --- Calculate FORM (V = Win, O = Draw, F = Loss) ---
                    const form = recentFive.map(ev => {
                        const isHome = ev.homeTeam?.id === teamId;
                        const homePts = ev.homeTeamPoints ?? 0;
                        const awayPts = ev.visitingTeamPoints ?? 0;

                        if (homePts === awayPts) return "O"; // draw
                        if (isHome && homePts > awayPts) return "V"; // home win
                        if (!isHome && awayPts > homePts) return "V"; // away win
                        return "F"; // otherwise, loss
                    });

                    // --- Next Match (UPCOMING) ---
                    const upcomingGames = teamEvents.filter(ev => ev.status === "UPCOMING");
                    const nextMatch = upcomingGames.length > 0 ? upcomingGames[0] : null;

                    // Determine team side (Home/Visiting)
                    let opponent = null;
                    if (nextMatch) {
                        const isHomeTeam = nextMatch.homeTeam?.id === teamId;
                        opponent = isHomeTeam ? nextMatch.visitingTeam : nextMatch.homeTeam;
                    }

                    const nextMatchLogo = opponent?.logo ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={opponent.logo}
                                alt={`${opponent.name} logo`}
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                    ) : (
                        "-"
                    );

                    return (
                        <tr
                            key={teamId}
                            className="cursor-pointer hover:bg-base-200"
                            onClick={() => navigate(`/team/${teamId}`)}
                        >
                            <td>{teamItem.position}</td>
                            <td className="flex items-center gap-4">
                                <img
                                    className="w-8 h-8 object-contain"
                                    src={teamItem.team.logo}
                                    alt={`${teamItem.team.name} logo`}
                                />
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

                            <td className="text-center font-bold">
                                {form.length > 0 ? form.join(" ") : "-"}
                            </td>

                            {/* ✅ NEXT MATCH column */}
                            <td className="flex justify-center">{nextMatchLogo}</td>
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
