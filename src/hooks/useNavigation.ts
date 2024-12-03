import { useState } from "react";

type View = "list" | "form";

export function useNavigation() {
  const [currentView, setCurrentView] = useState<View>("list");

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  return {
    currentView,
    navigateTo,
  };
}
