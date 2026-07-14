import { useState } from 'react';
import type { User } from '../types/user';

interface Props {
  user: User;
  onClose: () => void;
  onSave: (u: User) => void;
}

export function UserModal({ user, onClose, onSave }: Props) {
  const [name, setName] = useState(user.name);
  const [editing, setEditing] = useState(false);

  function save() {
    const val = name.trim();
    if (!val) return;
    onSave({ ...user, name: val });
    setEditing(false);
  }

  function cancel() {
    setName(user.name);
    setEditing(false);
  }

  const addr = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;
  const empty = !name.trim();

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <span className="text-xs font-medium text-gray-500 uppercase">Name</span>
            {editing ? (
              <>
                <input
                  className="border border-gray-300 w-full p-2 mt-1 rounded-lg"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
                {empty && (
                  <p className="text-red-600 text-sm mt-1">Name cannot be empty</p>
                )}
              </>
            ) : (
              <div className="flex items-center justify-between mt-1">
                <p
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => setEditing(true)}
                >
                  {name}
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.829-2.828z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 uppercase">Username</div>
              <div className="text-sm text-gray-900 mt-0.5">{user.username}</div>
            </div>
            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 uppercase">Email</div>
              <div className="text-sm text-gray-900 mt-0.5">{user.email}</div>
            </div>
            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 uppercase">Phone</div>
              <div className="text-sm text-gray-900 mt-0.5">{user.phone}</div>
            </div>
            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 uppercase">Website</div>
              <div className="text-sm text-gray-900 mt-0.5">{user.website}</div>
            </div>
            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 uppercase">Address</div>
              <div className="text-sm text-gray-900 mt-0.5">{addr}</div>
            </div>
            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 uppercase">Company</div>
              <div className="text-sm text-gray-900 mt-0.5">{user.company.name}</div>
            </div>
            <div className="py-2">
              <div className="text-xs font-medium text-gray-500 uppercase">Catchphrase</div>
              <div className="text-sm text-gray-900 mt-0.5">{user.company.catchPhrase}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 border-t border-gray-200">
          {editing ? (
            <>
              <button onClick={cancel} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                Cancel
              </button>
              <button
                onClick={save}
                disabled={empty}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Save
              </button>
            </>
          ) : (
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
