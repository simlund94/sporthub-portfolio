import {useEffect, useState} from "react";
import {SportsApi} from "../api.jsx";
import {delay, MOCK, pickList, USE_MOCK} from "../MockData.js";

export function useEvents(date, gender) {
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
                    const res = await SportsApi.events(date, gender); // kan vara {sports:[...]} eller [...]
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
    }, [date, gender]);

    return {data, loading, err};
}

export function useEventId(id) {
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
                    if (!live) return;
                    setData(MOCK.eventsById[id]); // or whichever mock matches
                } else {
                    const res = await SportsApi.eventsById(id);
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