//named exports - has a name, have as many as needed
//default export - has no name, can only have one

const message = 'Hello, GraphQL!'

const name = 'Chris'

const location = 'Dallas'

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export {message, name, getGreeting, location as default}