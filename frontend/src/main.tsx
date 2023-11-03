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

// @ts-ignore
import { ThemeProvider } from "./context.jsx";
// @ts-ignore
import { App } from "./App.jsx";
// @ts-ignore
import { Home } from "./views/homeView/Home/Home.jsx";
// @ts-ignore
import { LoginScreen } from "./views/Auth/Login/LoginScreen.jsx";
// @ts-ignore
import { RegisterScreen } from "./views/Auth/Signup/RegisterScreen.jsx";
// @ts-ignore
import { ProfileScreen } from "./views/Settings/ProfileScreen.jsx";
// @ts-ignore
import { AddClient } from "./views/Clients/AddClient.jsx";
// @ts-ignore
import { PrivateRoute } from "./components/PrivateRoute.jsx";
// @ts-ignore
import { MainDashboard } from "./views/homeView/MainDashboard/MainDashboard.jsx";
// @ts-ignore
import { ClientView } from "./views/clientDashboard/ClientView/ClientView.jsx";
// @ts-ignore
import { ClientDashboard } from "./views/clientDashboard/profile/ClientDashboard/ClientDashboard.jsx";
// @ts-ignore
import { ClientBilling } from "./views/clientDashboard/billing/ClientBilling/ClientBilling.jsx";
// @ts-ignore
import { ClientProjects } from "./views/clientDashboard/projects/ClientProjects/ClientProjects.jsx";
// @ts-ignore
import { AddInvoice } from "./views/clientDashboard/billing/AddInvoice/AddInvoice.jsx";
// @ts-ignore
import { AddTransaction } from "./views/clientDashboard/billing/AddTransaction/AddTransaction.jsx";
// @ts-ignore
import { ProjectView } from "./views/clientDashboard/projects/ProjectView/ProjectView.jsx";
// @ts-ignore
import { ProjectProfile } from "./views/clientDashboard/projects/ProjectProfile/ProjectProfile.jsx";
// @ts-ignore
import { ProjectServices } from "./views/clientDashboard/projects/ProjectServices/ProjectServices.jsx";
// @ts-ignore
import { ProjectService } from "./views/clientDashboard/projects/ProjectService/ProjectService.jsx";
// @ts-ignore
import { EditService } from "./views/clientDashboard/projects/EditService/EditService.jsx";
// @ts-ignore
import { ProjectActivity } from "./views/clientDashboard/projects/ProjectActivity/ProjectActivity.jsx";
// @ts-ignore
import { ProjectFinancials } from "./views/clientDashboard/projects/ProjectFinancials/ProjectFinancials.jsx";
// @ts-ignore
import { ProjectKanban } from "./views/clientDashboard/projects/ProjectKanban/ProjectKanban.jsx";
// @ts-ignore
import { AddKanbanTicket } from "./views/clientDashboard/projects/AddKanbanTicket/AddKanbanTicket.jsx";
// @ts-ignore
import { EditKanbanTicket } from "./views/clientDashboard/projects/EditKanbanTicket/EditKanbanTicket.jsx";
// @ts-ignore
import { TicketView } from "./views/clientDashboard/projects/TicketView/TicketView.jsx";
// @ts-ignore
import { ProjectInvoices } from "./views/clientDashboard/projects/ProjectInvoices/ProjectInvoices.jsx";
// @ts-ignore
import { ProjectTransactions } from "./views/clientDashboard/projects/ProjectTransactions/ProjectTransactions.jsx";
// @ts-ignore
import { ProjectTransaction } from "./views/clientDashboard/projects/ProjectTransaction/ProjectTransaction.jsx";
// @ts-ignore
import { ProjectInvoice } from "./views/clientDashboard/projects/ProjectInvoice/ProjectInvoice.jsx";
// @ts-ignore
import { AddService } from "./views/clientDashboard/projects/AddService/AddService.jsx";
// @ts-ignore
import { EditProject } from "./views/clientDashboard/projects/EditProject/EditProject.jsx";
// @ts-ignore
import { EditClient } from "./views/homeView/EditClient/EditClient.jsx";
// @ts-ignore
import { ClientInvoices } from "./views/clientDashboard/billing/ClientInvoices/ClientInvoices.jsx";
// @ts-ignore
import { ClientTransactionsView } from "./views/clientDashboard/billing/ClientTransactionsView/ClientTransactionsView.jsx";
// @ts-ignore
import { AddProject } from "./views/clientDashboard/projects/AddProject/AddProject.jsx";
// @ts-ignore
import { Clients } from "./views/Clients/Clients.jsx";
// @ts-ignore
import { ClientsListByStatus } from "./views/Clients/ClientsListByStatus/ClientsListByStatus.jsx";
// @ts-ignore
import { Projects } from "./views/Projects/Projects.jsx";
// @ts-ignore
import { NotFound } from "./views/NotFound.jsx";
// @ts-ignore
import { Settings } from "./views/Settings/Settings.jsx";
// @ts-ignore
import { Documentation } from "./views/Settings/Documentation.jsx";
// @ts-ignore
import { AddUser } from "./views/Organization/AddUser/AddUser.jsx";
// @ts-ignore
import { AddOrganization } from "./views/Organization/AddOrganization/AddOrganization.jsx";
// @ts-ignore
import { Features } from "./views/Features/Features.jsx";
// @ts-ignore
import { Features } from "./views/Features/Features";
// @ts-ignore
import { NewKanban } from "./views/clientDashboard/projects/NewKanban/NewKanban";
// @ts-ignore
import { AddKanban } from "./views/clientDashboard/projects/NewKanban/AddKanban";
// @ts-ignore
import { KanbanView } from "./views/clientDashboard/projects/NewKanban/KanbanView";
// @ts-ignore
import { KanbanEdit } from "./views/clientDashboard/projects/NewKanban/KanbanEdit";
// @ts-ignore
import store from "./store.js";

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
              element={<ProjectKanban />}
              path="/clients/:clientId/projects/:projectId/kanban"
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
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/clients/list/:status" element={<ClientsListByStatus />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);
// @ts-ignore
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
