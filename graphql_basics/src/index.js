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
    published: true,
    author: '1'
},
{
    id: '2',
    title: 'what happened?',
    body: 'what happened to you today?',
    published: false,
    author: '2'
},
{
    id: '3',
    title: 'out today',
    body: 'Sorry, I had to leave today to pick up my kids',
    published: true,
    author: '3'
}]

const comments = [{
    id: '1',
    text: "I love JavaScript.  Best language in my opinion!",
    author: '1',
    post: '1'
},
{
    id: '2',
    text: "Sorry, I had to go to the doctor!:(",
    author: '2',
    post: '2'
},
{
    id: '3',
    text: "Picking up the kids takes sooooooo long!",
    author: '3',
    post: '3'
},
{
    id: '4',
    text: "JavaScript sucks!!",
    author: '3',
    post: '1'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        comments(parent,args,ctx,info) {
            return comments
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
                id: '3',
                title: 'GraphQL is cool!',
                body: "I think I'm going to start using GraphQL now!",
                published: false
            }
        }
    },
    Post: {
        author(parent,args,ctx,info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent,args,ctx,info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent,args,ctx,info) {
            return posts.filter((post) => {
                return parent.id === post.author
            })
        },
        comments(parent,args,ctx,info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent,args,ctx,info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent,args,ctx,info) {
            return posts.find((post) => {
                return post.id === parent.author
            })
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