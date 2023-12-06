const typeDefs = `

type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Query {
    user(id: ID!): User
    users: [User]
}
`;

module.exports = typeDefs;
