import React, { useState, useEffect, useRef } from "react";
import ThemeButton from "../icons etc/ThemeButton.jsx";
import IconFactory from "../icons etc/IconFactory.jsx";
import { Link } from "react-router-dom";
import SPORTS from "../../../../config.js";
import SearchComponent from "./SearchComponent.jsx";
import Button from "daisyui/components/button/index.js";

export default function Navbar({ leaguesData, errors, loading }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (openDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [openDropdown]);

    const handleToggle = (key) => {
        setOpenDropdown((prev) => (prev === key ? null : key));
    };

    function formatLeaguePath(leagueName) {
        return leagueName.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase();
    }

    const themeComponent = <ThemeButton />;

    const DropdownItem = ({ item, isMobile }) => {
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
                            className={`inline-block ${isMobile ? "w-4 h-4" : "w-8 h-8"} stroke-current shrink-0`}
                        />
                    </summary>

                    <ul ref={dropdownRef} className="p-2">
                        {loading && (
                            <li>
                                Laddar<span className="loading loading-dots loading-xs" />
                            </li>
                        )}
                        {error && <li className="text-red-500">Error loading leagues</li>}
                        {!loading &&
                            !error &&
                            leagues.map((l) => (
                                <li key={l.id}>
                                    <Link to={`/league/${formatLeaguePath(l.name)}/${l.teamClass.toLowerCase()}`}>
                                        {l.name}{" "}
                                        {l.name.includes("Superligan")
                                            ? l.teamClass.includes("WOMEN")
                                                ? "(Dam)"
                                                : "(Herr)"
                                            : ""}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </details>
            </li>
        );
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start flex items-center gap-2">
                {/* Mobile hamburger menu */}
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {SPORTS.map((item) => (
                            <DropdownItem key={item.key} item={item} isMobile />
                        ))}
                        <li className="text-lg font-bold">
                            <button
                                onClick={() => {
                                    document.getElementById("searchModal").showModal();
                                }}
                            >
                                Sök på lag/ligor
                            </button>
                        </li>
                        <li>{themeComponent}</li>
                    </ul>
                </div>

                {/* Desktop menu */}
                <ul className="menu menu-horizontal flex-nowrap px-1 hidden lg:flex textarea-md pb-0">
                    {SPORTS.map((item) => (
                        <DropdownItem key={item.key} item={item} />
                    ))}
                </ul>
            </div>

            {/* Center logo */}
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost text-4xl text-center items-center">
                    SportHub
                </Link>
            </div>

            {/* Right side */}
            <div className="navbar-end flex items-center">
                {/* Search (mobile + desktop) */}
                <div className="lg:hidden mr-4">
                    <button
                        className="btn btn-ghost "
                        onClick={() => document.getElementById("searchModal").showModal()}
                    >
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>

                    </button>
                        <IconFactory name="search" className="w-6 h-6" />
                </div>

                <div className="hidden lg:flex">
                    <SearchComponent />
                    {themeComponent}
                </div>
            </div>

            {/* Search modal for mobile */}
            <dialog id="searchModal" className="modal modal-top">
                <div className="modal-box overflow-visible">
                    <div className="flex items-center gap-2">
                        <SearchComponent />
                        <form method="dialog">
                            <button className="btn btn-warning">Stäng</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    );
}
