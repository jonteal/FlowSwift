import User from "../models/userModel.js";
import Client from "../models/Client.js";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLEnumType,
  GraphQLBoolean,
} from "graphql";

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    emailAddress: { type: GraphQLString },
    companyName: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a Client
    addClient: {
      type: ClientType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClientStatus",
            values: {
              lead: { value: "Lead" },
              prospect: { value: "Prospect" },
              current: { value: "Current" },
              former: { value: "Former" },
              cold: { value: "Cold" },
            },
          }),
          defaultValue: "Prospect",
        },
      },
      resolve(parent, args) {
        const client = new Client({
          userId: args.userId,
          firstName: args.firstName,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
          emailAddress: args.emailAddress,
          companyName: args.companyName,
          status: args.status,
        });

        return client.save();
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },

    // Edit a Client Name
    updateClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClientStatusUpdate",
            values: {
              lead: { value: "Lead" },
              prospect: { value: "Prospect" },
              current: { value: "Current" },
              former: { value: "Former" },
              cold: { value: "Cold" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              phoneNumber: args.phoneNumber,
              emailAddress: args.emailAddress,
              companyName: args.companyName,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export { schema };
