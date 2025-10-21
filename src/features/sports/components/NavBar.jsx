import React, {useState} from "react";
import {useLeaguesWithSportIdAndQuery} from "../hooks/LeagueHooks.jsx";
import ThemeButton from "./icons etc/ThemeButton.jsx";
import IconFactory from "./icons etc/IconFactory.jsx";
import {Link} from "react-router-dom";
import SPORTS from "../../../config.js";
import SearchComponent from "./SearchComponent.jsx";

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (key) => {
        setOpenDropdown((prev) => (prev === key ? null : key));
    };

    const currentYear = new Date().getFullYear();
    const leagueResults = SPORTS.map((sport) => useLeaguesWithSportIdAndQuery(sport.sportId, `&activeDate=${currentYear + sport.activeYearOffset}`));
    const leaguesData = {};
    const errors = {};
    let loading = false;
    SPORTS.forEach((sport, index) => {
        const result = leagueResults[index];
        leaguesData[sport.leagueKey] = result.data?.filter(l => !/final|kval/i.test(l.name)) || [];
        errors[sport.leagueKey] = result.error;
        loading = loading || result.loading;
    });

    const DropdownItem = ({item, isMobile}) => {
        const leagues = leaguesData[item.leagueKey];
        const error = errors[item.leagueKey];

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
                            className={`inline-block ${isMobile ? "w-5 h-5" : "w-8 h-8"} stroke-current shrink-0`}
                        />
                    </summary>

                    <ul className="p-2">
                        {loading && <li>Laddar<span className="loading loading-dots loading-xs"/></li>}
                        {error && <li className="text-red-500">Error loading leagues</li>}
                        {!loading && !error && leagues.map((l) => (
                            <li key={l.id}>
                                <Link to={`/league/${l.name.toLowerCase()}/${l.teamClass.toLowerCase()}`}>
                                    {l.name} {l.name.includes("Superligan") ?
                                    (l.teamClass.includes("WOMEN") ? "(Dam)" : "(Herr)") : ""}
                                </Link>
                            </li>
                        ))}
                        <li key="alla-ligor" className="font-bold">
                            <span>Alla ligor i {item.name}</span>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {SPORTS.map((item) => (
                            <DropdownItem key={item.key} item={item} isMobile/>
                        ))}
                        <li>
                            <SearchComponent/>
                        </li>
                        <li>
                            <ThemeButton/>
                        </li>

                    </ul>
                </div>

                {/* Desktop menu */}
                <ul className="menu menu-horizontal flex-nowrap px-1 hidden lg:flex textarea-md pb-0">
                    {SPORTS.map((item) => (
                        <DropdownItem key={item.key} item={item}/>
                    ))}
                </ul>
            </div>

            <div className="navbar-center">
                <Link to={"/"} className="btn btn-ghost text-4xl">SportHub</Link>
            </div>

            <div className="navbar-end hidden lg:flex">
                <SearchComponent/>
                <ThemeButton/>
            </div>
        </div>
    );
}
