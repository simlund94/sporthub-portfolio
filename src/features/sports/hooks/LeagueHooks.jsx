import {useEffect, useState} from 'react';
import {SportsApi} from '../api.jsx';
import {USE_MOCK, MOCK, delay, pickList} from '../MockData.js';

export function useLeaguesWithSportIdAndQuery(sportId, query) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        if (!sportId) {
            setData([]);
            setErr(true);
            setLoading(false);
            return;
        }
        (async () => {
            try {
                setLoading(true);
                if (USE_MOCK) {
                    await delay(150);
                    if (!live) return;
                    setData(MOCK.leaguesBySport[sportId] ?? []);
                } else {
                    const res = await SportsApi.leaguesBySport(sportId, query);
                    if (!live) return;
                    setData(pickList(res, 'leagues'));
                }
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => {
            live = false;
        };
    }, [sportId, query]);

    return {data, loading, err};
}

export function useAllLeagues() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                if (USE_MOCK) {
                    await delay(150);
                } else {
                    const res = await SportsApi.allLeagues();
                    if (!live) return;
                    setData(pickList(res, 'leagues'));
                }
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => {
            live = false;
        };
    }, []);

    return {data, loading, err};
}

export function useLeaguesId(id) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                if (USE_MOCK) {
                    await delay(150);
                    if (!live) return;
                    setData(MOCK.sports);
                } else {
                    const res = await SportsApi.leagueById(id); // kan vara {sports:[...]} eller [...]
                    if (!live) return;
                    setData(pickList(res, 'leagues'));
                }
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => {
            live = false;
        };
    }, [id]);

    return {data, loading, err};
}


/**
 * Returns a season for a league by its unique id, with all teams in the league during that season.
 *
 * @param leagueId the unique season league id
 * @returns {{data: unknown, loading: boolean, err: unknown}}
 */
export function useLeagueWithTeamsById(leagueId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        if (!leagueId) {
            setData([]);
            setErr(true);
            setLoading(false);
            return;
        }
        (async () => {
            try {
                setLoading(true);
                if (USE_MOCK) {
                    await delay(150);
                    if (!live) return;
                    setData(MOCK.leaguesBySport[leagueId] ?? []);
                } else {
                    const res = await SportsApi.leagueWithTeamsById(leagueId);
                    if (!live) return;
                    console.log("Resultat av hämtning", res);
                    setData(res);
                }
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        })();
        return () => {
            live = false;
        };
    }, [leagueId]);
    return {data, loading, err};
}

/**
 * Returns a list of ALL seasons for a league by providing the unique league season id for ANY season in that league.
 *
 * @param leagueId the unique league season id
 * @returns {{data: unknown, loading: boolean, err: unknown}}
 */
export function useLeagueAllSeasonsById(leagueId) {
    const [data, setData] = useState({leagueName: "", allSeasons: []});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setData({leagueName: "", allSeasons: []});
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchSeasons = async () => {
            try {
                setLoading(true);
                const res = await SportsApi.leagueAllSeasonsById(leagueId);

                if (!live) return;

                const leaguesArray = res.leagues || [];
                const leagueName = leaguesArray[0]?.name || "Okänd liga";
                const allSeasons = leaguesArray.map(l => ({
                    id: l.id,
                    slug: l.season?.slug,
                    startDate: l.season?.startDate,
                    endDate: l.season?.endDate,
                }));
                console.log("AllSeasons", allSeasons);
                console.log("LeagueName", leagueName);
                setData({leagueName, allSeasons});


            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchSeasons();

        return () => {
            live = false;
        };
    }, [leagueId]);

    return {data, loading, err};
}


export function useLeagueStandingsById(leagueId) {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setStandings([]);
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchStandings = async () => {
            try {
                setLoading(true);
                const res = await SportsApi.leagueStandingsById(leagueId);
                if (!live) return;

                const standingsArray = res?.groups?.[0]?.standings || [];
                setStandings(standingsArray);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchStandings();

        return () => {
            live = false;
        };
    }, [leagueId]);

    return {data: standings, loading, err};
}

export function useScoringLeadersById(leagueId) {
    const [scoringLeaders, setScoringLeaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setScoringLeaders([]);
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchScoringLeaders = async () => {
            try {
                setLoading(true);
                setErr(null);

                const res = await SportsApi.leagueScoringLeadersById(leagueId);
                if (!live) return;

                console.log("scoringLeaders from API", res);

                // ✅ Normalize data structure
                let normalizedData = [];

                if (Array.isArray(res)) {
                    normalizedData = res;
                } else if (res?.playerStats && Array.isArray(res.playerStats)) {
                    normalizedData = res.playerStats;
                } else if (res?.data && Array.isArray(res.data)) {
                    normalizedData = res.data;
                }

                setScoringLeaders(normalizedData);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchScoringLeaders();

        return () => {
            live = false;
        };
    }, [leagueId]);

    return {data: scoringLeaders, loading, err};
}

export function useAssistLeadersById(leagueId) {
    const [scoringLeaders, setScoringLeaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setScoringLeaders([]);
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchScoringLeaders = async () => {
            try {
                setLoading(true);
                setErr(null);

                const res = await SportsApi.leagueAssistLeadersById(leagueId);
                if (!live) return;

                console.log("scoringLeaders from API", res);
                let normalizedData = [];

                if (Array.isArray(res)) {
                    normalizedData = res;
                } else if (res?.playerStats && Array.isArray(res.playerStats)) {
                    normalizedData = res.playerStats;
                } else if (res?.data && Array.isArray(res.data)) {
                    normalizedData = res.data;
                }

                setScoringLeaders(normalizedData);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchScoringLeaders();

        return () => {
            live = false;
        };
    }, [leagueId]);

    return {data: scoringLeaders, loading, err};
}


export function useLeagueByIdWithEvents(leagueId, status = "ALL", fromDate, toDate) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setEvents([]);
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchEvents = async () => {
            try {
                setLoading(true);
                const res = await SportsApi.leagueByIdWithEvents(leagueId, status, fromDate, toDate);
                if (!live) return;

                // adapt to your API response shape — this assumes res.events or res.data
                const eventsArray = res?.events || res?.data || [];
                setEvents(eventsArray);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchEvents();

        return () => {
            live = false;
        };
    }, [leagueId, status, fromDate, toDate]);

    return {data: events, loading, err};
}

export function useLeagueByIdLastFiveGames(leagueId, teamId) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId || !teamId) {
            setGames([]);
            setErr("Missing leagueId or teamId");
            return;
        }

        let live = true;

        const fetchLastFive = async () => {
            try {
                setLoading(true);

                const res = await SportsApi.leagueByIdLastFiveGames(
                    leagueId,
                    "FINISHED",
                    teamId
                );

                if (!live) return;

                const events = res?.events || [];
                const sortedEvents = events
                    .filter(ev => ev.status === "FINISHED")
                    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                    .slice(0, 5); // limit to last 5

                setGames(sortedEvents);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchLastFive();

        return () => {
            live = false;
        };
    }, [leagueId, teamId]);

    return {data: games, loading, err};
}


export function useTeamsByLeagueId(leagueId) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setTeams([]);
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchTeams = async () => {
            try {
                setLoading(true);
                const res = await SportsApi.teamsByLeagueId(leagueId);

                if (!live) return;

                // The API might return { teams: [...] } or a plain array — handle both
                const teamList = res?.teams || res || [];
                setTeams(teamList);
            } catch (e) {
                if (live) setErr(e);
            } finally {
                if (live) setLoading(false);
            }
        };

        fetchTeams();

        return () => {
            live = false;
        };
    }, [leagueId]);

    return {data: teams, loading, err};
}


export function useTeamFormsByLeagueId(leagueId, teams) {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!leagueId || !teams?.length) return;

        let active = true;
        setLoading(true);
        setError(null);

        const fetchForms = async () => {
            try {
                const results = await Promise.all(
                    teams.map(async (team) => {
                        const teamId = team.id;

                        const res = await SportsApi.leagueByIdLastFiveGames(
                            leagueId,
                            "FINISHED",
                            teamId
                        );

                        const matches = res?.events || [];

                        const sorted = matches
                            .filter((ev) => ev.status === "FINISHED")
                            .sort(
                                (a, b) =>
                                    new Date(b.startDate) - new Date(a.startDate)
                            )
                            .slice(0, 5);

                        // Compute V/O/F JSX spans
                        const form = sorted.map((ev) => {
                            const isHome = ev.homeTeam?.id === teamId;
                            const homeScore = ev.homeTeamScore ?? 0;
                            const awayScore = ev.visitingTeamScore ?? 0;

                            if (homeScore === awayScore) {
                                return <span className="text-gray-500">O</span>;
                            }
                            if (
                                (isHome && homeScore > awayScore) ||
                                (!isHome && awayScore > homeScore)
                            ) {
                                return <span className="text-green-500">V</span>;
                            }
                            return <span className="text-red-500">F</span>;
                        });

                        return {teamId, form};
                    })
                );

                const formMap = Object.fromEntries(
                    results.map((r) => [r.teamId, r.form])
                );

                if (active) setFormData(formMap);
            } catch (err) {
                console.error("Error fetching team forms:", err);
                if (active) setError(err);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchForms();

        return () => {
            active = false;
        };
    }, [leagueId, teams]);

    return {data: formData, loading, error};
}

