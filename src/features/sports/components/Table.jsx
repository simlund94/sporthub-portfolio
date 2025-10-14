import React, {useState} from "react";
import {useEvents} from "../hooks.js";

export default function Table({
    items = [],
    loading = false,
    error = null,
})
{
    if (loading) {
        return <li>Laddar<span className="loading loading-dots loading-xs"/></li>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">No data available</div>;
    }

    return ( <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Events</h1>
            <ul className="text-left space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="border-b py-2">
                        {item.league.name}: {item.homeTeam.name} - {item.visitingTeam.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}