import {useLocation, useParams} from "react-router-dom";
import {useEventId} from "../hooks";
import IconFactory from "../components/icons etc/IconFactory.jsx";
import Divider from "daisyui/components/divider/index.js";

export default function EventPage() {
    const location = useLocation();


    const eventFromState = location.state?.event;
    //Hämtar endast om det inte finns redan från state.
    const shouldFetch = !eventFromState;
    const {data: eventFetched, loading, error} = useEventId(location.state.id);

    const event = eventFromState || eventFetched;

    if (loading && shouldFetch) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error loading event</p>;
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

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">
                {event.homeTeam.name} vs {event.visitingTeam.name}
            </h1>
            <p className="text-center text-lg mb-2">{event.league.name}</p>
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
                    <IconFactory name="arena" className="h-8 w-8" />
                    <span>{event.facts?.arena?.name ?? "Okänd"}</span>
                </li>
                <li className="text-sm text-center">
                    Åskådare: {event.facts?.spectators ?? "Okänd"}
                </li>
            </ul>



        </div>
);
}
