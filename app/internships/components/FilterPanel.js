export default function FilterPanel({ filters, setFilters, onClear }) {
  // Small helper to keep controlled input updates consistent across fields.
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="filters">
      <div className="filters-head">
        <h2>Filters</h2>
      </div>

      <label>
        Profile
        <input
          value={filters.profile}
          onChange={(e) => updateFilter("profile", e.target.value)}
          placeholder="e.g. Marketing"
        />
      </label>

      <label>
        Location
        <input
          value={filters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
          placeholder="e.g. Delhi"
        />
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.workFromHome}
          onChange={(e) => updateFilter("workFromHome", e.target.checked)}
        />
        Work from home
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.partTime}
          onChange={(e) => updateFilter("partTime", e.target.checked)}
        />
        Part-time
      </label>

      <label>
        Desired minimum monthly stipend (INR {filters.minStipend.toLocaleString()})
        <input
          type="range"
          min="0"
          max="10000"
          step="2000"
          value={filters.minStipend}
          onChange={(e) => updateFilter("minStipend", Number(e.target.value))}
        />
      </label>

      <label>
        Max. duration ({filters.maxDuration} months)
        <input
          type="range"
          min="1"
          max="12"
          value={filters.maxDuration}
          onChange={(e) => updateFilter("maxDuration", Number(e.target.value))}
        />
      </label>

      <label>
        Keyword search
        <input
          value={filters.keyword}
          onChange={(e) => updateFilter("keyword", e.target.value)}
          placeholder="e.g. React, SEO, Finance"
        />
      </label>

      <button className="clear-btn" onClick={onClear}>
        Clear all filters
      </button>
    </aside>
  );
}