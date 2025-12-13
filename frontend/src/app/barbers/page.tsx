import { getBarbers } from "@/lib/api/barbers";
import { BarberHero } from "@/components/sections/BarberHero";
import { BarberSchedule } from "@/components/sections/BarberSchedule";

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <div className="w-full">
      <BarberHero
        title="Meet Our Barbers"
        description="Our talented team brings years of expertise, precision, and passion to every cut. Discover the professionals behind the chair."
        imageUrl="/barber.jpg"
      />
      <section
        id="barbers-schedule"
        className="max-w-4xl mx-auto px-4 space-y-8 pb-20"
      >
        {barbers.map((barber) => (
          <BarberSchedule barber={barber} key={barber.id} />
        ))}
      </section>
    </div>
  );
}
