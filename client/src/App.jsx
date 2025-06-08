import Dock from "./components/utils/Dock";
import Navbar from "./components/utils/Navbar";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Dock />
    </>
  );
}
export default App;
