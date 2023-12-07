const typeDefs = `

type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

input BookInput {
    _id: ID
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!  
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

input UserInput {
    _id: ID
    username: String
    email: String
    password: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(user: UserInput!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}

`;

module.exports = typeDefs;
