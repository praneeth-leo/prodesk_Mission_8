export default function SearchBar({ value, onChange }) {
  return (
    <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
      <input
        aria-label="Search movies"
        placeholder="Search premium movies..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  )
}
