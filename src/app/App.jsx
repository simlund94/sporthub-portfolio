import './App.css'
import HomePage from "../features/sports/pages/HomePage.jsx";
import Navbar from "../features/sports/components/NavBar.jsx";
import Footer from "../features/sports/components/Footer.jsx";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HomePage />
            </main>
            <Footer />
        </div>
    )
}

export default App
