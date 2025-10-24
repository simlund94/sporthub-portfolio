
import { useNavigate } from "react-router-dom";
import { useLeagueStandingsById } from "../../hooks/LeagueHooks.jsx";

const LeagueStandingsTableWithSeasons = ({ leagueId }) => {
    const navigate = useNavigate();

    const { data, loading, err } = useLeagueStandingsById(leagueId);

    if (loading) return (
        <>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-16 w-full mt-2 rounded-md"></div>
            ))}
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
                </tr>
                </thead>
                <tbody>
                {data.map(teamItem => (
                    <tr key={teamItem.team.id} className="cursor-pointer hover:bg-base-200" onClick={() => navigate(`/team/${teamItem.team.id}`)}>
                        <td>{teamItem.position}</td>
                        <td className="flex items-center gap-4">
                            <img className="w-8 h-8 object-contain" src={teamItem.team.logo} alt={`${teamItem.team.name} logo`} />
                            <span className="text-2xl">{teamItem.team.name}</span>
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
                        <tr key={teamItem.team.id} className="cursor-pointer hover:bg-base-200" onClick={() => navigate(`/team/${teamItem.team.id}`)}>
                            <td>{teamItem.position}</td>
                            <td className="flex items-center gap-4">
                                <img className="w-8 h-8 object-contain" src={teamItem.team.logo} alt={`${teamItem.team.name} logo`} />
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
