import IconFactory from "./icons etc/IconFactory.jsx";

export default function Table({
                                  items = [],
                                  loading = false,
                                  error = null,
                              }) {
    if (loading) {return (<li>Laddar<span className="loading loading-dots loading-xs" /></li>);
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">No data available</div>;
    }

    return (
        <div className="p-4">
            <div className="container max-w-3xl px-2 overflow-x-auto rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                    <tr>
                        <th>Sport</th>
                        <th>League</th>
                        <th>Match</th>
                        <th>Starttid</th>
                        <th>Arena</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <IconFactory name={item.league.sport.name} className="h-5 w-5" />
                            </td>
                            <td>{item.league.name}</td>
                            <td className="flex items-center gap-2">
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.homeTeam.logo}
                                    alt={`${item.homeTeam.name} logo`}
                                />
                                <span>{item.homeTeam.name}</span>
                                <span>-</span>
                                <span>{item.visitingTeam.name}</span>
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.visitingTeam.logo}
                                    alt={`${item.visitingTeam.name} logo`}
                                />
                            </td>
                            <td>
                                {new Date(item.startDate).toLocaleTimeString("sv-SE", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Europe/Stockholm",
                                })}
                            </td>
                            <td>{item.facts?.arena?.name ?? "Okänd arena"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
