export default function Table({
    items = [],
    loading = false,
    error = null,
    disabled = false,
    onSelect,
    selectedLeagueId,

})
{
    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!items.length) {
        return <div className="p-4 text-center text-gray-500">No data available</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                <tr className="bg-gray-100">
                    {Object.keys(items[0]).map((key) => (
                        <th
                            key={key}
                            className="border border-gray-300 px-4 py-2 text-left"
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {items.map((item) => {
                    const isSelected = item.id === selectedLeagueId;
                    return (
                        <tr
                            key={item.id}
                            className={`cursor-pointer ${
                                disabled ? "opacity-50 pointer-events-none" : ""
                            } ${isSelected ? "bg-yellow-100" : "hover:bg-gray-50"}`}
                            onClick={() => !disabled && onSelect && onSelect(item)}
                        >
                            {Object.keys(item).map((key) => (
                                <td key={key} className="border border-gray-300 px-4 py-2">
                                    {item[key]}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}