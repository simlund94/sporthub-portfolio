export default function SeasonSelector({ allSeasons, leagueId, setLeagueId }) {
    const currentSeason = allSeasons.find(l => l.id === leagueId)?.season.slug;

    return (
        <>
            <div role="tablist" className="hidden md:tabs md:tabs-border">
                {allSeasons.map(item => (
                    <button
                        key={item.id}
                        role="tab"
                        className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                        onClick={() => setLeagueId(item.id)}
                    > <div role="tablist" className="hidden md:tabs md:tabs-border">
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
            {/* Mobile season chooser */}
            <details className="dropdown md:hidden">
                <summary className="btn m-1">{currentSeason}</summary>
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

                        {item.season.slug}
                    </button>
                ))}
            </div>

            <details className="dropdown md:hidden">
                <summary className="btn m-1">{currentSeason}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {allSeasons.map(item => (
                        <li key={item.id}>
                            <button
                                role="tab"
                                className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                                onClick={() => setLeagueId(item.id)}
                            >
                                {item.season.slug}
                            </button>
                        </li>
                    ))}
                </ul>
            </details>
        </>
    );
}
