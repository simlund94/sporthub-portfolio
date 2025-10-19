import {useNavigate, useParams} from "react-router-dom";
import {useTeamEvents, useTeamId, useTeamStandings} from "../hooks.js";
import {useState} from "react";
import GamesTable from "../components/GamesTable.jsx";
import StandingsTable from "../components/StandningsTable.jsx";
import IconFactory from "../components/icons etc/IconFactory.jsx";



export default function TeamPage() {
    const { id } = useParams();
    const { data, loading, err } = useTeamId(id);
    const team = data?.team
    const [status, setStatus] = useState("FINISHED")
    const events =  useTeamEvents(id, status)
    const leagues = useTeamStandings(id);
    console.log(leagues.leagues)
    const navigate = useNavigate();





    if (loading) return (<div className="max-w-3xl mx-auto flex flex-col min-h-screen space-y-4 p-4">
            <div className="skeleton h-96 w-full rounded-lg"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
            <div className="skeleton h-62 w-full rounded-md"></div>
        </div>
    );
    if (err) return <p className="text-red-500">Error loading team</p>;
    if (!team) return <p>No team found</p>;

    return (
        <>
            <div className="p-4 max-w-3xl mx-auto">
                <a className="link cursor-pointer" onClick={() => navigate(-1)}>
                    Tillbaka
                </a>
                <div className="flex justify-around items-center">
                    <div className="flex flex-col items-center">
                        <img src={team.logo} className="w-30 h-30 object-contain" alt={team.name}/>
                        <span className="text-3xl font-bold text-center mb-4">{team.name}</span>
                        <span className="text-xl font-bold text-center mb-4">{team.teamClass === "WOMEN" ? "Dam" :"Herr"}</span>
                        <IconFactory name="arena" className="h-8 w-8"/>
                        <span className="text-3xl font-bold text-center mb-4">{team.arena?.name ?? "Okänd"}</span>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-4 max-w-4xl px-4">
                <StandingsTable leagues={leagues.leagues}
                                loading={leagues.loading}
                                error = {leagues.error}
                                currentTeamId={team.id} />

<p></p>
                <h2 className="text-2xl font-bold my-4 mx-2">Matcher:</h2>

                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 ${
                        status === "FINISHED" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setStatus("FINISHED")
                    }}
                >
                    Senaste matcher
                </button>

                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 ${
                        status === "UPCOMING" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setStatus("UPCOMING")
                    }}
                >
                    Kommande Matcher
                </button>



                <GamesTable
                    items={events.data}
                    loading={events.loading}
                    error={events.err}
                    showDate={true}
                />
            </div>
        </>


)

}
