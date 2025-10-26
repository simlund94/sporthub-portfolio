import {useEffect, useState} from "react";
import {SportsApi} from "../api.jsx";
import {delay, MOCK, pickList, USE_MOCK} from "../MockData.js";

/**
 * Retrieves all available information about a specified team by teamId
 * @param id
 * @returns {{data: unknown, loading: boolean, err: unknown}}
 */
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
    }, [id]);

    return {data, loading, err};
}

/**
 * Retrieve all events with a certain status from a specified teamId and descending dates.
 * @param teamId
 * @param status
 * @returns {{data: *[], loading: boolean, err: unknown}}
 */
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

/**
 * Retrieves an array of all available teams from the api
 * @returns {{data: *[], loading: boolean, err: unknown}}
 */
export function useAllTeams() {
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
                    setData(pickList(res, "teams"));
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

/**
 * Retrieves all leagues from a sportId with a set gender and startDate descending
 * @param sportId
 * @param gender
 * @returns {{data: *[], loading: boolean, err: unknown}}
 */
export function useLeaguesBySportAndGender(sportId, gender) {
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
                    const res = await SportsApi.allLeaguesBySportAndGender(sportId, gender); // kan vara {sports:[...]} eller [...]
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
    }, [sportId, gender]);
    return {data, loading, err};
}