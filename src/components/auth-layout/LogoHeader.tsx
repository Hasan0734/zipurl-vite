import { FolderArchiveIcon } from "lucide-react";

const LogoHeader = () => {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <div className="mb-4 inline-flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <FolderArchiveIcon className="text-primary" />
        </div>
        <span className="brand-font text-on-surface text-3xl font-extrabold tracking-tighter">
          ZipUrl
        </span>
      </div>
      <p className="max-w-sm text-base tracking-tight text-muted-foreground">
        Bioluminescent Intelligence
      </p>
    </div>
  );
};

export default LogoHeader;
