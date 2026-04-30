import { Camera, User } from "lucide-react";
import { Button } from "../ui/button";
import { useLoaderData } from "react-router";

const ProfileSection = () => {
  const { profile } = useLoaderData();

  console.log({ profile });
  return (
    <section className="glass-card rounded-3xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="font-headline flex items-center gap-3 text-xl font-bold">
          <User className="text-primary" />
          Profile Identity
        </h3>
        <Button className="rounded-full px-4 text-primary" variant={"outline"}>
          Edit
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <div className="group relative">
          <div className="to-tertiary absolute -inset-1 rounded-full bg-linear-to-tr from-primary opacity-25 blur transition duration-500 group-hover:opacity-50"></div>
          <img
            alt="User avatar"
            className="border-surface relative h-24 w-24 rounded-full border-4 object-cover"
            data-alt="Modern professional woman portrait with neon emerald lighting accents on her face in a dark studio setting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS-ccwAlivF4SZ6Y1Lmz1Nzkp9NzNn_awoC-9qRsUXVZaDEAStaapEoRMLKfH4SOB2LbvClXt9QikQriVzdFPM_D8fkNv8SqGwYpzMLyfHpM62diMPLgoBsQyDskV_xqss1XAfwAHnGNLkO2-gJ7uyo3h2lGQ02F7RUFNs4h6ylyUNiDn3X9Mca06CYM6dULBNSSOG74wSEiq5eTjOa7RcCtVQkmISQY-9BF2LoBck3LHYatjc7EFX5i7Eg8UidzaEOXTHKp-Pd2Y"
          />
          <div className="border-surface absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-4 bg-primary shadow-lg">
            <Camera size={16} />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-headline text-on-surface-variant text-[10px] tracking-widest uppercase">
              Full Name
            </label>
            <div className="bg-surface-container-low border-outline-variant/10 font-body rounded-xl border px-4 py-3">
              {profile.first_name} {profile.last_name}
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-headline text-on-surface-variant text-[10px] tracking-widest uppercase">
              Account Type
            </label>
            <div className="bg-surface-container-low border-outline-variant/10 flex items-center gap-2 rounded-xl border px-4 py-3">
              <span className="bg-tertiary h-2 w-2 rounded-full"></span>
              <span className="font-body text-tertiary">Premium Archon</span>
            </div>
          </div>
          <div className="col-span-2 space-y-1">
            <label className="font-headline text-on-surface-variant text-[10px] tracking-widest uppercase">
              Email Address
            </label>
            <div className="bg-surface-container-low border-outline-variant/10 font-body rounded-xl border px-4 py-3">
              {profile.email}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
