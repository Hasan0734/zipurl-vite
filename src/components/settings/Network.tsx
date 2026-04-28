import { Network as NetworkHub } from "lucide-react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

const Network = () => {
  return (
    <section className="glass-card rounded-3xl p-8">
      <h3 className="font-headline mb-6 flex items-center gap-3 text-xl font-bold">
        <NetworkHub className="text-primary" />
        Network
      </h3>
      <div className="space-y-4">
        <div className="flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/5">
          <Label htmlFor="https_upgrade" className="text-sm font-medium">Automatic HTTPS Upgrade</Label>
          <Switch id="https_upgrade"/>
        </div>
        <div className="flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/5">
          <Label htmlFor="stealth" className="text-sm font-medium">Referrer Hiding (Stealth)</Label>
          <Switch id="stealth" />
        </div>
        <div className="flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/5">
          <Label htmlFor="anonymize_analytics" className="text-sm font-medium">Anonymize Analytics</Label>
          <Switch id="anonymize_analytics" />
        </div>
      </div>
    </section>
  )
}

export default Network
