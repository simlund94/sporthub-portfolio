import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconFactory from "../icons etc/IconFactory.jsx";
import formatLeaguePath from "../formatLeaguePath.jsx";

export default function DropdownItem({
                                         item,
                                         leagues = [],
                                         error = null,
                                         loading = false,
                                         isMobile = false,
                                     }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); // ✅ must be top-level

    if (isMobile) {
        return (
            <div className="w-full">
                <button
                    className="btn btn-ghost w-full flex items-center justify-between"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <span>{item.name}</span>
                    <IconFactory name={item.icon} className="inline-block w-4 h-4 stroke-current" />
                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    >
                        <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                </button>

                {open && (
                    <ul className="menu bg-base-100 rounded-box mt-2 p-2 shadow-inner">
                        {loading && (
                            <li>
                                Laddar
                                <span className="loading loading-dots loading-xs ml-2" />
                            </li>
                        )}
                        {error && <li className="text-red-500">Error loading leagues</li>}
                        {!loading && !error && leagues.map((l) => (
                            <li key={l.id} className="ml-2 w-full">
                                <button
                                    className="w-full text-left"
                                    onClick={() => {
                                        navigate(`/league/${formatLeaguePath(l.name)}/${l.teamClass.toLowerCase()}`);
                                        setOpen(false); // close dropdown
                                    }}
                                >
                                    {l.name}{" "}
                                    {l.name.includes("Superligan")
                                        ? l.teamClass.includes("WOMEN")
                                            ? "(Dam)"
                                            : "(Herr)"
                                        : ""}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    // DESKTOP
    return (
        <div className="dropdown dropdown-bottom" onBlur={() => setOpen(false)} onFocus={() => setOpen(true)}>
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-lg font-semibold m-1 flex items-center justify-between w-full"
            >
                <span>{item.name}</span>
                <IconFactory name={item.icon} className="inline-block w-6 h-6 stroke-current" />
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
            </div>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-[100] w-52 p-2 shadow-sm">
                {loading && (
                    <li>
                        Laddar
                        <span className="loading loading-dots loading-xs ml-2" />
                    </li>
                )}
                {error && <li className="text-red-500">Error loading leagues</li>}
                {!loading && !error && leagues.map((l) => (
                    <li key={l.id}>
                        <button
                            className="w-full text-left"
                            onClick={() => {
                                navigate(`/league/${formatLeaguePath(l.name)}/${l.teamClass.toLowerCase()}`);
                            }
                        }
                        >
                            {l.name}{" "}
                            {l.name.includes("Superligan")
                                ? l.teamClass.includes("WOMEN")
                                    ? "(Dam)"
                                    : "(Herr)"
                                : ""}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
