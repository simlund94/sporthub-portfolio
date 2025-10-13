import React, {useState} from "react";
import {useLeagues} from "../hooks.js";
import ThemeButton from "./icons etc/ThemeButton.jsx";

import IconFactory from "./icons etc/IconFactory.jsx";


export default function Navbar() {
    const leagueValues = new Map([
        ["fotboll", 10],
        ["floorball", 4],
        ["hockey", 2],
    ]);

    const currentYear = new Date().getFullYear();

    const MENU_ITEMS = [
        {name: "Fotboll", icon: "Soccer", key: "football", leagueKey: "fotboll"},
         {name: "Hockey", icon: "Hockey", key: "hockey", leagueKey: "hockey"},
         {name: "Innebandy", icon: "Floorball", key: "floorball", leagueKey: "floorball"},
    ];

    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (key) => {
        setOpenDropdown((prev) => (prev === key ? null : key));
    };

    const leaguesData = {};
    for (const [key, value] of leagueValues.entries()) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const raw = useLeagues(value, `&activeDate=${currentYear + +(key !== "fotboll" ? 1 : 0)}`);
        leaguesData[key] = raw.data.filter(
            (l) => !/final/i.test(l.name) && !/kval/i.test(l.name)
        );
    }

    const DropdownItem = ({ item, isMobile }) => {

        return (
            <li className="dropdown z-10">
                <details
                    open={openDropdown === item.key}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggle(item.key);
                    }}
                >
                    <summary
                        className={`cursor-pointer container items-center gap-4 pb-2 justify-items-start ${isMobile ? "text-lg" : ""}`}
                        onClick={(e) => {
                            if (isMobile) e.stopPropagation();
                        }}
                    >
                        {item.name}
                        <IconFactory
                            name={item.icon}
                            className={`inline-block ${
                                isMobile ? "w-5 h-5" : "w-8 h-8"
                            } stroke-current shrink-0`}
                        />
                    </summary>

                    <ul className="p-2">

                        {leaguesData[item.leagueKey]?.map((l) => (
                            <li key={l.id}>
              <span>
                {l.name}
                  {l.season && <> ({l.season.startYear}/{l.season.endYear})</>}
              </span>
                            </li>
                        ))}
                        <li key="alla-ligor" className="font-bold">
                            <span>Alla ligor i {item.name} </span>
                        </li>


                    </ul>
                </details>
            </li>
        );
    };


    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* LEFT SIDE */}
            <div className="navbar-start">
                {/* Mobile menu */}
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        onClick={(e) => e.stopPropagation()} // prevent menu from closing when interacting inside
                    >
                        {MENU_ITEMS.map((item) => (
                            <DropdownItem key={item.key} item={item} isMobile/>
                        ))}
                        <li>
                            <ThemeButton/>
                        </li>
                    </ul>
                </div>
                {/* Desktop */}
                <ul className="menu menu-horizontal px-1 hidden lg:flex textarea-md pb-0">
                    {MENU_ITEMS.map((item) => (
                        <DropdownItem key={item.key} item={item}/>
                    ))}
                </ul>
            </div>

            <div className="navbar-center">
                <a className="btn btn-ghost text-4xl">SportHub</a>
            </div>

            <div className="navbar-end hidden lg:flex">
                <ThemeButton/>
            </div>
        </div>
    );
}
