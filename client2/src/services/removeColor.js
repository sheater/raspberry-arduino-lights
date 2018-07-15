import gql from 'graphql-tag'

const removeColor = gql`
    mutation ($color: String!) {
        removeColor (color: $color) { color }
    }
`

export default removeColor
