export default function ShowDiffrentTablesSelector({ onChangeActiveTable, activeTable }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <button
                className={`btn ${activeTable=== "Tabell" ? "btn-warning" : "btn-outline"}`}
                onClick={() => onChangeActiveTable("Tabell")}
            >
                Visa tabell
            </button>
            <button
                className={`btn ${activeTable=== "Skytteliga" ? "btn-warning" : "btn-outline"}`}
                onClick={() => onChangeActiveTable("Skytteliga")}
            >
                Visa skytteliga
            </button>
            <button
                className={`btn ${activeTable=== "Assistliga" ? "btn-warning" : "btn-outline"}`}
                onClick={() => onChangeActiveTable("Assistliga")}
            >
                Visa assistliga
            </button>
        </div>
    );
}
