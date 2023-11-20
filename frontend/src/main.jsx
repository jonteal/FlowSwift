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
import { LoginScreen } from "./views/Auth/Login/LoginScreen.jsx";
import { RegisterScreen } from "./views/Auth/Signup/RegisterScreen.jsx";
import { ProfileScreen } from "./views/Settings/ProfileScreen";
import { AddClient } from "./views/Clients/AddClient";
import { PrivateRoute } from "./components/PrivateRoute";
import { MainDashboard } from "./views/homeView/MainDashboard/MainDashboard";
import { ClientView } from "./views/clientDashboard/ClientView/ClientView";
import { ClientDashboard } from "./views/clientDashboard/profile/ClientDashboard/ClientDashboard";
import { ClientBilling } from "./views/clientDashboard/billing/ClientBilling/ClientBilling";
import { ClientProjects } from "./views/clientDashboard/projects/ClientProjects/ClientProjects";
import { AddInvoice } from "./views/clientDashboard/billing/AddInvoice/AddInvoice";
import { AddTransaction } from "./views/clientDashboard/billing/AddTransaction/AddTransaction";
import { ProjectView } from "./views/clientDashboard/projects/ProjectView/ProjectView";
import { ProjectProfile } from "./views/clientDashboard/projects/ProjectProfile/ProjectProfile";
import { ProjectServices } from "./views/clientDashboard/projects/ProjectServices/ProjectServices";
import { ProjectService } from "./views/clientDashboard/projects/ProjectService/ProjectService";
import { EditService } from "./views/clientDashboard/projects/EditService/EditService";
import { ProjectActivity } from "./views/clientDashboard/projects/ProjectActivity/ProjectActivity";
import { ProjectFinancials } from "./views/clientDashboard/projects/ProjectFinancials/ProjectFinancials";
import { AddKanbanTicket } from "./views/clientDashboard/projects/AddKanbanTicket/AddKanbanTicket";
import { EditKanbanTicket } from "./views/clientDashboard/projects/EditKanbanTicket/EditKanbanTicket";
import { TicketView } from "./views/clientDashboard/projects/TicketView/TicketView";
import { ProjectInvoices } from "./views/clientDashboard/projects/ProjectInvoices/ProjectInvoices";
import { ProjectTransactions } from "./views/clientDashboard/projects/ProjectTransactions/ProjectTransactions";
import { ProjectTransaction } from "./views/clientDashboard/projects/ProjectTransaction/ProjectTransaction";
import { ProjectInvoice } from "./views/clientDashboard/projects/ProjectInvoice/ProjectInvoice";
import { AddService } from "./views/clientDashboard/projects/AddService/AddService";
import { EditProject } from "./views/clientDashboard/projects/EditProject/EditProject";
import { EditClient } from "./views/homeView/EditClient/EditClient";
import { ClientInvoices } from "./views/clientDashboard/billing/ClientInvoices/ClientInvoices";
import { ClientTransactionsView } from "./views/clientDashboard/billing/ClientTransactionsView/ClientTransactionsView";
import { AddProject } from "./views/clientDashboard/projects/AddProject/AddProject";
import { Clients } from "./views/Clients/Clients";
import { ClientsListByStatus } from "./views/Clients/ClientsListByStatus/ClientsListByStatus";
import { Projects } from "./views/Projects/Projects";
import { NotFound } from "./views/NotFound";
import { Settings } from "./views/Settings/Settings";
import { Documentation } from "./views/Settings/Documentation";
import { AddUser } from "./views/Organization/AddUser/AddUser";
import { AddOrganization } from "./views/Organization/AddOrganization/AddOrganization";
import { Features } from "./views/Features/Features";
import { NewKanban } from "./views/clientDashboard/projects/NewKanban/NewKanban";
import { AddKanban } from "./views/clientDashboard/projects/NewKanban/AddKanban";
import { KanbanView } from "./views/clientDashboard/projects/NewKanban/KanbanView";
import { KanbanEdit } from "./views/clientDashboard/projects/NewKanban/KanbanEdit";
import { Kanbans } from "./views/Kanbans/Kanbans.jsx";

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
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/settings" element={<Settings />}>
          <Route path="/settings/profile" element={<ProfileScreen />} />
          <Route path="/settings/documentation" element={<Documentation />} />
        </Route>
        <Route path="/addClient" element={<AddClient />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/addOrganization" element={<AddOrganization />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:clientId" element={<ClientView />}>
          <Route
            path="/clients/:clientId/dashboard"
            element={<ClientDashboard />}
          />
          <Route
            path="/clients/:clientId/billing"
            element={<ClientBilling />}
          />
          <Route
            path="/clients/:clientId/projects"
            element={<ClientProjects />}
          />
          <Route
            path="/clients/:clientId/addInvoice"
            element={<AddInvoice />}
          />
          <Route
            path="/clients/:clientId/addTransaction"
            element={<AddTransaction />}
          />
          <Route
            path="/clients/:clientId/projects/addProject"
            element={<AddProject />}
          />
          <Route
            path="/clients/:clientId/projects/:projectId"
            element={<ProjectView />}
          >
            <Route
              element={<ProjectProfile />}
              path="/clients/:clientId/projects/:projectId/profile"
            />
            <Route
              element={<ProjectServices />}
              path="/clients/:clientId/projects/:projectId/services"
            />
            {/* <Route
                    element={<ProjectServicesByProvider />}
                    path="/clients/:clientId/projects/:projectId/services/:serviceProvider"
                  /> */}
            <Route
              element={<ProjectService />}
              path="/clients/:clientId/projects/:projectId/services/:serviceId"
            />
            <Route
              element={<EditService />}
              path="/clients/:clientId/projects/:projectId/services/:serviceId/edit"
            />
            <Route
              element={<ProjectActivity />}
              path="/clients/:clientId/projects/:projectId/activity"
            />
            <Route
              element={<ProjectFinancials />}
              path="/clients/:clientId/projects/:projectId/financials"
            />
            <Route
              element={<NewKanban />}
              path="/clients/:clientId/projects/:projectId/kanbans"
            />
            <Route
              element={<AddKanban />}
              path="/clients/:clientId/projects/:projectId/kanbans/build"
            />
            <Route
              element={<KanbanView />}
              path="/clients/:clientId/projects/:projectId/kanbans/:kanbanId"
            />
            <Route
              element={<KanbanEdit />}
              path="/clients/:clientId/projects/:projectId/kanbans/:kanbanId/edit"
            />
            <Route
              element={<AddKanbanTicket />}
              path="/clients/:clientId/projects/:projectId/kanbans/:kanbanId/addTicket"
            />
            <Route
              element={<EditKanbanTicket />}
              path="/clients/:clientId/projects/:projectId/kanbans/:kanbanId/:ticketId/edit"
            />
            <Route
              element={<TicketView />}
              path="/clients/:clientId/projects/:projectId/kanbans/:kanbanId/:ticketId"
            />
            <Route
              element={<ProjectInvoices />}
              path="/clients/:clientId/projects/:projectId/financials/invoices"
            />
            <Route
              element={<ProjectTransactions />}
              path="/clients/:clientId/projects/:projectId/financials/transactions"
            />
            <Route
              element={<ProjectTransaction />}
              path="/clients/:clientId/projects/:projectId/financials/transactions/:transactionId"
            />
            <Route
              element={<ProjectInvoice />}
              path="/clients/:clientId/projects/:projectId/financials/invoices/:invoiceId"
            />
            <Route
              path="/clients/:clientId/projects/:projectId/addService"
              element={<AddService />}
            />
            <Route
              path="/clients/:clientId/projects/:projectId/edit"
              element={<EditProject />}
            />
          </Route>

          <Route path="/clients/:clientId/edit" element={<EditClient />} />
          <Route
            path="/clients/:clientId/billing/invoices"
            element={<ClientInvoices />}
          />
          <Route
            path="/clients/:clientId/billing/transactions"
            element={<ClientTransactionsView />}
          />
        </Route>
        <Route path="/clients/list/:status" element={<ClientsListByStatus />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/kanbans" element={<Kanbans />} />
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
