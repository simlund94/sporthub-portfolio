import {useNavigate} from "react-router-dom";

const LeagueStandingsTableWithSeasons = ({standings, allSeasons, leagueId, setLeagueId}) => {
    console.log(allSeasons);
    const navigate = useNavigate();

    return (
        <div>
            {/* Desktop table */}
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

            {/* Mobile */}
            <details className="dropdown">
                <summary className="btn m-1">{}</summary>
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

            <table className="table mx-auto table-zebra w-full table-pin-cols table-pin-rows md:hidden">
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
                            <span>{teamItem.team.name}</span>
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
    )
}

export default LeagueStandingsTableWithSeasons