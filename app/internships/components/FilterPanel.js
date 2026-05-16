export default function FilterPanel({ filters, setFilters, onClear }) {
  return (
    <aside className="filters">
      <div className="filters-head">
        <h2>Filters</h2>
      </div>

      <label>
        Profile
        <input
          value={filters.profile}
          onChange={(e) => setFilters((prev) => ({ ...prev, profile: e.target.value }))}
          placeholder="e.g. Marketing"
        />
      </label>

      <label>
        Location
        <input
          value={filters.city}
          onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
          placeholder="e.g. Delhi"
        />
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.workFromHome}
          onChange={(e) => setFilters((prev) => ({ ...prev, workFromHome: e.target.checked }))}
        />
        Work from home
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.partTime}
          onChange={(e) => setFilters((prev) => ({ ...prev, partTime: e.target.checked }))}
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
          onChange={(e) => setFilters((prev) => ({ ...prev, minStipend: Number(e.target.value) }))}
        />
      </label>

      <label>
        Max. duration ({filters.maxDuration} months)
        <input
          type="range"
          min="1"
          max="12"
          value={filters.maxDuration}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxDuration: Number(e.target.value) }))}
        />
      </label>

      <label>
        Keyword search
        <input
          value={filters.keyword}
          onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
          placeholder="e.g. React, SEO, Finance"
        />
      </label>

      <button className="clear-btn" onClick={onClear}>
        Clear all filters
      </button>
    </aside>
  );
}
