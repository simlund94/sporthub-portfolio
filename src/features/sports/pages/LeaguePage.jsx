import {useState, useEffect} from "react";
import LeagueStandingsTableWithSeasons from "../components/leaguePageComponents/LeagueStandingsTableWithSeasons.jsx";
import GamesTable from "../components/genericComponents/GamesTable.jsx";
import MatchFilter from "../components/genericComponents/GamesFilter.jsx";
import SeasonSelector from "../components/leaguePageComponents/SeasonSelector.jsx";
import ShowDiffrentTablesSelector from "../components/leaguePageComponents/ShowDiffrentTablesSelector.jsx";

import {useLeagueAllSeasonsById, useLeagueStandingsById} from "../hooks/LeagueHooks.jsx";
import {useEventByLeagueId} from "../hooks/EventHooks.jsx";


const LeaguePage = ({initialLeagueId}) => {
    const [leagueId, setLeagueId] = useState(initialLeagueId);
    const [status, setStatus] = useState("FINISHED");
    const [order, setOrder] = useState("desc");

    useEffect(() => {
        setLeagueId(initialLeagueId);
    }, [initialLeagueId]);

    const {data: seasonData, loading: seasonsLoading, err: seasonsErr} = useLeagueAllSeasonsById(leagueId);
    const {data: standings, loading: standingsLoading, err: standingsErr} = useLeagueStandingsById(leagueId);
    const eventData = useEventByLeagueId(leagueId, status, order);

    const currentSeason = seasonData.allSeasons?.find(s => s.id === leagueId)?.slug || seasonData.allSeasons?.[0]?.slug;

    return (
        <div className="p-4">
            <h1 className="text-6xl text-center font-bold my-4 mx-2 glass p-12">{seasonData.leagueName || "Loading league..."}</h1>

            <SeasonSelector
                allSeasons={seasonData.allSeasons}
                leagueId={leagueId}
                setLeagueId={setLeagueId}
                loading={seasonsLoading}
                error={seasonsErr}
            />

            <MatchFilter
                status={status}
                order={order}
                onChangeStatus={setStatus}
                onChangeOrder={setOrder}
                currentSeason={currentSeason}
            />

            <GamesTable
                items={eventData.data}
                loading={eventData.loading}
                error={eventData.err}
                showDate
                height="h-94"
            />

            <div className="divider"/>
            <h1 className="text-4xl mt-10 font-bold my-4 mx-2 glass p-6">Tabell: {currentSeason}</h1>
            <div className="container mt-4 mx-auto flex flex-row gap-6">
                <ShowDiffrentTablesSelector/>

                <div className="flex-1">
                    <LeagueStandingsTableWithSeasons
                        standings={standings}
                        loading={standingsLoading}
                        error={standingsErr}
                        leagueId={leagueId}
                        setLeagueId={setLeagueId}
                    />

                </div>
            </div>
        </div>
    );
};

export default LeaguePage;
