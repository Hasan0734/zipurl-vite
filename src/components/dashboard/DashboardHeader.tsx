import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { BellDot, Search } from "lucide-react";
import UserDropDown from "../UserDropDown";
import { useLocation, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const isActive = pathname === "/urls";
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
    <header
      className={cn(
        "sticky top-0 z-40 flex h-20 w-full items-center justify-end bg-transparent px-12 backdrop-blur-md",
        { "justify-between": isActive },
      )}
    >
      {isActive && (
        <div className="max-w-md flex-1">
          <div className="group relative">
            <span className="text-outline absolute top-1/2 left-4 -translate-y-1/2">
              <Search />
            </span>
            <input
              value={inputValue} // Use local state here
              onChange={handleInputChange}
              className="text-on-surface w-full rounded-full border-none bg-input py-2.5 pr-4 pl-12 text-sm transition-all focus:ring-2 focus:ring-secondary/40"
              placeholder="Search your links..."
              type="text"
            />
          </div>
        </div>
      )}
      <div className="flex items-center gap-6">
        {/* ... rest of your code ... */}
        <div className="flex items-center gap-4 border-r pr-6">
          <button className="relative">
            <BellDot size={24} />
            <span className="absolute top-px right-0.5 h-2 w-2 rounded-full border-2 bg-red-600"></span>
          </button>
        </div>
        <UserDropDown />
      </div>
    </header>
  );
};

export default DashboardHeader;
