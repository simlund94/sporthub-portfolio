import IconFactory from "../icons etc/IconFactory.jsx";

export default function EventStats({ event }) {
    const shotsDisplay = () => {
        if (!event?.facts?.shots) return null;
        const [home, away] = event.facts.shots.split(" ")[0].split("-").map(Number);
        const total = home + away;

        return (
            <>
                <li className="flex items-center">Antal skott</li>
                <li className="flex items-center">
                    <span className="font-semibold text-sm">{home}</span>
                    <progress className="progress progress-current w-56" value={home} max={total}></progress>
                    <span className="font-semibold text-sm">{away}</span>
                </li>
            </>
        );
    };

    return (
        <ul className="flex flex-col items-center justify-center space-y-2 p-2 list-none">
            {shotsDisplay()}
            <li className="flex items-center gap-2">
                <IconFactory name="arena" className="h-8 w-8" />
                <span>{event.facts?.arena?.name ?? "Okänd"}</span>
            </li>
            <li className="flex items-center gap-2">
                <IconFactory name="åskådare" className="h-8 w-8" />
                <span>Åskådare: {event.facts?.spectators ?? "Okänd"}</span>
            </li>
        </ul>
    );
}
