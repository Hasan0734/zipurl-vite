import DashboardLayout from "@/components/DashboardLayout";
import Network from "@/components/settings/Network";
import PreferenceAndUrl from "@/components/settings/PreferenceAndUrl";
import ProfileSection from "@/components/settings/ProfileSection";
import SecuritySection from "@/components/settings/SecuritySection";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-12 p-12">
        <div className="mb-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-headline mb-2 block text-sm font-bold tracking-[0.2em] text-primary uppercase">
                Control Center
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight">
                Account Settings
              </h2>
            </div>
            <div className="pb-2">
              <p className="max-w-xs text-right text-sm">
                Configure your bioluminescent digital identity and network
                preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 items-start gap-8">
          <div className="col-span-12 space-y-8 lg:col-span-7">
            <ProfileSection />
            <SecuritySection />
          </div>
          <div className="col-span-12 space-y-8 lg:col-span-5">
            <PreferenceAndUrl />
            <Network />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
