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
                    setData(pickList(res, 'League'));
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


export function useLeagueByIdLastFiveGames(leagueId) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!leagueId) {
            setGames([]);
            setErr("No leagueId provided");
            return;
        }

        let live = true;

        const fetchLastFive = async () => {
            try {
                setLoading(true);

                // Step 1: fetch all finished events for this league
                const allFinished = await SportsApi.leagueByIdWithEvents(leagueId, "FINISHED");
                const events = allFinished?.events || [];

                // Step 2: collect unique round numbers
                const rounds = [...new Set(events.map(ev => ev.round))].filter(Boolean);

                // Step 3: sort rounds descending (latest first)
                const sortedRounds = rounds.sort((a, b) => b - a);

                // Step 4: get latest 5
                const latestFiveRounds = sortedRounds.slice(0, 5);

                // Step 5: join them into a comma-separated string for API
                const roundString = latestFiveRounds.join(",");

                // Step 6: fetch only those rounds
                const res = await SportsApi.leagueByIdLastFiveGames(leagueId, "FINISHED", roundString);

                if (!live) return;
                const lastFiveGames = res?.events || [];
                setGames(lastFiveGames);
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
    }, [leagueId]);

    return { data: games, loading, err };
}


