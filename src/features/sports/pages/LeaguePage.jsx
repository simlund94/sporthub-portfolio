import {useParams} from "react-router-dom";
import {useLeaguesId} from "../hooks.js";

export default function LeaguePage() {
    const { leagueId } = useParams();
    const league = useLeaguesId(leagueId);
    console.log(league);


    if (league.loading) return <p>Laddar...</p>;
    if (league.err) return <p>Något gick fel: {league.err.message}</p>;

    return (
        <div>
            <h1>{league.name}</h1>
            <p>ID: {league.id}</p>
            <p>Säsong: {league.season?.startYear}–{league.season?.endYear}</p>
        </div>
    );
}