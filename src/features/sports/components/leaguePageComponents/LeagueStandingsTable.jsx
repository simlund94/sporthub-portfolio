/**
 *Klass som visar liga ställningen för en angiven liga via {leagueId}
 *
 */


import {useNavigate} from "react-router-dom";
import {
    useLeagueByIdWithEvents,
    useLeagueStandingsById,
    useTeamsByLeagueId,
    useTeamFormsByLeagueId
} from "../../hooks/LeagueHooks.jsx";


const LeagueStandingsTable = ({leagueId}) => {
    const navigate = useNavigate();

    // --- League standings ---
    const {data, loading, err} = useLeagueStandingsById(leagueId);

    // --- Set for current date and range for upcoming matches ---
    const today = new Date();
    const laterDate = new Date(today);
    laterDate.setDate(today.getDate() + 14);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const fromDate = formatDate(today);
    const toDate = formatDate(laterDate);

    const {
        data: eventsData,
        loading: eventsLoading,
        err: eventsError,
    } = useLeagueByIdWithEvents(leagueId, "UPCOMING", fromDate, toDate);

    // --- All team ids ---
    const {
        data: teams,
        loading: teamsLoading,
        err: teamsErr,
    } = useTeamsByLeagueId(leagueId);

    const {
        data: formData,
        loading: formLoading,
        error: formError,
    } = useTeamFormsByLeagueId(leagueId, teams);


    // --- Loading states ---
    if (loading || teamsLoading || formLoading || eventsLoading) {
        return (
            <>
                {Array.from({length: 6}).map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full mt-2 rounded-md"></div>
                ))}
            </>
        );
    }

    if (err || teamsErr || eventsError || formError) {
        return <div>Error loading league standings</div>;
    }


    if (err || teamsErr || eventsError) {
        return <div>Error loading league standings</div>;
    }

    // --- Render table for bigger screens---
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
                {data.map((teamItem) => {
                    const teamId = teamItem.team.id;

                    // --- Upcoming match logic ---
                    const teamEvents =
                        eventsData?.filter(
                            (ev) =>
                                ev.homeTeam?.id === teamId ||
                                ev.visitingTeam?.id === teamId
                        ) || [];

                    const upcomingGames = teamEvents.filter(
                        (ev) => ev.status === "UPCOMING"
                    );
                    const nextMatch =
                        upcomingGames.length > 0 ? upcomingGames[0] : null;

                    let opponent = null;
                    if (nextMatch) {
                        const isHomeTeam = nextMatch.homeTeam?.id === teamId;
                        opponent = isHomeTeam
                            ? nextMatch.visitingTeam
                            : nextMatch.homeTeam;
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

                    // --- Form for this team ---
                    const form = formData[teamId] || [];

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
                                <span className="text-2xl">
                                        {teamItem.team.name}
                                    </span>
                            </td>
                            <td>{teamItem.stats.find((t) => t.name === "gp")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "w")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "d")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "l")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "gf")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "ga")?.value}</td>
                            <td>{teamItem.stats.find((t) => t.name === "gd")?.value}</td>
                            <td className="text-warning text-sm font-bold">
                                {teamItem.stats.find((t) => t.name === "pts")?.value}
                            </td>
                            <td className="text-center font-bold text-sm whitespace-nowrap">
                                {form.length > 0 ? form.slice().reverse().map((item, idx) => (
                                    <span key={idx} className="mr-1">
                                 {item}
                            </span>
                                )) : "-"}
                            </td>
                            <td className="flex justify-center">{nextMatchLogo}</td>
                        </tr>
                    );
                })}
                </tbody>


            </table>

            {/* Mobile table
            tog bort gjorda mål, insläppta mål och lag form
            för att bättre få plats på en mindre skärm*/}

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
                        <th>+/-</th>
                        <th>TP</th>
                        <th>Nästa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(teamItem => {
                        const teamId = teamItem.team.id;

                        // --- Upcoming match logic ---
                        const teamEvents =
                            eventsData?.filter(
                                (ev) =>
                                    ev.homeTeam?.id === teamId ||
                                    ev.visitingTeam?.id === teamId
                            ) || [];

                        const upcomingGames = teamEvents.filter(
                            (ev) => ev.status === "UPCOMING"
                        );
                        const nextMatch =
                            upcomingGames.length > 0 ? upcomingGames[0] : null;

                        let opponent = null;
                        if (nextMatch) {
                            const isHomeTeam = nextMatch.homeTeam?.id === teamId;
                            opponent = isHomeTeam
                                ? nextMatch.visitingTeam
                                : nextMatch.homeTeam;
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
                            <tr key={teamId} className="cursor-pointer hover:bg-base-200"
                                onClick={() => navigate(`/team/${teamId}`)}>
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
                                <td>{teamItem.stats.find(t => t.name === "gd")?.value}</td>
                                <td className="text-warning text-sm font-bold">{teamItem.stats.find(t => t.name === "pts")?.value}</td>
                                <td className="flex justify-center">{nextMatchLogo}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default LeagueStandingsTable;
