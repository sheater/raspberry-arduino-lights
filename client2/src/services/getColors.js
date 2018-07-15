import gql from "graphql-tag"

const getColors = gql`
    query {
        colors {
            color
        }
    }
`;

export default getColors
