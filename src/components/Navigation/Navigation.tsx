interface NavigationProps {
  view: "list" | "form";
  onNavigate: (view: "list" | "form") => void;
}

export default function Navigation({ view, onNavigate }: NavigationProps) {
  return (
    <div className="navigation">
      {view === "form" ? (
        <button onClick={() => onNavigate("list")}>Back to Messages</button>
      ) : (
        <button onClick={() => onNavigate("form")}>New Message</button>
      )}
    </div>
  );
}
