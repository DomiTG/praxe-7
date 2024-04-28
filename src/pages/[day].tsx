import NavbarComponent from "@/components/NavbarComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DayView() {

    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loadedData, setLoadedData] = useState<null | {}>(null);

    useEffect(() => {
        const loadData = async () => {
            console.log("loading")
            const day = router.query.day as string;
            console.log(day)
            if(!day) return;
            console.log("passing through")
            const localStoredData = localStorage.getItem("planned");
            if (localStoredData) {

                console.log("here")
                const parsedData = JSON.parse(localStoredData);
                setLoadedData(parsedData[day]);
            }
        }
        loadData();
    }, [router.query.day]);

    const saveData = (data: any) => {
        //there can be more activies in one day
        const day = router.query.day as string;
        const localStoredData = localStorage.getItem("planned");
        const parsedData = localStoredData ? JSON.parse(localStoredData) : {};
        const dayObj = parsedData[day] ? parsedData[day] : {};
        dayObj["activities"] = dayObj["activities"] ? [...dayObj["activities"], data] : [data];
        parsedData[day] = dayObj;
        localStorage.setItem("planned", JSON.stringify(parsedData));
        window.location.reload();
    }

    const deleteActivity = (index: number) => {
        const day = router.query.day as string;
        const localStoredData = localStorage.getItem("planned");
        const parsedData = localStoredData ? JSON.parse(localStoredData) : {};
        const dayObj = parsedData[day] ? parsedData[day] : {};
        dayObj["activities"] = dayObj["activities"].filter((_: any, i: number) => i !== index);
        parsedData[day] = dayObj;
        localStorage.setItem("planned", JSON.stringify(parsedData));
        window.location.reload();
    }

    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto my-4">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl">Den: {router.query.day}</h2>
                    <p className="text-sm">Naplánované aktivity: {loadedData ? Object.keys((loadedData as any).activities).length : 0}</p>
                </div>
                <hr className="my-2 border-neutral-700" />
                <div className="flex flex-col">
                    {loadedData ? loadedData ? Object.keys((loadedData as any).activities).map((key, index) => {
                        return (
                            <div key={index} className="bg-zinc-900 p-2 rounded-lg shadow-lg my-2">
                                <h3 className="text-lg">{(loadedData as any).activities[key].activity}</h3>
                                <p className="text-sm">{(loadedData as any).activities[key].description}</p>
                                <p className="text-sm">Od: {(loadedData as any).activities[key].start} Do: {(loadedData as any).activities[key].end}</p>
                                <button className="bg-zinc-700 text-white p-2 rounded-lg shadow-lg mt-2" onClick={() => deleteActivity(index)}>Smazat</button>
                            </div>
                        );
                    }) : "Kokotina": <p className="text-lg">Žádné aktivity</p>}
                </div>
                {
                    showForm &&
                    <div className="bg-zinc-900 p-4 rounded-lg shadow-lg my-2">
                        <h3 className="text-lg">Naplánovat aktivitu</h3>
                        <form className="flex flex-col" onSubmit={(e) => {
                            e.preventDefault();
                            const activity = (document.getElementById("activity") as HTMLInputElement).value;
                            const description = (document.getElementById("description") as HTMLInputElement).value;
                            const start = (document.getElementById("start") as HTMLInputElement).value;
                            const end = (document.getElementById("end") as HTMLInputElement).value;
                            const data = {
                                activity,
                                description,
                                start,
                                end
                            };
                            saveData(data);
                            setLoadedData(data);
                            setShowForm(false);
                        }}>
                            <input type="text" placeholder="Název aktivity" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg shadow-lg my-2" id="activity" />
                            <input type="text" placeholder="Popis aktivity" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg shadow-lg my-2" id="description" />
                            <input type="time" placeholder="Start" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg shadow-lg my-2" id="start" />
                            <input type="time" placeholder="Konec" className="bg-neutral-800 text-neutral-100 p-2 rounded-lg shadow-lg my-2" id="end" />
                            <button className="bg-zinc-700 text-white p-2 rounded-lg shadow-lg mt-2">Naplánovat</button>
                        </form>
                    </div>
                }
                <button className="bg-zinc-700 text-white p-2 rounded-lg shadow-lg mt-2" onClick={() => setShowForm(!showForm)}>
                    Naplánovat aktivitu
                </button>
            </div>
        </div>
    );
}