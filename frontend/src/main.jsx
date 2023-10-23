import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context";
import { App } from "./App.jsx";
import { HomeScreen } from "./views/HomeScreen.jsx";
import { LoginScreen } from "./views/LoginScreen.jsx";
import { RegisterScreen } from "./views/RegisterScreen.jsx";
import { ProfileScreen } from "./views/ProfileScreen";
import { AddClient } from "./views/AddClient";
import { Home } from "./views/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/addClient" element={<AddClient />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ApolloProvider>
    </ThemeProvider>
  </Provider>
);
