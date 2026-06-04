import { LockKeyhole, Shield, ShieldCogCorner } from "lucide-react";
import { Switch } from "../ui/switch";
import ChangePassword from "./ChangePassword";

const SecuritySection = () => {
  return (
    <section className="glass-panel  border border-primary/20 rounded-3xl p-8">
      <h3 className="font-headline mb-8 flex items-center gap-3 text-xl font-bold">
        <Shield className="text-primary" />
        Security Protocols
      </h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-2xl border border-secondary/50 bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <LockKeyhole className="text-primary" />
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold">Password</h4>
              <p className="text-on-surface-variant text-xs">
                Last updated 14 days ago
              </p>
            </div>
          </div>
         <ChangePassword/>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-secondary/50 bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCogCorner className="text-primary" />
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold">
                Two-Factor Authentication
              </h4>
              <p className="text-on-surface-variant text-xs">
                OTP verification
              </p>
            </div>
          </div>
          <Switch id="two_factor_enabled" />
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
