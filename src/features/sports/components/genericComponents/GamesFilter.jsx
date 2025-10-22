const GamesFilter = ({ status, onChangeStatus, order, onChangeOrder }) => {
    return (
        <div className="flex gap-2">
            <button
                className={`btn ${status === "FINISHED" ? "btn-warning" : "btn-outline btn-warning"}`}
                onClick={() => {
                    onChangeStatus("FINISHED");
                    onChangeOrder("desc");
                }}
            >
                Senaste matcher
            </button>

            <button
                className={`btn ${status === "UPCOMING" ? "btn-warning" : "btn-outline btn-warning"}`}
                onClick={() => {
                    onChangeStatus("UPCOMING");
                    onChangeOrder("asc");
                }}
            >
                Kommande matcher
            </button>
        </div>
    )
}
export default GamesFilter;
