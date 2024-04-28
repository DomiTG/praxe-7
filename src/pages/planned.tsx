import NavbarComponent from "@/components/NavbarComponent";
import { useEffect, useState } from "react";

export default function PlannedActivities() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const localStoredData = localStorage.getItem("planned");
        if (localStoredData) {
            const parsedData = JSON.parse(localStoredData);
            setActivities(parsedData);
        }
    }, []);

    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto my-4">
                <h2 className="text-2xl">Naplánované aktivity</h2>
                <hr className="my-2 border-neutral-700" />
                {activities.length === 0 && <p>Žádné aktivity nebyly naplánovány</p>}
                {Object.keys(activities).map((day, i) => (
                    <div key={i} className="bg-zinc-900 p-4 rounded-lg shadow-lg my-2">
                        <h3 className="text-xl">Den: {day}</h3>
                        <hr className="my-2 border-neutral-700" />
                        <div>
                            {(activities[(day as any)] as any).activities.map((activity: any, index: number) => (
                                <div key={index} className="bg-zinc-800 p-2 rounded-lg shadow-lg my-2">
                                    <p>{activity.name}</p>
                                    <p>{activity.time}</p>
                                    <p>{activity.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}