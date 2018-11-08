import { GraphQLServer } from 'graphql-yoga'

// 5 Scaler Types (Scaler means it can store a single value)
// String, Boolean, Int, Float, ID

// Type definitions (Schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        isEmployed: Boolean!   
        gpa: Float
    }
`
//'!' at the end of our schema queries mean we always want that 'type' back and not 'null'

// Resolvers (Set of functions that are run when various operations are performed)
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Chris'
        },
        age() {
            return 35
        },
        isEmployed() {
            return true
        },
        gpa() {
            return 3.5
        }
    }
}



const eProduct = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

const eProductResolvers = {
    Query: {
        title() {
            return 'iPhone'
        },
        price() {
            return 749.99
        },
        releaseYear() {
            return 2007
        },
        rating() {
            return 4.89
        },
        inStock() {
            return true
        }
    }
}

//Here, we create our server with a new instance of GraphQLServer and provide the properies above
const server = new GraphQLServer({
    typeDefs: eProduct,
    resolvers: eProductResolvers
})

//Automatically starts server on port 4000
server.start(() => {
    console.log('The server is up!')
})