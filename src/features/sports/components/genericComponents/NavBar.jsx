import React, { useState, useEffect, useRef } from "react";
import ThemeButton from "../icons etc/ThemeButton.jsx";
import IconFactory from "../icons etc/IconFactory.jsx";
import { Link } from "react-router-dom";
import SPORTS from "../../../../config.js";
import SearchComponent from "./SearchComponent.jsx";
import DropdownItem from "./DropdownItem.jsx";

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

    const themeComponent = <ThemeButton />;

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
                            <DropdownItem
                                key={item.key}
                                item={item}
                                leagues={leaguesData[item.leagueKey]}
                                error={errors[item.leagueKey]}
                                loading={loading}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                                isMobile
                            />
                        ))}
                        <li className="text-lg font-bold">
                            <button onClick={() => document.getElementById("searchModal").showModal()}>
                                Sök på lag/ligor
                            </button>
                        </li>
                        <li>{themeComponent}</li>
                    </ul>
                </div>

                {/* Desktop menu */}
                <ul className="menu menu-horizontal flex-nowrap px-1 hidden lg:flex textarea-md pb-0">
                    {SPORTS.map((item) => (
                        <DropdownItem
                            key={item.key}
                            item={item}
                            leagues={leaguesData[item.leagueKey]}
                            error={errors[item.leagueKey]}
                            loading={loading}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
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
                <div className="lg:hidden mr-4">
                    <button
                        className="btn btn-ghost"
                        onClick={() => document.getElementById("searchModal").showModal()}
                    >
                        <svg
                            className="h-5 w-5"
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
