import { Globe, QrCode, Share2 } from "lucide-react";
const LiveActivity = () => {
  return (
    <div className="glass-panel rounded-3xl border p-8">
      <h3 className="text-on-surface font-manrope mb-6 text-xl font-bold">
        Live Activity
      </h3>
      <div className="space-y-4">
        <div className="bg-surface-container-low/40 flex items-center justify-between rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Globe className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">New click from London, UK</p>
              <p className="text-on-surface-variant text-xs">
                emerald.ai/summer-sale-2024
              </p>
            </div>
          </div>
          <span className=" text-xs font-medium">Just now</span>
        </div>
        <div className="bg-surface-container-low/40 flex items-center justify-between rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <QrCode className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">QR Scan from New York, US</p>
              <p className=" text-xs">emerald.ai/vip-invite</p>
            </div>
          </div>
          <span className=" text-xs font-medium">2m ago</span>
        </div>
        <div className="bg-surface-container-low/40 flex items-center justify-between rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Share2 className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">Shared on X (Twitter)</p>
              <p className="text-on-surface-variant text-xs">
                emerald.ai/tech-blog-post
              </p>
            </div>
          </div>
          <span className="text-on-surface-variant text-xs font-medium">
            14m ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveActivity;
