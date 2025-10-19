import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAllTeams, useAllLeagues } from "../hooks.js"; // make sure this exists

export default function SearchComponent() {
    const {
        data: teamData,
        loading: teamsLoading,
        error: teamsError,
    } = useAllTeams();

    const {
        data: leagueData,
        loading: leaguesLoading,
        error: leaguesError,
    } = useAllLeagues();

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const allTeams = Array.isArray(teamData?.teams) ? teamData.teams : [];

    const loading = teamsLoading || leaguesLoading;
    const error = teamsError || leaguesError;

    const results = useMemo(() => {
        if (!query.trim()) return { teams: [], leagues: [] };
        const lower = query.toLowerCase();

        const filteredTeams = allTeams.filter((t) =>
            t.name?.toLowerCase().includes(lower)
        );

        const filteredLeagues = leagueData.filter((l) =>
            l.name?.toLowerCase().includes(lower)
        );

        return { teams: filteredTeams, leagues: filteredLeagues };
    }, [query, allTeams, leagueData]);

    const handleSelect = (type, id) => {
        setQuery("");
        if (type === "team") navigate(`/team/${id}`);
        else if (type === "league") navigate(`/league/${id}`);
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Search input */}
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    placeholder="Sök lag eller liga..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                />
            </label>

            {/* Results dropdown */}
            {query.length >= 3 && (
                <div className="absolute mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg w-full z-50">
                    {loading && (
                        <div className="p-2 text-sm text-center text-gray-500">
                            Laddar resultat...
                            <span className="loading loading-dots loading-xs ml-1" />
                        </div>
                    )}

                    {error && (
                        <div className="p-2 text-sm text-red-500">
                            {error || "Kunde inte hämta data"}
                        </div>
                    )}

                    {!loading && !error && results.teams.length === 0 && results.leagues.length === 0 && (
                        <div className="p-2 text-sm text-gray-500">
                            Inga resultat hittades
                        </div>
                    )}

                    {!loading && !error && (
                        <ul className="max-h-60 overflow-y-auto divide-y divide-base-300">
                            {/* Leagues */}
                            {results.leagues.length > 0 && (
                                <>
                                    <li className="px-3 py-1 text-xs font-bold text-gray-500">
                                        Ligor
                                    </li>
                                    {results.leagues.map((league) => (
                                        <li
                                            key={`league-${league.id}`}
                                            onClick={() => handleSelect("league", league.id)}
                                            className="p-2 hover:bg-base-200 cursor-pointer"
                                        >
                                            {league.name} <span className="textarea-sm text-warning">{league.season.startYear}/{league.season.endYear}</span>
                                        </li>
                                    ))}
                                </>
                            )}
                            {results.teams.length > 0 && (
                                <>
                                    <li className="px-3 py-1 text-xs font-bold text-gray-500">
                                        Lag
                                    </li>
                                    {results.teams.map((team) => (
                                        <li
                                            key={`team-${team.id}`}
                                            onClick={() => handleSelect("team", team.id)}
                                            className="p-2 flex items-center gap-2 hover:bg-base-200 cursor-pointer transition-colors"
                                        >
                                            {team.logo && (
                                                <img
                                                    src={team.logo}
                                                    alt={team.name}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            )}
                                            <span>
                                                {team.name}{" "}
                                                <span className="text-gray-500 text-xs">
                                                    ({team.teamClass === "MEN" ? "Herr" : "Dam"})
                                                </span>
                                            </span>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
