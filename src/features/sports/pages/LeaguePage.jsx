import {useLeagueAllSeasonsById, useLeagueStandingsById} from "../hooks/LeagueHooks.jsx";
import {useEffect, useState} from "react";
import LeagueStandingsTableWithSeasons from "../components/genericComponents/LeagueStandingsTableWithSeasons.jsx";
import GamesTable from "../components/genericComponents/GamesTable.jsx";
import {useEventByLeagueId} from "../hooks/EventHooks.jsx";
import MatchFilter from "../components/genericComponents/GamesFilter.jsx";

const LeaguePage = ({initialLeagueId}) => {
    const [leagueId, setLeagueId] = useState(initialLeagueId);

    useEffect(() => {
        setLeagueId(initialLeagueId);
    }, [initialLeagueId]);

    const resultAllSeasons = useLeagueAllSeasonsById(leagueId); // Hämta alla ligans säsonger
    const resultStandings = useLeagueStandingsById(leagueId); // Hämta statistik för rådande liga/säsong
    const [order, setOrder] = useState("desc");
    const [status, setStatus] = useState("FINISHED");
    const leagueData = useEventByLeagueId(leagueId, status, order);

    const currentYear = new Date().getFullYear().toString();



    // Loading screen
    if (resultAllSeasons.loading || !resultAllSeasons.data) return <div>Loading...</div>
    if (resultStandings.loading || !resultStandings.data) return <div>Loading...</div>

    const standings = resultStandings.data.groups[0].standings;
    const allSeasons = resultAllSeasons.data.leagues;
    const leagueName =  resultAllSeasons.data.leagues[0].name;

    const currentSeason = allSeasons.find(l => l.id === leagueId)?.season.slug;
    const isCurrentSeason = currentSeason?.includes(currentYear);



    return (
        <div className="p-4">

            <h1 className="text-6xl text-center font-bold my-4 mx-2 glass p-12">{leagueName}</h1>
            <div role="tablist" className="hidden md:tabs md:tabs-border">
                {allSeasons.map(item => (
                    <button
                        role="tab"
                        key={item.id}
                        className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                        onClick={() => {
                            setLeagueId(item.id);
                        }}>
                        {item.season.slug}
                    </button>
                ))}
            </div>
            {/* Mobile season chooser */}
            <details className="dropdown md:hidden">
                <summary className="btn m-1">{currentSeason}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {allSeasons.map(item => (
                        <li>
                            <button
                                role="tab"
                                key={item.id}
                                className={`tab ${leagueId === item.id ? "tab-active text-warning" : ""}`}
                                onClick={() => setLeagueId(item.id)}>
                                {item.season.slug}
                            </button>
                        </li>
                    ))}
                </ul>
            </details>


            <MatchFilter
                onChangeStatus={setStatus}
                status={status}
                onChangeOrder={setOrder}
            order={order}/>

                <GamesTable
                    items={leagueData.data}
                    loading={leagueData.loading}
                    showDate= {true}
                    error={leagueData.err}
                    height={"h-94"}
                />

            <div className="divider"/>
            <h1 className="text-4xl mt-10 font-bold my-4 mx-2 glass p-6 ">Tabell: {currentSeason}</h1>
            <div className="container mt-4 mx-auto flex flex-row gap-6">

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <button className="btn btn-warning">Visa tabell</button>
                    <button className="btn btn-warning">Visa skytteliga</button>
                    <button className="btn btn-warning">Visa assist</button>
                    <button className="btn btn-warning">Visa varnings-liga</button>
                    <button className="btn btn-warning">Visa utvisningsliga</button>
                </div>

                <div className="flex-1">
                    <LeagueStandingsTableWithSeasons
                        standings={standings}
                        allSeasons={allSeasons}
                        leagueId={leagueId}
                        setLeagueId={setLeagueId}
                    />
                </div>
            </div>
        </div>
    )

}

export default LeaguePage