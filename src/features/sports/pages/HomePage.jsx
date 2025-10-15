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
                <h2 className="text-2xl font-bold my-4 mx-6">Dagens matcher:</h2>
                <button
                    type="button"
                    className="btn btn-warning mr-4 ml-5"
                    onClick={() => {
                        setChosenGender("MEN")
                    }}
                >
                    MEN
                </button>
                <button
                    type="button"
                    className="btn btn-warning mr-4"
                    onClick={() => {
                        setChosenGender("WOMEN")
                    }}
                >
                    WOMEN
                </button>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                        setChosenGender("ALL")
                    }}
                >
                    ALL
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