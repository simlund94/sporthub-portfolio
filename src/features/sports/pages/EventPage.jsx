import { useParams } from "react-router-dom";
import { useEventId } from "../hooks/EventHooks.jsx";
import EventHeader from "../components/eventComponents/EventHeader.jsx";
import EventStats from "../components/eventComponents/EventStats.jsx";
import EventTimeline from "../components/eventComponents/EventTimeline.jsx";
import IconFactory from "../components/icons etc/IconFactory.jsx";
import EventStatistics from "../components/eventComponents/EventStatistics.jsx";

export default function EventPage() {
    const { id } = useParams();
    const { data, loading, err } = useEventId(id);
    const event = data?.event;
    console.log("event", event);
    if (loading) return <p>Loading...</p>;
    if (err) return <p className="text-red-500">Error loading event</p>;
    if (!event) return <p>No event found</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <EventHeader event={event} />
            <EventStats event={event} />
            <EventStatistics event={event} />
            <div className="divider">Matchfakta</div>
            <EventTimeline event={event} />
        </div>
    );
}
