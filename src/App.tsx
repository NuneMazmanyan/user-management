import { useState, useMemo } from 'react';
import type { User } from './types/user';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { Controls } from './components/Controls';
import { EmptyState } from './components/EmptyState.tsx';
import { useFetchUsers } from './hooks/useFetchUsers';
import { storage } from './utils/storage';

export default function App() {
  const { users: fetched, loading, error, refetch } = useFetchUsers();
  const [edits, setEdits] = useState(storage.getEdits);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<User | null>(null);

  const users = useMemo(
    () => fetched.map(u => (edits[u.id] ? { ...u, ...edits[u.id] } : u)),
    [fetched, edits]
  );

  const cities = useMemo(
    () => [...new Set(users.map(u => u.address.city))].sort(),
    [users]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users
      .filter(u => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .filter(u => !city || u.address.city === city)
      .sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }, [users, search, city, asc]);

  function saveUser(u: User) {
    storage.saveEdit(u.id, { name: u.name });
    setEdits(storage.getEdits());
    setSelected(null);
  }

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>
        <Controls
          search={search}
          setSearch={setSearch}
          city={city}
          setCity={setCity}
          cities={cities}
        />
        {filtered.length === 0 ? (
          <EmptyState filtered={!!search || !!city} />
        ) : (
          <UserTable
            users={filtered}
            asc={asc}
            onSort={() => setAsc(s => !s)}
            onSelect={setSelected}
          />
        )}
        {selected && (
          <UserModal
            user={selected}
            onClose={() => setSelected(null)}
            onSave={saveUser}
          />
        )}
      </div>
    </div>
  );
}
