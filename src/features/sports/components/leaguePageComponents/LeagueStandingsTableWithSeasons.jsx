import {useNavigate} from "react-router-dom";
import {
    useLeagueByIdWithEvents,
    useLeagueStandingsById,
    useTeamsByLeagueId
} from "../../hooks/LeagueHooks.jsx";
import {useEffect, useState} from "react";
import {SportsApi} from "../../api.jsx";

const LeagueStandingsTableWithSeasons = ({leagueId}) => {
    const navigate = useNavigate();

    // --- League standings ---
    const {data, loading, err} = useLeagueStandingsById(leagueId);

    // --- Calculate date range for upcoming matches ---
    const today = new Date();
    const laterDate = new Date(today);
    laterDate.setDate(today.getDate() + 14);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const fromDate = formatDate(today);
    const toDate = formatDate(laterDate);

    // --- Upcoming matches ---
    const {
        data: eventsData,
        loading: eventsLoading,
        err: eventsError,
    } = useLeagueByIdWithEvents(leagueId, "UPCOMING", fromDate, toDate);

    // --- All teams in league ---
    const {
        data: teams,
        loading: teamsLoading,
        err: teamsErr,
    } = useTeamsByLeagueId(leagueId);

    // --- Form data for each team ---
    const [formData, setFormData] = useState({}); // { [teamId]: ["V", "O", "F", ...] }
    const [formLoading, setFormLoading] = useState(false);

    // Fetch last 5 games for each team (parallel)
    useEffect(() => {
        if (!leagueId || !teams?.length) return;

        let active = true;
        setFormLoading(true);

        const fetchForms = async () => {
            try {
                // Fetch all teams’ last 5 games in parallel
                const results = await Promise.all(
                    teams.map(async (team) => {
                        const teamId = team.id;

                        const res = await SportsApi.leagueByIdLastFiveGames(
                            leagueId,
                            "FINISHED",
                            teamId
                        );

                        const matches = res?.events || [];

                        // Sort by date descending, keep latest 5
                        const sorted = matches
                            .filter((ev) => ev.status === "FINISHED")
                            .sort(
                                (a, b) =>
                                    new Date(b.startDate) - new Date(a.startDate)
                            )
                            .slice(0, 5);

                        // Compute V/O/F
                        const form = sorted.map((ev) => {
                            const isHome = ev.homeTeam?.id === teamId;
                            const homeScore = ev.homeTeamScore ?? 0;
                            const awayScore = ev.visitingTeamScore ?? 0;

                            if (homeScore === awayScore) {
                                return <span className="text-gray-500">O</span>;
                            }
                            if ((isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore)) {
                                return <span className="text-green-500">V</span>;
                            }
                            return <span className="text-red-500">F</span>;
                        });


                        return {teamId, form};
                    })
                );

                // Convert array into object for easier access
                const formMap = Object.fromEntries(
                    results.map((r) => [r.teamId, r.form])
                );

                if (active) setFormData(formMap);
            } catch (e) {
                console.error("Error fetching team forms:", e);
            } finally {
                if (active) setFormLoading(false);
            }
        };

        fetchForms();

        return () => {
            active = false;
        };
    }, [leagueId, teams]);

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

    if (err || teamsErr || eventsError) {
        return <div>Error loading league standings</div>;
    }

    // --- Render table ---
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

                            {/* --- FORM --- */}
                            <td className="text-center font-bold text-sm whitespace-nowrap">
                                {form.length > 0 ? form.slice().reverse().map((item, idx) => (
                                    <span key={idx} className="mr-1">
                                 {item}
                            </span>
                                )) : "-"}
                            </td>


                            {/* --- NEXT MATCH --- */}
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
