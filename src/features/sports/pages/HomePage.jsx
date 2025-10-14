import Hero from "../components/Hero.jsx";
import Table from "../components/Table.jsx";
import {useEvents} from "../hooks.js";
import {useState} from "react";


export default function HomePage() {

    const currentDate = new Date()
    const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
    console.log('Dagens datum ' + date)
    const [chosenGender, setChosenGender] = useState("MEN")
    const events = useEvents(date, chosenGender)
    return (
        <>
            <Hero/>

            <div className="container mx-auto mt-4 max-w-4xl px-4">
                <h2 className="text-2xl font-bold mt-4 mx-6">Dagens matcher:</h2>
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
                    className="btn btn-warning"
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

                <Table
                    items={events.data}
                    loading={events.loading}
                    error={events.err}
                />
            </div>

        </>
    )
}