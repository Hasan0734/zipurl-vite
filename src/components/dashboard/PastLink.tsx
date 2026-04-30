import api from "@/lib/api";
import { Link2 } from "lucide-react";
import {
  useActionState,
  useState,
  useTransition,
  type ChangeEvent,
  type FormEvent,
  type SubmitEvent,
} from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import toast from "react-hot-toast";
import * as motion from "motion/react-client";
import CopyButton from "../ui/copy-button";

const addNewUrl = async (data: { original_url: string }) => {
  const res = api.post("/urls", data);
  return (await res).data;
};

const PastLink = () => {
  const [isPending, startTransition] = useTransition();
  const [originalUrl, setOriginalUrl] = useState("");
  const [short_code, setShortCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!originalUrl) return;
    startTransition(async () => {
      const res = await addNewUrl({ original_url: originalUrl });

      if (!res.short_code) {
        toast.error("Someting is wrong!");
        return;
      }
      setShortCode(res.short_code);
      toast.success("New short url created.");
      setOriginalUrl("");
    });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-4xl">
      <div className="mb-4">
        <h2 className=" text-4xl font-black tracking-tighter">
          Light up your links.
        </h2>
        <p className=" mt-2 font-bold tracking-widest text-primary/60 ">
          Instant Shortening
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="glass-panel flex items-center gap-2 rounded-2xl p-2 shadow-2xl"
      >
        <div className="flex flex-1 items-center gap-3 px-4">
          <Link2 className="text-primary" />
          <input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            name="original_url"
            id="original_url"
            className=" w-full border-none py-4 focus:ring-0 outline-0"
            placeholder="Paste your long URL here..."
            type="text"
          />
        </div>
        <Button
          type="submit"
          size={"lg"}
          variant={'secondary'}
          className=" rounded-xl h-11 px-4 transition-transform hover:scale-[1.02] active:scale-95"
        >
          {isPending && <Spinner />} Shortner
        </Button>
      </form>
      {short_code && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="mt-3 flex gap-3 items-center "
        >

          <a href="" target="_blank" className="px-2  text-primary text-sm hover:underline bg-secondary/50 w-fit py-0.5 rounded-lg">
            https://zipurl.to/{short_code}
          </a>

          <CopyButton variant={'outline'} size={'sm'} content={`https://zipurl.to/${short_code}`} />
        </motion.div>
      )}
    </section>
  );
};

export default PastLink;
