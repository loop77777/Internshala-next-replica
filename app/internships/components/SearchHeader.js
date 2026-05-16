export default function SearchHeader({ query, onQueryChange }) {
  return (
    <header className="topbar">
      <img className="brand-logo" src="/image/logo.png" alt="Internshala logo" />
      <input
        className="global-search"
        placeholder="Search by profile, company or keyword"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </header>
  );
}