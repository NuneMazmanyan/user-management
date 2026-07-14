interface Props {
  search: string;
  setSearch: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  cities: string[];
}

export function Controls({ search, setSearch, city, setCity, cities }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        className="border border-gray-300 p-2 rounded-lg w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        className="border border-gray-300 p-2 rounded-lg sm:w-48"
        value={city}
        onChange={e => setCity(e.target.value)}
      >
        <option value="">All cities</option>
        {cities.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
