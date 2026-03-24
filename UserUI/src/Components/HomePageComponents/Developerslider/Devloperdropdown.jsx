import React, { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

const developerOptions = [
  "Zara Builder",
  "Fortune 5 (developer)",
  "Forum Real Estate Development",
  "Galaxy Realty",
  "G and Co Properties",
  "Gemini Group",
  "GFH Properties",
  "GHD Developments",
  "DAMAC",
  "Sobha",
  "Nakheel",
  "Azizi",
];

export default function DeveloperDropdown({
  selectedDevelopers,
  setSelectedDevelopers,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDevelopers = useMemo(() => {
    return developerOptions.filter((dev) =>
    dev.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const normalize = (str) => str.trim().toLowerCase();

const toggleDeveloper = (name) => {
  const normalized = normalize(name);

  const updated = selectedDevelopers.includes(normalized)
    ? selectedDevelopers.filter((item) => item !== normalized)
    : [...selectedDevelopers, normalized];

  setSelectedDevelopers(updated);
};

  const clearAll = () => {
    setSelectedDevelopers([]);
    setSearch("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-white rounded-xl px-4 h-[41px] text-[15px] font-medium text-[#67739E] shadow-sm"
      >
        <span className="truncate">
          {selectedDevelopers.length === 0
  ? "Developer"
  : selectedDevelopers.length <= 2
  ? developerOptions
      .filter((d) =>
        selectedDevelopers.includes(d.toLowerCase())
      )
      .join(", ")
  : `${selectedDevelopers.length} Developers`}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#67739E] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-[345px] bg-white rounded-[12px] shadow-lg z-50 overflow-hidden border border-[#E5EAF4]">
          <div className="px-3 pt-3 pb-2 border-b border-[#EEF2F7]">
            <p className="text-[12px] font-medium text-[#67739E]">
              Filter by developer
            </p>
          </div>

          <div className="px-3 py-2">
            <div className="flex items-center gap-2 h-[36px] rounded-[10px] border border-[#D9DEE8] px-3">
              <Search className="w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full outline-none text-[14px] text-[#111827] placeholder:text-[#9CA3AF] bg-transparent"
              />
            </div>
          </div>

          <div className="max-h-[220px] overflow-y-auto px-2 pb-2">
            {filteredDevelopers.map((dev) => {
              const checked = selectedDevelopers.includes(dev.toLowerCase());

              return (
                <label
                  key={dev}
                  className="flex items-center gap-2 px-2 py-2 rounded-[10px] cursor-pointer hover:bg-[#F7F8FB]"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleDeveloper(dev)}
                    className="w-[14px] h-[14px]"
                  />

                  <div className="w-5 h-5 rounded-[4px] bg-[#111827] shrink-0" />

                  <span className="text-[14px] text-[#111827] leading-tight">
                    {dev}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="grid grid-cols-2 border-t border-[#ECEFF5]">
            <button
              type="button"
              onClick={clearAll}
              className="h-[38px] text-[12px] text-[#6B7280] border-r border-[#ECEFF5]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-[38px] text-[12px] text-[#111827] font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}