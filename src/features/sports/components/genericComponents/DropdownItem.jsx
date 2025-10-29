import {useRef} from "react";
import IconFactory from "../icons etc/IconFactory.jsx";
import formatLeaguePath from "../formatLeaguePath.jsx";
import {Link} from "react-router-dom";

export default function DropdownItem({
                                         item,
                                         leagues = [],
                                         error = null,
                                         loading = false,
                                         openDropdown,
                                         setOpenDropdown,
                                         isMobile = false,
                                     }) {
    const dropdownRef = useRef(null);

    const handleToggle = (key, e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDropdown((prev) => (prev === key ? null : key));
    };

    return (
        <li className="dropdown z-10">
            <details
                open={openDropdown === item.key}
                onClick={(e) => handleToggle(item.key, e)}
            >
                <summary
                    className={`cursor-pointer container items-center gap-4 pb-2 justify-items-start ${
                        isMobile ? "text-lg" : ""
                    }`}
                    onClick={(e) => {
                        if (isMobile) e.stopPropagation();
                    }}
                >
                    {item.name}
                    <IconFactory
                        name={item.icon}
                        className={`inline-block ${
                            isMobile ? "w-4 h-4" : "w-8 h-8"
                        } stroke-current shrink-0`}
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
                                <Link
                                    to={`/league/${formatLeaguePath(l.name)}/${l.teamClass.toLowerCase()}`}
                                    onClick={() => {
                                        setOpenDropdown(null);
                                        document.activeElement?.blur(); // ✅ closes mobile dropdown
                                    }}
                                >
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
}
