import { AuthProvidingLayout } from "./lib/auth/auth.layout";
import { useAuth } from "./lib/hooks/useAuth";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RoadmapPage from "./pages/RoadmapPage";
import HomePage from "./pages/HomePage";

const DefaultRoute = () => {
  const user = useAuth()?.user;

  if (user) {
    return <Navigate to="/roadmap" replace />;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvidingLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path={"/auth"} element={<AuthPage />} />
      <Route path={"/roadmap"} element={<RoadmapPage />} />
    </Route>,
  ),
);

export default router;
