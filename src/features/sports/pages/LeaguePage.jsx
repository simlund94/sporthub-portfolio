import {useLeague} from "../hooks.js";

const LeaguePage = ({leagueId}) => {
    const result = useLeague(leagueId);
    if (result.loading || !result.data) return <div>Loading...</div>; // Måste vara först, annars upplev en värld av smärta

    const leagueData = result.data.league;
    return (
        <div>
            <h2 className="text-3xl font-bold my-4 mx-2">{leagueData.name}</h2>
        </div>
    )
}

export default LeaguePage;