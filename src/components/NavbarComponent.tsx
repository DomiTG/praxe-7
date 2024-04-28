import { useRouter } from "next/router";

export default function NavbarComponent() {
    //tailwind
    const router = useRouter();
    return (
        <div className="bg-zinc-900 text-white p-4">
            {/* text on left side, buttons on right side*/}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">Praxe 6</h1>
                <div>
                    <button className="bg-zinc-700 text-white p-2 rounded-lg shadow-lg mr-2" onClick={() => router.push("/")}>Domov</button>
                    <button className="bg-zinc-700 text-white p-2 rounded-lg shadow-lg" onClick={() => router.push("/planned")}>Naplánované</button>
                </div>
            </div>
        </div>
    );
}