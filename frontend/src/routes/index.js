import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MainPage from '../pages/Main/MainPage';
import ListaFeedback from "../pages/Feedback/ListaFeedback";
import ListaPrezenta from "../pages/Prezenta/ListaPrezenta";
import FeedbackStudent from "../pages/Feedback/FeedbackStudent";
import ProfilePage from "../pages/Profile/Profile";
import Logout from "../pages/Login/Logout";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import MenuAppBar from "../components/MenuAppBar/MenuAppBar";
import Footer from "../components/Footer/Footer";
import ErrorPage from "../pages/ErrorPage";
import { useIsProfessor } from "../provider/isProfessorProvider";
import { useUserId } from "../provider/userIdProvider";
const Routes = () => {
  const { token } = useAuth();
  const {isProfessor, setIsProfessor} = useIsProfessor();
  const {userId} = useUserId();
  // Define public routes accessible to all users
  function Layout() {
    return(
    <>
      <MenuAppBar/>
      <Outlet/>
      <Footer/>
    </>)
  }

  const routesForPublic = [
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <MainPage isProfessor={isProfessor} userId={userId}/>,
        },
        {
            path: "/listaFeedback/:idProfesor/:idActivitate",
            element: <ListaFeedback />,
        },
        {
            path: "/listaPrezenta/:idActivitate",
            element: <ListaPrezenta />,
        },
        {
            path: "/feedbackActivitate/:idActivitate",
            element: <FeedbackStudent isProfessor={isProfessor}  />,
        },
        {
          path: "/profile/:idUser",
          element: <ProfilePage isProfessor={isProfessor} />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
      ]
    }
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
