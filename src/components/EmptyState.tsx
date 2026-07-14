interface Props {
  filtered: boolean;
}

export function EmptyState({ filtered }: Props) {
  return (
    <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
      <p className="text-gray-500 text-lg">
        {filtered ? 'No users match your search.' : 'No users found.'}
      </p>
    </div>
  );
}
