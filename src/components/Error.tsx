interface Props {
  message: string;
  onRetry?: () => void;
}

export function Error({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-red-600 font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
