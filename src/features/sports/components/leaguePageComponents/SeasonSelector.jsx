import { useLeagueAllSeasonsById } from "../../hooks/LeagueHooks.jsx";

export default function SeasonSelector({ leagueId, setLeagueId }) {
    const { data: seasonData, loading, err } = useLeagueAllSeasonsById(leagueId);
    const seasons = seasonData?.allSeasons || [];

    if (loading) return <div className="skeleton h-10 w-48 my-2" />;
    if (err) return <div className="text-red-500">Fel ladda säsonger</div>;
    if (!seasons.length) return <div>Inga säsonger tillgängliga</div>;

    const currentSeason = seasons.find(s => s.id === leagueId)?.slug || seasons[0].slug;

    return (
        <div className="my-2">
            <details className="dropdown md:hidden">
                <summary className="btn m-1">{currentSeason}</summary>
                <ul className="menu dropdown-content bg-base-100 shadow-sm w-52 p-2">
                    {seasons.map(season => (
                        <li key={season.id}>
                            <button
                                className={`tab ${leagueId === season.id ? "tab-active text-warning" : ""}`}
                                onClick={() => setLeagueId(season.id)}
                            >
                                {season.slug}
                            </button>
                        </li>
                    ))}
                </ul>
            </details>

            <div className="hidden md:flex gap-2">
                {seasons.map(season => (
                    <button
                        key={season.id}
                        className={`btn ${leagueId === season.id ? "btn-warning" : "btn-outline"}`}
                        onClick={() => setLeagueId(season.id)}
                    >
                        {season.slug}
                    </button>
                ))}
            </div>
        </div>
    );
}
