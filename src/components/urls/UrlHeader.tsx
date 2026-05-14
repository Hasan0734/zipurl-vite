import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Download, Funnel, SearchIcon } from "lucide-react";
import AddNewUrl from "./AddNewUrl";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

const UrlHeader = ({ total }: { total: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedValue] = useDebounce(inputValue, 500);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    setSearchParams(params, { replace: true });
  }, [debouncedValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-on-surface text-2xl font-bold">All URLs</h3>
        <p className="text-on-surface-variant text-sm">
          Managing {total} active redirects
        </p>
      </div>

      <div className="flex gap-2">
        <div className="max-w-md sm:min-w-sm flex-1">
         

          <InputGroup className="h-9 rounded-full px-1 has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupInput
              value={inputValue}
              onChange={handleInputChange}
              id="table-search"
              placeholder="Search..."
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Button size={"lg"} variant={"outline"} className="rounded-full">
          <Funnel />
          Filter
        </Button>
        <Button size={"lg"} variant={"outline"} className="rounded-full">
          <Download />
          Export
        </Button>
        <Button size={"lg"} onClick={() => setIsOpen(true)}>
          Add New
        </Button>
      </div>
      <AddNewUrl isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default UrlHeader;
