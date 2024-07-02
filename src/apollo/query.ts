import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Query ($take: Int, $skip: Int){
    users (take: $take, skip: $skip) {
      name
      email
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($data: UserCreateInput!) {
    createOneUser(data: $data) {
      email
      id
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
      email
      name
    }
  }
`;

export const RESET_TOKENS = gql`
  query ResetTokens {
    resetTokens {
      email
      id
      resetId
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateOneUser(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateOneUser(data: $data, where: $where) {
      id
      name
      email
    }
  }
`;
