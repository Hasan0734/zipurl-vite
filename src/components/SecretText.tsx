import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import CopyButton from "./ui/copy-button";
import { Button } from "./ui/button";

const SecretText = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!text) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {isVisible ? (
        <span>{text}</span>
      ) : (
        <span className="mt-1"> {"*".repeat(text?.length)}</span>
      )}
      <Button
        size={"icon-xs"}
        variant={"ghost"}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? <EyeOff /> : <Eye />}
      </Button>
      <CopyButton size={"sm"} variant={"ghost"} content={text} />
    </div>
  );
};

export default SecretText;
