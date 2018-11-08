import { GraphQLServer } from 'graphql-yoga'

// Type definitions (Schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`


// Resolvers (Set of functions that are run when various operations are performed)
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Joe Somebody'
        },
        location() {
            return 'Dallas,TX'
        },
        bio() {
            return 'I am a Professor of Web Development'
        }
    }
}

//Here, we create our server with a new instance of GraphQLServer and provide the properies above
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

//Automatically starts server on port 4000
server.start(() => {
    console.log('The server is up!')
})