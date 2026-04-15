import React from "react";
import { Mic, Search } from "lucide-react";
import type { HomeSearchItem } from "./types";

interface HomeSearchPanelProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  searchResults: HomeSearchItem[];
  onSelectItem: (item: HomeSearchItem) => void;
}

const getItemFoodType = (item: HomeSearchItem) =>
  item.foodType ?? (item.category === "Health" ? item.subCategory : "Veg");

const renderSearchResult = (
  item: HomeSearchItem,
  onSelectItem: (item: HomeSearchItem) => void,
) => (
  <button
    key={`${item.source}-${item.id}`}
    type="button"
    onClick={() => onSelectItem(item)}
    className="w-full rounded-xl bg-white px-3 py-2 text-left shadow-sm"
  >
    <div className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-14 w-14 rounded-xl bg-gray-100 object-cover"
      />

      <div className="flex flex-1 items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          <p className="line-clamp-2 text-xs text-gray-500">
            {item.description}
          </p>
          <p className="mt-1 text-sm font-semibold text-orange-500">
            Rs. {item.price}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
            getItemFoodType(item) === "Veg"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.source}
        </span>
      </div>
    </div>
  </button>
);

const HomeSearchPanel: React.FC<HomeSearchPanelProps> = ({
  searchQuery,
  onSearchQueryChange,
  searchResults,
  onSelectItem,
}) => {
  const vegResults = searchResults.filter(
    (item) => getItemFoodType(item) === "Veg",
  );
  const nonVegResults = searchResults.filter(
    (item) => getItemFoodType(item) === "Non Veg",
  );

  return (
    <div className="mb-7 rounded-xl bg-white px-4 py-3">
      <div className="flex items-center">
        <Search className="mr-2 h-4 w-4 text-gray-400" />
        <input
          className="w-full bg-transparent text-sm text-[#2a211b] outline-none"
          placeholder="Search veg and non-veg dishes"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
        <Mic className="h-3.5 w-3.5 text-gray-400" />
      </div>

      {searchQuery.trim() && (
        <div className="mt-4 max-h-80 overflow-y-auto rounded-2xl border border-gray-100 bg-[#fffaf3] p-3">
          {searchResults.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-400">
              No veg or non-veg items found
            </p>
          ) : (
            <div className="space-y-4">
              {vegResults.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-green-600">
                    Veg
                  </p>
                  <div className="space-y-2">
                    {vegResults.map((item) =>
                      renderSearchResult(item, onSelectItem),
                    )}
                  </div>
                </div>
              )}

              {nonVegResults.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-600">
                    Non Veg
                  </p>
                  <div className="space-y-2">
                    {nonVegResults.map((item) =>
                      renderSearchResult(item, onSelectItem),
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeSearchPanel;
