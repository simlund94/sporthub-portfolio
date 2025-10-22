import IconFactory from "../icons etc/IconFactory.jsx";

export default function EventTimeline({ event }) {
    const renderEventLabel = (ev, isHomeTeam) => {
        const minute = ev.minute ? `${ev.minute}'` : "";
        const rowClass = `flex items-center gap-2 ${isHomeTeam ? "flex-row text-left" : "flex-row-reverse text-right"}`;
        const playerTextAlign = isHomeTeam ? "text-left" : "text-right";

        switch (ev.type) {
            case "GOAL":
                return (
                    <div className="flex flex-col">
                        <div className={`${rowClass} font-bold`}>
                            <IconFactory name="goal" className="h-6 w-6" />
                            <span>Mål {ev.count > 1 && `x${ev.count}`} {minute}</span>
                        </div>
                        <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd spelare"}</span>
                    </div>
                );
            case "WARNING":
                return (
                    <div className="flex flex-col">
                        <div className={`${rowClass} text-yellow-300 font-semibold`}>
                            <IconFactory name="yellow-card" className="h-6 w-6" />
                            <span>Gult kort {minute}</span>
                        </div>
                        <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd spelare"}</span>
                    </div>
                );
            case "SECOND_WARNING":
                return (
                    <div className="flex flex-col">
                        <div className={`${rowClass} text-red-600 font-semibold`}>
                            <IconFactory name="red-card" className="h-6 w-6" />
                            <span>Rött kort {minute}</span>
                        </div>
                        <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd spelare"}</span>
                    </div>
                );
            case "SUBSTITUTION":
                return (
                    <div className="flex flex-col">
                        <div className={`${rowClass} font-semibold`}>
                            <IconFactory name="substitution" className="h-6 w-6" />
                            <span>Byte {minute}</span>
                        </div>
                        <span className={`text-sm ${playerTextAlign}`}>
              In: {ev.inPlayer?.name ?? "Okänd"} <br/>
              Ut: {ev.outPlayer?.name ?? "Okänd"}
            </span>
                    </div>
                );
            case "PENALTY":
                return (
                    <div className="flex flex-col">
                        <div className={`${rowClass} font-semibold`}>
                            <span>Straff {minute}</span>
                        </div>
                        <span className={`text-sm ${playerTextAlign}`}>{ev.player?.name ?? "Okänd"}</span>
                    </div>
                );
            default:
                return <div className={rowClass}><span>{ev.type}</span></div>;
        }
    };

    const gameEvents = (event.gameEvents ?? []).slice().sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-6 text-center">Matchhändelser</h2>

            {gameEvents.length === 0 ? (
                <p className="text-center text-gray-500">Inga registrerade matchhändelser</p>
            ) : (
                <>

                <ul className="timeline timeline-vertical ">
                    <IconFactory className={"w-5 h-5 text-center mx-auto"} name = "wistle"/>
                    <span className="text-center mx-auto text-gray-600 text-sm">Matchstart</span>
                    {gameEvents.map((ev, i) => {
                        const isHomeTeam = ev.team?.id === event.homeTeam.id;
                        const teamLogo = ev.team?.logo ?? (isHomeTeam ? event.homeTeam.logo : event.visitingTeam.logo);
                        const teamName = ev.team?.name ?? (isHomeTeam ? event.homeTeam.name : event.visitingTeam.name);

                        return (
                            <li key={i}>
                                {i !== 0 && <hr />}
                                {/* Flip the row based on home/away */}
                                <div className={`timeline-box ${isHomeTeam ? "timeline-start" : "timeline-end"} bg-base-200 shadow-md w-full`}>
                                    <div className={`flex ${isHomeTeam ? "flex-row" : "flex-row-reverse"} items-center gap-2`}>
                                        <img src={teamLogo} alt={teamName} className="w-8 h-8 object-contain" />
                                        <div className="flex flex-col">
                                            {renderEventLabel(ev, isHomeTeam)}
                                            <p className="text-xs text-gray-500 mt-1">{teamName}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </li>
                        );
                    })}
                </ul>
                </>
            )}
        </div>
    );
}
