import {useEffect, useState} from "react";
import {SportsApi} from "../api.jsx";
import {delay, MOCK, pickList, USE_MOCK} from "../MockData.js";

export function useTeamId(id) {
    const [data, setData] = useState(null); // <-- null, not []
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        (async () => {
            try {
                setLoading(true);
                if (USE_MOCK) {
                    await delay(150);
                    //if (!live) return;
                    //setData(MOCK.teamById[id]); // or whichever mock matches
                } else {
                    const res = await SportsApi.teamById(id);
                    if (!live) return;
                    setData(res); // store the object directly
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

export function useTeamStandings(teamId) {
    const [leaguesData, setLeaguesData] = useState([]);  // full league objects with standings
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!teamId) return;

        let live = true;

        (async () => {
            try {
                setLoading(true);
                setErr(null);

                let res;

                if (USE_MOCK) {
                    await delay(150);
                    if (!live) return;
                    res = MOCK.standings;
                } else {
                    res = await SportsApi.teamStandings(teamId);
                }

                if (!live) return;

                const leagues = res.data?.leagues || res.leagues || [];
                const processedLeagues = leagues.map(league => {
                    const standingsArray = [];

                    (league.groups || []).forEach(group => {
                        if (Array.isArray(group.standings)) {
                            standingsArray.push(...group.standings);
                        }
                    });

                    return {
                        ...league,
                        standings: standingsArray
                    };
                });
                setLeaguesData(processedLeagues);

            } catch (e) {
                if (live) setErr(e.message || "Unknown error");
            } finally {
                if (live) setLoading(false);
            }
        })();

        return () => {
            live = false;
        };
    }, [teamId]);

    return { leagues: leaguesData, loading, err };
}






export function useTeamEvents(teamId, status) {
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
                    const res = await SportsApi.eventsByTeam(teamId, status)
                    if (!live) return;
                    setData(pickList(res, 'events'));
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
    }, [teamId, status]);

    return {data, loading, err};
}

export function useAllTeams(){
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
                    const res = await SportsApi.allTeams();
                    if (!live) return;
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
    }, []);

    return {data, loading, err};
}