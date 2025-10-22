import IconFactory from "../icons etc/IconFactory.jsx";
import {useNavigate} from "react-router-dom";

export default function GamesTable({
                                       items = [],
                                       loading = false,
                                       error = null,
                                       showDate = false,
                                   }) {

    const navigate = useNavigate();

    console.log("GamesTableItems: ",items);



    if (loading) {
        return (
            <div className="container max-w-4xl h-96 px-2 rounded-lg ">

                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>
                <div className="skeleton h-16 w-full mt-2 rounded-md"></div>

            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">Inga matcher idag</div>;
    }

    items = items.filter(item => item.league.sport.name !== "Bowling");

    const RenderScoreOrTimeBasedOnEventStatus = (item) => {
        switch (item.item.status) {
            case "FINISHED":
                return <p className="text-sm font-bold">{item.item.homeTeamScore} - {item.item.visitingTeamScore}</p>;
            case "ONGOING":
                return <p className="text-sm font-bold">Matchen spelas fortfarande</p>;
            case "UPCOMING": {
                const date = new Date(item.item.startDate);

                const formatted = showDate
                    ? date.toLocaleString("sv-SE", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Europe/Stockholm",
                    })
                    : date.toLocaleTimeString("sv-SE", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Europe/Stockholm",
                    });

                return <p className="text-sm font-bold">{formatted}</p>;
            }
        }
    };

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
                        <th>Tid/Resultat</th>
                        <th>Borta</th>
                        <th>Arena</th>
                        <th>Datum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-base-300 cursor-pointer"
                            onClick={() => navigate(`/event/${item.id}`)}
                        >
                            <td className="text-center">
                                <IconFactory name={item.league.sport.name} className="h-5 w-5 mx-auto"/>
                            </td>
                            <td>{item.league.name}</td>
                            <td className="flex items-center gap-2">
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.homeTeam.logos.small}
                                    alt={`${item.homeTeam.name} logo`}
                                />
                                <span className="float-right">{item.homeTeam.name}</span>
                            </td>
                            <td className="text-center text-warning font-semibold">
                                <RenderScoreOrTimeBasedOnEventStatus item={item}/>
                            </td>

                            <td className="flex items-center gap-2">
                                <span>{item.visitingTeam.name}</span>
                                <img
                                    className="w-6 h-6 object-contain"
                                    src={item.visitingTeam.logos.small}
                                    alt={`${item.visitingTeam.name} logo`}
                                />
                            </td>
                            <td>{item.facts?.arena?.name ?? "Okänd arena"}</td>
                            <td><span>
  {new Date(item.startDate).toLocaleString("sv-SE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Stockholm"
  })}
</span>

                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>

                {/* Mobile table */}
                <table className="table table-compact w-full text-xs md:hidden">
                    <thead>
                    <tr>
                        <th>Match</th>
                        <th>Tid/Resultat</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-base-300 cursor-pointer"
                            onClick={() => navigate(`/event/${item.id}`)}
                        >
                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <span>{item.homeTeam.shortName}</span>
                                    <img
                                        className="w-8 h-8 object-contain"
                                        src={item.homeTeam.logos.small}
                                        alt={item.homeTeam.abbreviation}
                                    />
                                </div>
                            </td>

                            <td className="text-center text-warning font-semibold">
                                <RenderScoreOrTimeBasedOnEventStatus item={item}/>
                            </td>

                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        className="w-8 h-8 object-contain"
                                        src={item.visitingTeam.logos.small}
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
