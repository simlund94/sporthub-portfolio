import IconFactory from "./icons etc/IconFactory.jsx";

export default function Table({
                                  items = [],
                                  loading = false,
                                  error = null,
                              }) {
    if (loading) {
        return (
            <li>
                Laddar<span className="loading loading-dots loading-xs" />
            </li>
        );
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">No data available</div>;
    }

    return (
        <div className="p-4">
            <div className="container max-w-4xl h-96 px-2 overflow-x-auto rounded-lg shadow">

                {/* Desktop table */}
                <table className="hidden md:table table-zebra w-full table-pin-cols table-pin-rows">
                    <thead>
                    <tr>
                        <th>Sport</th>
                        <th>League</th>
                        <th>Home</th>
                        <th>Time</th>
                        <th>Away</th>
                        <th>Arena</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">
                                <IconFactory name={item.league.sport.name} className="h-5 w-5 mx-auto" />
                            </td>
                            <td>{item.league.name}</td>
                            <td className="flex items-center gap-2">
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.homeTeam.logo}
                                    alt={`${item.homeTeam.name} logo`}
                                />
                                <span>{item.homeTeam.name}</span>
                            </td>
                            <td className="text-center text-warning font-semibold">
                                {new Date(item.startDate).toLocaleTimeString("sv-SE", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Europe/Stockholm",
                                })}
                            </td>
                            <td className="flex items-center gap-2">
                                <span>{item.visitingTeam.name}</span>
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.visitingTeam.logo}
                                    alt={`${item.visitingTeam.name} logo`}
                                />
                            </td>
                            <td>{item.facts?.arena?.name ?? "Okänd arena"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Mobile table (logos + time only) */}
                <table className="table table-compact w-full text-xs md:hidden">
                    <thead>
                    <tr>
                        <th>Match</th>

                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="flex items-center justify-center gap-2">
                                {item.homeTeam.shortName}
                                <img
                                    className="w-8 h-8 object-contain"
                                    src={item.homeTeam.logo}
                                    alt={item.homeTeam.abbreviation}
                                />
                                <td className="text-center text-warning font-semibold">
                                    {new Date(item.startDate).toLocaleTimeString("sv-SE", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Europe/Stockholm",
                                    })}
                                </td>
                                <img
                                    className="w-8 h-8 object-contain"
                                    src={item.visitingTeam.logo}
                                    alt={item.visitingTeam.abbreviation}
                                />
                                {item.visitingTeam.shortName}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
