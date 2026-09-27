import { useEffect, useState } from "react";
import BottomNavigation from "./BottomNavigation.jsx";
import Sidebar from "./Sidebar.jsx";
import TopHeader from "./TopHeader.jsx";

function AppShell({
  children,
  activePage = "home",
  title = "TheBridge",
  subtitle = "Find your next book connection",
}) {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    try {
      localStorage.setItem("thebridge:theme", isDark ? "dark" : "light");
    } catch {
      return undefined;
    }
  }, [isDark]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        activePage={activePage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((current) => !current)}
      />

      <div
        className={`min-h-screen transition-[padding] duration-200 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <TopHeader
          title={title}
          subtitle={subtitle}
          isDark={isDark}
          isOnline={isOnline}
          onToggleTheme={() => setIsDark((current) => !current)}
        />

        <main className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <BottomNavigation activePage={activePage} />
    </div>
  );
}

export default AppShell;
