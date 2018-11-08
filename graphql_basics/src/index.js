import { GraphQLServer } from 'graphql-yoga'

//Operation Arguments
//Using () next to the query we can add operation arguments
//Inside the (), we can add as many arguments as we want specifiying the name and type like below
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(a: Float!, b: Float!): Float!
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

//Inside the method, we pass in the 4 arguments that graphql provide: parent, args, ctx, and info
//'args' is an object containing all the arguments we pass in
//So, for example, I'm getting the 'name' and 'position' using 'args.name' and 'args.position'
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
            return args.a + args.b
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