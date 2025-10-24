import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer footer-vertical footer-center bg-base-300/50 text-base-content rounded p-6 glass">
            <aside className="w-36 rounded-lg px-8">
                <img src="/public/logo.png" alt="Sporthubs logga"/>
            </aside>
            <nav className="grid grid-flow-col gap-4">
                <Link to="/about-us" className="link link-hover">Om oss</Link>
                <Link to="/contact" className="link link-hover">Kontakt</Link>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - Alla rättigheter förbehållna av SportHub</p>
            </aside>
        </footer>
    )
}