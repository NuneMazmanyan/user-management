import type { User } from '../types/user';
interface Props {
  users: User[];
  asc: boolean;
  onSort: () => void;
  onSelect: (u: User) => void;
}

export const UserTable = ({ users, asc, onSort, onSelect }: Props) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-200">
          <th className="p-4 text-xs font-semibold uppercase">
            <button onClick={onSort} className="text-blue-600 hover:text-blue-800 cursor-pointer">
              Name {asc ? '↑' : '↓'}
            </button>
          </th>
          <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
          <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Company</th>
          <th className="p-4 text-xs font-semibold text-gray-500 uppercase">City</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr
            key={u.id}
            onClick={() => onSelect(u)}
            className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer"
          >
            <td className="p-4 text-sm font-medium text-gray-900">{u.name}</td>
            <td className="p-4 text-sm text-gray-600">{u.email}</td>
            <td className="p-4 text-sm text-gray-600">{u.company.name}</td>
            <td className="p-4 text-sm text-gray-600">{u.address.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
