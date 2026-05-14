import { Link2 } from "lucide-react";
import { useState, useTransition, type SubmitEvent } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import * as motion from "motion/react-client";
import CopyButton from "../ui/copy-button";
import { toast } from "sonner";
import { addNewUrl } from "@/lib/api-request";
import { useQueryClient } from "@tanstack/react-query";



const PastLink = () => {
  const [isPending, startTransition] = useTransition();
  const [originalUrl, setOriginalUrl] = useState("");
  const [short_code, setShortCode] = useState("");
  const queryClient = useQueryClient()

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!originalUrl) return;
    startTransition(async () => {
      const res = await addNewUrl({ original_url: originalUrl });

      if (!res.success) {
        toast.error("Someting is wrong!");
        return;
      }
      queryClient.invalidateQueries({queryKey: ["recentUrl"]})
      setShortCode(res.short_code);
      toast.success("New short url created.");
      setOriginalUrl("");
    });
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
      <form onSubmit={handleSubmit} className="">
        <div className="glass-panel border border-primary/20 flex items-center gap-2 rounded-2xl p-2 shadow-2xl">
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
            className=" rounded-xl h-11 px-4"
            disabled={isPending}
          >
            {isPending && <Spinner />} Shortner
          </Button>
        </div>
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
          <a
            href=""
            target="_blank"
            className="px-2  text-primary text-sm hover:underline bg-secondary/50 w-fit py-0.5 rounded-lg"
          >
            https://zipurl.to/{short_code}
          </a>

          <CopyButton
            variant={"outline"}
            size={"sm"}
            content={`https://zipurl.to/${short_code}`}
          />
        </motion.div>
      )}
    </section>
  );
};

export default PastLink;
