import { gql } from "graphql-request";

export const queryPools = () => {
  return gql`
    {
      lendingPoolCreateds {
        blockNumber
        id
        lendingPool
        collateralToken
        borrowToken
        ltv
      }
    }
  `;
};
