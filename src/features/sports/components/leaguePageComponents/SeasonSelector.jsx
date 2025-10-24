import {useLeagueAllSeasonsById} from "../../hooks/LeagueHooks.jsx";

export default function SeasonSelector({leagueId, setLeagueId}) {
    const {data: seasonData, loading, err} = useLeagueAllSeasonsById(leagueId);
    const seasons = seasonData?.allSeasons || [];

    if (loading) return <span className="loading loading-dots loading-sm text-warning my-2 "></span>;
    if (err) return <div className="text-red-500">Fel ladda säsonger</div>;
    if (!seasons.length) return <div>Inga säsonger tillgängliga</div>;

    const currentSeason = seasons.find(s => s.id === leagueId)?.slug || seasons[0].slug;

    return (
        <div className="my-2">
            <span className="md:hidden text-sm font-bold">Välj säsong:</span>
            <details className="dropdown dropdown-center md:hidden">

                <summary className="btn m-3 btn-outline px-8">{currentSeason}</summary>
                <ul className="menu dropdown-content bg-base-200 shadow-sm w-52 p-2 ">
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

            <div role="tablist" className="hidden md:tabs md:tabs-border">
                {seasons.map(season => (
                    <button
                        role="tab"
                        key={season.id}
                        className={`tab ${leagueId === season.id ? "tab-active text-warning" : ""}`}
                        onClick={() => {
                            setLeagueId(season.id);
                        }}>
                        {season.slug}
                    </button>
                ))}
            </div>
        </div>
    );
}
