import Hero from "../components/Hero.jsx";
import Table from "../components/GamesTable.jsx";
import {useEvents} from "../hooks.js";
import {useState} from "react";
import GamesTable from "../components/GamesTable.jsx";


export default function HomePage() {

    const currentDate = new Date()
    const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
    console.log('Dagens datum ' + date)
    const [chosenGender, setChosenGender] = useState("ALL")
    const events = useEvents(date, chosenGender)
    return (
        <>
            <Hero/>

            <div className="container mx-auto mt-4 max-w-4xl px-4">
                <h2 className="text-2xl font-bold my-4 mx-2">Dagens matcher:</h2>

                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 ${
                    chosenGender === "ALL" ? "btn-warning" : "btn-outline btn-warning"
                }`}
                    onClick={() => {
                        setChosenGender("ALL")
                    }}
                >
                    Alla
                </button>

                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 ${
                        chosenGender === "MEN" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setChosenGender("MEN")
                    }}
                >
                    Herr
                </button>
                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 ${
                        chosenGender === "WOMEN" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setChosenGender("WOMEN")
                    }}
                >
                    Dam
                </button>


                <GamesTable
                    items={events.data}
                    loading={events.loading}
                    error={events.err}
                />
            </div>
            <div className="container mt-4">
                <p className="text-lg font-bold mt-4 ">
                    NEXT
                </p>

            </div>

        </>
    )
}