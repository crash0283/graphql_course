import { GraphQLServer } from 'graphql-yoga'

//Using Arrays
//For the 'grades' query, we want it to take an array of integers and we provided the '!'
//so that we will not get 'null' back and always get an array back
//We changed our 'add' query to take a 'numbers' argument that takes an array of floats

//demo user static data (later this will come from the database)
const users = [{
    id: '1',
    name: 'Chris',
    email: 'chris@somewhere.com',
    age: 35
},
{
    id: '2',
    name: 'Suzanne',
    email: 'suzanne@somewhere.com'
},
{
    id: '3',
    name: 'Bob',
    email: 'bob@somewhere.com',
    age: 21
}]

const posts = [{
    id: '1',
    title: 'learning javascript',
    body: 'learned about javascript objects today!',
    published: true
},
{
    id: '2',
    title: 'what happened?',
    body: 'what happened to you today?',
    published: false
},
{
    id: '3',
    title: 'out today',
    body: 'Sorry, I had to leave today to pick up my kids',
    published: true
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        users(parent,args,ctx,info) {
            if(!args.query) {
                return users
            } else {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
            
        },
        posts(parent,args,ctx,info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            })
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