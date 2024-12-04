interface NavigationProps {
  view: "list" | "form";
  onNavigate: (view: "list" | "form") => void;
}

export default function Navigation({ view, onNavigate }: NavigationProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      {view === "list" ? (
        <button
          onClick={() => onNavigate("form")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Message
        </button>
      ) : (
        <button
          onClick={() => onNavigate("list")}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Back to Messages
        </button>
      )}
    </div>
  );
}
