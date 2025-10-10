// src/features/sports/hooks.js
import {useEffect, useState} from 'react';
import {SportsApi} from './api';

// 1) Växla mock/live här:
//    - sätt till 'true' för mock
//    - eller styr via env: VITE_USE_MOCK=true
const USE_MOCK = (import.meta.env?.VITE_USE_MOCK ?? 'true') === 'false';

// 2) Mock-data (justera fritt)
const MOCK = {
    sports: [
        {id: 10, name: 'Fotboll'},
        {id: 2, name: 'Ishockey'},
        {id: 4, name: 'Innebandy'},
    ],
    leaguesBySport: {
        10: [
            {id: 124439, name: 'Allsvenskan'},
            {id: 123935, name: 'Damallsvenskan'},
        ],
        2: [{id: 125472, name: 'SHL'},
            {id: 125554, name: 'SDHL'}],
        4: [{id: 121413, name: 'Superligan'}],
    },
    teamsByLeague: {
        124439: [{id: 9367, name: 'AIK'}, {id: 9368, name: 'Djurgården'}],
        123935: [{id: 3, name: 'AIK DFF'}],
        125472: [{id: 1171, name: 'Brynäs IF'}, {id: 6, name: 'Färjestad'}],
        121413: [{id: 14392, name: 'IBF Falun'}, {id: 14563, name: 'Storvreta'}],
    },
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Hjälp: plocka alltid ut en array ur ett API-svar
function pickList(res, field) {
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res[field])) return res[field];
    return [];
}

export function useSports() {
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
                    const res = await SportsApi.sports(); // kan vara {sports:[...]} eller [...]
                    if (!live) return;
                    setData(pickList(res, 'sports'));
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

export function useLeagues(sportId) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        if (!sportId) {
            setData([]);
            setErr(null);
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
                    const res = await SportsApi.leaguesBySport(sportId); // svar: { metadata, leagues: [...] }
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
    }, [sportId]);

    return {data, loading, err};
}

export function useTeams(leagueId) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let live = true;
        if (!leagueId) {
            setData([]);
            setErr(null);
            setLoading(false);
            return;
        }
        (async () => {
            try {
                setLoading(true);
                if (USE_MOCK) {
                    await delay(150);
                    if (!live) return;
                    setData(MOCK.teamsByLeague[leagueId] ?? []);
                } else {
                    const res = await SportsApi.teamsByLeague(leagueId); // { metadata, teams: [...] }
                    if (!live) return;
                    setData(pickList(res, 'teams'));
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
