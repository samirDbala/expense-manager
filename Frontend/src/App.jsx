import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import toast, { Toaster } from "react-hot-toast";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";
import { loginAction } from "./actions/loginAction";
import { deleteBudget } from "./actions/deleteBudget";


// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Registration from "./pages/Registration";
import Error from "./pages/Error";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

// NEW — login page import
import Login from "./pages/Login";
import { deleteUserAction } from "./actions/deleteUserAction";
import { githubLoginAction } from "./actions/githubLoginAction,";
import { registerAction } from "./actions/registerAction";
import LandingPage from "./pages/LandingPage";
import { landingLoader } from "./loaders/landingLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <Error />,
        loader: landingLoader,
      },

      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },

      {
        path: 'registration',
        element: <Registration />,
        action: registerAction,
        errorElement: <Error />,
      },

      // NEW — login route (added only, no other code touched)
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Error />,
      },

      {
        path: "auth/github",
        loader: githubLoginAction,
        errorElement: <Error />,
      },

      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },

      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },

      {
        path: "delete",
        action: deleteUserAction,
      },

      {
        path: "logout",
        action: logoutAction,
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
