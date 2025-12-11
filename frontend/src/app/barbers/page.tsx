import { getBarbers } from "@/lib/api/barbers";
import type { Barber } from "@/types/Barber";

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Barbers</h1>

      <ul className="list-disc pl-6">
        {barbers.map((barber) => (
          <li key={barber.id}>{barber.name}</li>
        ))}
      </ul>
    </div>
  );
}
