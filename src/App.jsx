import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import AboutPage from "./pages/AboutPage.jsx";
import AddBookPage from "./pages/AddBookPage.jsx";
import CreateListingPage from "./pages/CreateListingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ListingDetailsPage from "./pages/ListingDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MarketplacePage from "./pages/MarketplacePage.jsx";
import MyBooksPage from "./pages/MyBooksPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import { listings } from "./data/listings.js";

function ProtectedRoute({ children }) {
  const isAuthenticated =
    localStorage.getItem("thebridge:authenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function ListingRoute() {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === id);

  return <ListingDetailsPage listing={listing} />;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/listing/:id" element={<ListingRoute />} />

        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <MyBooksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBookPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-listing"
          element={
            <ProtectedRoute>
              <CreateListingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <RequestsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
