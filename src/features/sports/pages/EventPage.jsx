import {useLocation, useParams} from "react-router-dom";
import {useEventId} from "../hooks";
import IconFactory from "../components/icons etc/IconFactory.jsx";
import Divider from "daisyui/components/divider/index.js";

export default function EventPage() {
    const { id } = useParams();
    console.log("ID i URL:",id);
    const { data, loading, err } = useEventId(id);
    const event = data?.event;

    if (loading) return (<div className="max-w-3xl mx-auto flex flex-col min-h-screen space-y-4 p-4">
            <div className="skeleton h-96 w-full rounded-lg"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
        </div>
    );
    if (err) return <p className="text-red-500">Error loading event</p>;
    if (!event) return <p>No event found</p>;

    const RenderScoreBasedOnStatus = () => {
        switch (event.status) {
            case "FINISHED":
                return <p className="text-6xl font-bold">{event.homeTeamScore} - {event.visitingTeamScore}</p>;
            case "ONGOING":
                return <p className="text-6xl font-bold">Matchen spelas fortfarande</p>;
            case "UPCOMING":
                return <p className="text-4xl font-bold">{new Date(event.startDate).toLocaleString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",

                    timeZone: "Europe/Stockholm",
                })}</p>;
            default:
                return null;
        }
    };
    const EventDetails = () => {
        if (!event) return null;
        console.log("Events", event.gameEvents);
        const gameEvents = event.gameEvents ?? [];


        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-3 text-center">Matchhändelser</h2>

                {gameEvents.length === 0 ? (
                    <p className="text-center text-gray-500">Inga registrerade matchhändelser</p>
                ) : (
                    <ul className="space-y-2">
                        {gameEvents.map((ev, i) => (
                            <li
                                key={i}
                                className="flex items-center justify-between bg-base-200 p-2 rounded shadow-sm"
                            >


                                <div className="flex flex-col">
                                    <img src={ev.team?.logo} className="w-10 h-10 object-contain"
                                         alt={ev.team?.name}/>
                                <span className="font-bold">
                                   {ev.type === "GOAL" ? "Mål" : ev.type}  {ev.count == 1 ? "": 'x' + ev.count}
                                </span>
                                    <span className="text-md">

                                    {ev.player?.name ?? "Okänd spelare"}
                                </span>
                                </div>
                                <div className="text-right">
                                    <span className="font-medium">{ev.team?.name ?? "Okänt lag"}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };




    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">
                {event.homeTeam.name} vs {event.visitingTeam.name}
            </h1>
            <p className="text-center text-lg mb-2">{event.league.name}</p>
            <p className="text-center text-lg mb-2"> Omgång: {event.round ?? "Okänd"}</p>
            <p className="text-center text-warning mb-4">
                {new Date(event.startDate).toLocaleString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                    timeZone: "Europe/Stockholm",
                })}
            </p>

            <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                    <img src={event.homeTeam.logo} className="w-20 h-20 object-contain" alt={event.homeTeam.name}/>
                    <span>{event.homeTeam.name}</span>
                </div>
                <RenderScoreBasedOnStatus/>
                <div className="flex flex-col items-center">
                    <img src={event.visitingTeam.logo} className="w-20 h-20 object-contain"
                         alt={event.visitingTeam.name}/>
                    <span>{event.visitingTeam.name}</span>
                </div>
            </div>
            <ul className="flex flex-col items-center justify-center space-y-2 p-2 list-none">
                <li className="flex items-center gap-2">
                    <IconFactory name="arena" className="h-8 w-8"/>
                    <span>{event.facts?.arena?.name ?? "Okänd"}</span>
                </li>
                <li className="flex items-center gap-2">
                    <IconFactory name="åskådare" className="h-8 w-8"/>
                    <span>Åskådare: {event.facts?.spectators ?? "Okänd"}</span>
                </li>
                <li className="flex items-center gap-2">
                </li>
            </ul>
            <div className="divider">Matchfakta</div>
                    <EventDetails />
        </div>
    );
}
