import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;