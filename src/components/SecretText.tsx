import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SecretText = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!text) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      {isVisible ? <span>{text}</span> : <span className="mt-1"> {"*".repeat(text?.length)}</span>}
    </div>
  );
};

export default SecretText;
