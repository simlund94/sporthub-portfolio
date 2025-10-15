import IconFactory from "./icons etc/IconFactory.jsx";

export default function GamesTable({
                                  items = [],
                                  loading = false,
                                  error = null,
                              }) {
    items.forEach((item) => {
        if(item.league.sport.name === "Bowling"){
            items.remove(item)
        }
    })
    if (loading) {
        return (
            <p className="mx-2 text-xl">Laddar <span className="loading loading-dots loading-xl text-warning" /></p>
        );
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">Inga matcher idag</div>;
    }

    return (
        <div className="p-4">
            <div className="container max-w-4xl h-96 px-2 overflow-x-auto rounded-lg shadow">

                {/* Desktop table */}
                <table className="hidden md:table table-zebra w-full table-pin-cols table-pin-rows">
                    <thead>
                    <tr>
                        <th>Sport</th>
                        <th>Liga</th>
                        <th>Hemma</th>
                        <th>Tid</th>
                        <th>Borta</th>
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

                {/* Mobile table */}
                <table className="table table-compact w-full text-xs md:hidden">
                    <thead>
                    <tr>
                        <th>Match</th>
                        <th>Tid</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <span>{item.homeTeam.shortName}</span>
                                    <img
                                        className="w-8 h-8 object-contain"
                                        src={item.homeTeam.logo}
                                        alt={item.homeTeam.abbreviation}
                                    />
                                </div>
                            </td>

                            <td className="text-center text-warning font-semibold">
                                {new Date(item.startDate).toLocaleTimeString("sv-SE", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Europe/Stockholm",
                                })}
                            </td>

                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        className="w-8 h-8 object-contain"
                                        src={item.visitingTeam.logo}
                                        alt={item.visitingTeam.abbreviation}
                                    />
                                    <span>{item.visitingTeam.shortName}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
