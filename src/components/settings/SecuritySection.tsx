import { LockKeyhole, Shield, ShieldCogCorner } from "lucide-react";
import { Switch } from "../ui/switch";
import ChangePassword from "./ChangePassword";
import { useAuth } from "@/hooks/use-auth";
import { useTransition } from "react";
import { enable2FA, getMe } from "@/lib/api-request";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const SecuritySection = () => {
  const [isPending, startTransition] = useTransition();
  const { setAccessToken, setUser } = useAuth();
  const { user } = useAuth();
  const handle2FA = (checked: boolean) => {
    startTransition(async () => {
      const res = await enable2FA({ two_factor_enabled: checked });

      if (!res?.success) {
        toast.error(res.message || "Something wrong!");
        return;
      }
      const me = await getMe();
      if (me.success) {
        setAccessToken(me.access_token);
        setUser(me.user);
      }
      toast.success(res.message);
    });
  };

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
          <ChangePassword />
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
          <div className="flex items-center gap-3">
            {isPending && <Spinner />}
            <Switch
              onCheckedChange={handle2FA}
              defaultChecked={user?.two_factor_enabled}
              id="two_factor_enabled"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
