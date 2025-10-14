export default function Hero() {
    return (
        <div className="hero bg-base-200 h-[60vh] glass mb-4">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="logo.png"
                    className="w-40 sm:w-56 md:w-64 lg:max-w-sm rounded-lg"
                />
                <div>
                    <h1 className="text-5xl font-bold">Välkommen till SportHub!</h1>
                    <p className="py-6 text-center lg:text-left">
                        En kraftfull plattform som hämtar sportdata via API:er och gör det enkelt att analysera och följa matcher i realtid.
                        Håll dig alltid steget före! Vi samlar in live-data om dina favoritlag och sporter – allt på ett ställe.
                    </p>
                    <button className="btn btn-warning">Ta mig dit!</button>
                </div>
            </div>
        </div>
    );
}