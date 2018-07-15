import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const addColor = gql`
    mutation ($color: String!) {
        addColor (color: $color) { color }
    }
`

export default addColor
