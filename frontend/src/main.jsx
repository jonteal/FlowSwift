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
import { App } from "./App.jsx";
import { Home } from "./views/homeView/Home/Home";
import { LoginScreen } from "./views/Auth/Login/LoginScreen";
import { RegisterScreen } from "./views/Auth/Signup/RegisterScreen.jsx";
import { ProfileScreen } from "./views/Settings/ProfileScreen";
import { AddClient } from "./views/Clients/AddClient";
import { PrivateRoute } from "./components/PrivateRoute";
import { MainDashboard } from "./views/homeView/MainDashboard/MainDashboard.tsx";
import { ClientView } from "./views/clientDashboard/ClientView/ClientView";
import { ClientDashboard } from "./views/clientDashboard/profile/ClientDashboard/ClientDashboard";
import { ClientBilling } from "./views/clientDashboard/billing/ClientBilling/ClientBilling";
import { ClientProjects } from "./views/clientDashboard/projects/ClientProjects";
import { AddInvoice } from "./views/clientDashboard/billing/AddInvoice/AddInvoice";
import { AddTransaction } from "./views/clientDashboard/billing/AddTransaction/AddTransaction";
import { ProjectView } from "./views/clientDashboard/projects/ProjectView";
import { ProjectProfile } from "./views/clientDashboard/projects/ProjectProfile";
import { ProjectServices } from "./views/clientDashboard/projects/ProjectServices";
import { ProjectService } from "./views/clientDashboard/projects/ProjectService";
import { EditService } from "./views/clientDashboard/projects/EditService";
import { ProjectActivity } from "./views/clientDashboard/projects/ProjectActivity";
import { ProjectFinancials } from "./views/clientDashboard/projects/ProjectFinancials";
import { AddKanbanTicket } from "./views/clientDashboard/projects/AddKanbanTicket";
import { EditKanbanTicket } from "./views/clientDashboard/projects/EditKanbanTicket";
import { TicketView } from "./views/clientDashboard/projects/TicketView";
import { ProjectInvoices } from "./views/clientDashboard/projects/ProjectInvoices";
import { ProjectTransactions } from "./views/clientDashboard/projects/ProjectTransactions";
import { ProjectTransaction } from "./views/clientDashboard/projects/ProjectTransaction";
import { ProjectInvoice } from "./views/clientDashboard/projects/ProjectInvoice";
import { AddService } from "./views/clientDashboard/projects/AddService";
import { EditProject } from "./views/clientDashboard/projects/EditProject";
import { EditClient } from "./views/homeView/EditClient/EditClient";
import { ClientInvoices } from "./views/clientDashboard/billing/ClientInvoices/ClientInvoices";
import { ClientTransactionsView } from "./views/clientDashboard/billing/ClientTransactionsView";
import { AddProject } from "./views/clientDashboard/projects/AddProject";
import { Clients } from "./views/Clients/Clients";
import { ClientsListByStatus } from "./views/Clients/ClientsListByStatus/ClientsListByStatus";
import { Projects } from "./views/Projects/Projects";
import { NotFound } from "./views/NotFound";
import { Settings } from "./views/Settings/Settings";
import { Documentation } from "./views/Settings/Documentation";
import { AddUser } from "./views/Organization/AddUser";
import { Features } from "./views/Features/Features";
import { NewKanban } from "./views/clientDashboard/projects/NewKanban/NewKanban";
import { AddKanban } from "./views/clientDashboard/projects/NewKanban/AddKanban";
import { KanbanView } from "./views/clientDashboard/projects/NewKanban/KanbanView";
import { KanbanEdit } from "./views/clientDashboard/projects/NewKanban/KanbanEdit";
import { Kanbans } from "./views/Kanbans/Kanbans.tsx";
import { AddOrganization } from "./views/Organization/AddOrganization";
import { OrganizationView } from "./views/Organization/OrganizationView";
import { OrganizationProfile } from "./views/Organization/OrganizationProfile";
import { OrganizationFinancials } from "./views/Organization/OrganizationFinancials";
import { OrganizationEmployees } from "./views/Organization/OrganizationEmployees";
import { EmployeeProfile } from "./views/Organization/EmployeeProfile";

import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        organizations: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        invoices: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        transactions: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        services: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projectActivityComments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        clientActivityComments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        clientActivityCommentReplies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projectActivityCommentReplies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        tickets: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        kanbans: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        kanbanStatusColumns: {
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
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/settings" element={<Settings />}>
          <Route path="/settings/profile" element={<ProfileScreen />} />
          <Route path="/settings/documentation" element={<Documentation />} />
        </Route>
        <Route path="/addOrganization" element={<AddOrganization />} />
        <Route
          path="/organizations/:organizationId"
          element={<OrganizationView />}
        >
          <Route
            path="/organizations/:organizationId/profile"
            element={<OrganizationProfile />}
          />
          <Route
            path="/organizations/:organizationId/financials"
            element={<OrganizationFinancials />}
          />
          <Route
            path="/organizations/:organizationId/addClient"
            element={<AddClient />}
          />
          <Route
            path="/organizations/:organizationId/addUser"
            element={<AddUser />}
          />
          <Route
            path="/organizations/:organizationId/:userId/profile"
            element={<EmployeeProfile />}
          />
          <Route
            path="/organizations/:organizationId/employees"
            element={<OrganizationEmployees />}
          />
          <Route
            path="/organizations/:organizationId/clients"
            element={<Clients />}
          />
          <Route
            path="/organizations/:organizationId/dashboard"
            element={<MainDashboard />}
          />
          <Route
            path="/organizations/:organizationId/clients/:clientId"
            element={<ClientView />}
          >
            <Route
              path="/organizations/:organizationId/clients/:clientId/dashboard"
              element={<ClientDashboard />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/billing"
              element={<ClientBilling />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/projects"
              element={<ClientProjects />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/addInvoice"
              element={<AddInvoice />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/addTransaction"
              element={<AddTransaction />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/projects/addProject"
              element={<AddProject />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/projects/:projectId"
              element={<ProjectView />}
            >
              <Route
                element={<ProjectProfile />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/profile"
              />
              <Route
                element={<ProjectServices />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/services"
              />
              {/* <Route
                    element={<ProjectServicesByProvider />}
                    path="/clients/:clientId/projects/:projectId/services/:serviceProvider"
                  /> */}
              <Route
                element={<ProjectService />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/services/:serviceId"
              />
              <Route
                element={<EditService />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/services/:serviceId/edit"
              />
              <Route
                element={<ProjectActivity />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/activity"
              />
              <Route
                element={<ProjectFinancials />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/financials"
              />
              <Route
                element={<NewKanban />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans"
              />
              <Route
                element={<AddKanban />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans/build"
              />
              <Route
                element={<KanbanView />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans/:kanbanId"
              />
              <Route
                element={<KanbanEdit />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans/:kanbanId/edit"
              />
              <Route
                element={<AddKanbanTicket />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans/:kanbanId/addTicket"
              />
              <Route
                element={<EditKanbanTicket />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans/:kanbanId/:ticketId/edit"
              />
              <Route
                element={<TicketView />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/kanbans/:kanbanId/:ticketId"
              />
              <Route
                element={<ProjectInvoices />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/financials/invoices"
              />
              <Route
                element={<ProjectTransactions />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/financials/transactions"
              />
              <Route
                element={<ProjectTransaction />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/financials/transactions/:transactionId"
              />
              <Route
                element={<ProjectInvoice />}
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/financials/invoices/:invoiceId"
              />
              <Route
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/addService"
                element={<AddService />}
              />
              <Route
                path="/organizations/:organizationId/clients/:clientId/projects/:projectId/edit"
                element={<EditProject />}
              />
            </Route>

            <Route
              path="/organizations/:organizationId/clients/:clientId/edit"
              element={<EditClient />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/billing/invoices"
              element={<ClientInvoices />}
            />
            <Route
              path="/organizations/:organizationId/clients/:clientId/billing/transactions"
              element={<ClientTransactionsView />}
            />
          </Route>
          <Route
            path="/organizations/:organizationId/clients/list/:status"
            element={<ClientsListByStatus />}
          />
          <Route
            path="/organizations/:organizationId/projects"
            element={<Projects />}
          />
          <Route
            path="/organizations/:organizationId/kanbans"
            element={<Kanbans />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ApolloProvider>
  </Provider>
);
