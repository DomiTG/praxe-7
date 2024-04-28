import NavbarComponent from "@/components/NavbarComponent";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {

  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
//          <input type="date" value={date.toISOString().split("T")[0]} onChange={e => setDate(new Date(e.target.value))} />

  return (
    <div>
      <NavbarComponent />
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <div className="bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
          <h3 className="text-2xl">Kalendář</h3>
          <hr className="my-2 border-neutral-700" />
          <p className="text-lg">Vyber datum</p>
          <input type="date" value={date.toISOString().split("T")[0]} onChange={e => setDate(new Date(e.target.value))} className="bg-neutral-800 text-neutral-100 p-2 rounded-lg shadow-lg" />
          <p className="text-sm">Vybrané datum: {date.toISOString().split("T")[0]}</p>
          <button className="bg-zinc-700 text-white p-2 rounded-lg shadow-lg mt-2" onClick={() => router.push(`/${date.toISOString().split("T")[0]}`)}>
            Zobrazit den
          </button>
        </div>
      </div>
    </div>
  );
}
