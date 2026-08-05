import React, { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevelopers } from "../../../features/dashboard/developerSlice.jsx";

export default function DeveloperDropdown({
  selectedDevelopers,
  setSelectedDevelopers,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { developers = [], loading = false } = useSelector(
    (state) => state.developer
  );

  useEffect(() => {
    dispatch(fetchDevelopers());
  }, [dispatch]);

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
    return developers.filter((dev) =>
      (dev?.name || "").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [developers, search]);

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
        className="w-full flex items-center justify-between bg-white rounded-xl px-4 h-[41px] text-[14px] font-medium text-[#67739E] shadow-sm"
      >
        <span className="truncate">
          {selectedDevelopers.length === 0
            ? "Developer"
            : selectedDevelopers.length <= 2
            ? developers
                .filter((d) =>
                  selectedDevelopers.includes((d?.name || "").toLowerCase())
                )
                .map((d) => d.name)
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
            <p className="text-[14px] font-medium text-[#67739E]">
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
            {loading ? (
              <p className="px-2 py-2 text-[14px] text-[#67739E]">Loading...</p>
            ) : filteredDevelopers.length > 0 ? (
              filteredDevelopers.map((dev, index) => {
                const devName = dev?.name || "";
                const checked = selectedDevelopers.includes(
                  devName.toLowerCase()
                );

                return (
                  <label
                    key={devName || index}
                    className="flex items-center gap-2 px-2 py-2 rounded-[10px] cursor-pointer hover:bg-[#F7F8FB]"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDeveloper(devName)}
                      className="w-[14px] h-[14px]"
                    />
<img
  src={dev?.image}
  alt={devName}
  className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB] shrink-0"
/>
                    

                    <span className="text-[14px] text-[#67739E] leading-tight">
                      {devName}
                    </span>
                  </label>
                );
              })
            ) : (
              <p className="px-2 py-2 text-[14px] text-[#67739E]">
                No developers found
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 border-t border-[#ECEFF5]">
            <button
              type="button"
              onClick={clearAll}
              className="h-[38px] text-[12px] text-[#67739E] border-r border-[#ECEFF5]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-[38px] text-[12px] text-[#67739E] font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}