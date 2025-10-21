import {useLeagueAllSeasonsById, useLeagueStandingsById, useLeagueWithTeamsById} from "../hooks.js";
import {useEffect, useState} from "react";
import LeagueStandingsTable from "../components/LeagueStandingsTableWithSeasons.jsx";

const LeaguePage = ({initialLeagueId}) => {
    const [leagueId, setLeagueId] = useState(initialLeagueId);

    useEffect(() => {
        setLeagueId(initialLeagueId);
    }, [initialLeagueId]);

    const resultAllSeasons = useLeagueAllSeasonsById(leagueId); // Hämta alla ligans säsonger
    const resultStandings = useLeagueStandingsById(leagueId); // Hämta statistik för rådande liga/säsong

    // Loading screen
    if (resultAllSeasons.loading || !resultAllSeasons.data) return <div>Loading...</div>
    if (resultStandings.loading || !resultStandings.data) return <div>Loading...</div>

    const standings = resultStandings.data.groups[0].standings;
    const allSeasons = resultAllSeasons.data.leagues;
    const leagueName =  resultAllSeasons.data.leagues[0].name;

    // Debugging
    console.log(resultAllSeasons);
    console.log(standings);
    console.log(allSeasons);

    return (
        <div className="p-4">
            <h2 className="text-3xl text-center font-bold my-4 mx-2">{leagueName}</h2>

            <LeagueStandingsTable
                standings={standings}
                allSeasons={allSeasons}
                leagueId={leagueId}
                setLeagueId={setLeagueId}/>

            <div className="flex justify-center">
                <div className="container px-2 rounded-lg shadow">
                </div>
            </div>

        </div>
    )

}

export default LeaguePage