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
        <h2 className="text-2xl font-bold mb-4 mx-10">Senaste matcherna från de högsta ligorna:</h2>
                <button
                    type = "button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        setChosenGender("MEN")
                    }}
                >
                    MEN
                </button>
                <button
                    type = "button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        setChosenGender("WOMEN")
                    }}
                >
                    WOMEN
                </button>
                <Table
                    items={events.data}
                    loading={events.loading}
                    error={events.err}
                />

            </>
    )
    }