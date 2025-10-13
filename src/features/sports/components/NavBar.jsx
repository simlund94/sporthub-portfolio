import React, {useState} from "react";
import {useLeagues} from "../hooks.js";

export default function Navbar() {
    const leagueValues = new Map();
    leagueValues.set("fotboll", 10);
    leagueValues.set("floorball", 4);
    leagueValues.set("hockey", 2);
    const currentYear = new Date().getFullYear();

    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (menuName) => {
        setOpenDropdown((prev) => (prev === menuName ? null : menuName));
    };

    const footballLeaguesRaw = useLeagues(leagueValues.get("fotboll"), "&activeDate=" + currentYear);
    const footballLeagues = footballLeaguesRaw.data.filter((item) => !/final/i.test(item.name) && !/kval/i.test(item.name));

    const floorballLeaguesRaw = useLeagues(leagueValues.get("floorball"), "&activeDate=" + (currentYear + 1));
    const floorballLeagues = floorballLeaguesRaw.data.filter((item) => !/final/i.test(item.name) && !/kval/i.test(item.name));

    const hockeyLeaguesRaw = useLeagues(leagueValues.get("hockey"), "&activeDate=" + (currentYear + 1));
    const hockeyLeagues = hockeyLeaguesRaw.data.filter((item) => !/final/i.test(item.name) && !/kval/i.test(item.name));

    return (<div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                {/* Mobile menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <li>
                            <details>
                                <summary>Football</summary>
                                <ul className="p-2">
                                    {footballLeagues.map((l) => (<li key={l.id}>
                      <span>
                        {l.name}
                          {l.season && (<>
                                  ({l.season.startYear}/{l.season.endYear})
                              </>)}
                      </span>
                                        </li>))}
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Hockey</summary>
                                <ul className="p-2">
                                    {hockeyLeagues.map((l) => (<li key={l.id}>
                      <span>
                        {l.name}
                          {l.season && (<>
                                  ({l.season.startYear}/{l.season.endYear})
                              </>)}
                      </span>
                                        </li>))}
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Floorball</summary>
                                <ul className="p-2">
                                    {floorballLeagues.map((l) => (<li key={l.id}>
                      <span>
                        {l.name}
                          {l.season && (<>
                                  ({l.season.startYear}/{l.season.endYear})
                              </>)}
                      </span>
                                        </li>))}
                                </ul>
                            </details>
                        </li>
                        <li className="dropdown">
                            <label className="flex cursor-pointer gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="5"/>
                                    <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                                </svg>
                                <input type="checkbox" value="synthwave" className="toggle theme-controller"/>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </label>
                        </li>

                    </ul>
                </div>

                {/* Main menu (desktop) */}


                <ul className="menu menu-horizontal px-1 lg:flex hidden">
                    {/* FOOTBALL */}
                    <li className="dropdown">
                        <details
                            open={openDropdown === "football"}
                            onClick={(e) => {
                                e.preventDefault(); // 👈 prevents native toggle
                                handleToggle("football");
                            }}
                        >
                            <summary className="cursor-pointer flex items-center gap-2">
                                Football
                                <img src="/icons/soccer.svg" className="h-6 w-6" alt="Football icon"/>
                            </summary>
                            <ul className="p-2">
                                {footballLeagues.map((l) => (<li key={l.id}>
                    <span>
                      {l.name}
                        {l.season && (<>
                                ({l.season.startYear}/{l.season.endYear})
                            </>)}
                    </span>
                                    </li>))}
                            </ul>
                        </details>
                    </li>

                    {/* HOCKEY */}
                    <li className="dropdown">
                        <details
                            open={openDropdown === "hockey"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleToggle("hockey");
                            }}
                        >
                            <summary className="cursor-pointer flex items-center gap-2">
                                Hockey
                                <img src="/icons/floorball.svg" className="h-6 w-6" alt="Hockey icon"/>
                            </summary>
                            <ul className="p-2">
                                {hockeyLeagues.map((l) => (<li key={l.id}>
                    <span>
                      {l.name}
                        {l.season && (<>
                                ({l.season.startYear}/{l.season.endYear})
                            </>)}
                    </span>
                                    </li>))}
                            </ul>
                        </details>
                    </li>

                    {/* FLOORBALL */}
                    <li className="dropdown">
                        <details
                            open={openDropdown === "floorball"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleToggle("floorball");
                            }}
                        >
                            <summary className="cursor-pointer flex items-center gap-2">
                                Floorball
                                <img src="/icons/hockeystick.svg" className="h-6 w-6" alt="Floorball icon"/>
                            </summary>
                            <ul className="p-2">
                                {floorballLeagues.map((l) => (<li key={l.id}>
                    <span>
                      {l.name}
                        {l.season && (<>
                                ({l.season.startYear}/{l.season.endYear})
                            </>)}
                    </span>
                                    </li>))}
                            </ul>
                        </details>
                    </li>

                </ul>
            </div>

            <div className="navbar-center">
                <a className="btn btn-ghost text-4xl">SportHub</a>
            </div>

            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    <li className="dropdown">
                        <label className="flex cursor-pointer gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5"/>
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                            </svg>
                            <input type="checkbox" value="synthwave" className="toggle theme-controller"/>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </label>
                    </li>
                </ul>
            </div>
        </div>);
}
