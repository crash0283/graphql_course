import { GraphQLServer } from 'graphql-yoga'

//Using Arrays
//For the 'grades' query, we want it to take an array of integers and we provided the '!'
//so that we will not get 'null' back and always get an array back
//We changed our 'add' query to take a 'numbers' argument that takes an array of floats
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//For our grades resolver, we just retured an array of numbers
//For our add resolver, we checked to see if length was 0
//Otherwise, we use the 'reduce' array method to add up any amount of numbers we pass in
//When we check this in the 'playground', we provide something like this: add(numbers: [1,3,4,6])
const resolvers = {
    Query: {
        greeting(parent,args,ctx,info) {
            if(args.name && args.position) {
                return `Hello, ${args.name}! You are my favorite ${args.position}`
            } else {
                return 'Hello!'
            }
            
        },
        add(parent,args,ctx,info) {
            if(args.numbers.length === 0) {
                return 0
            }

            return args.numbers.reduce((prev,next) => prev + next )
        },
        grades(parent,args,ctx,info) {
            return [99,80,90]
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28
            }
        },
        post() {
            return {
                id: '39sdkd83jf8438nf8i4kd9',
                title: 'GraphQL is cool!',
                body: "I think I'm going to start using GraphQL now!",
                published: false
            }
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