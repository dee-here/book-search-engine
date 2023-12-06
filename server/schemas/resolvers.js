const User = require("../models/User");
const bookSchema = require("../models/Book");

const resolvers = {
  Query: {
    user: async (_, { user = null, params }) => {
      try {
        const foundUser = await User.findOne({
          $or: [
            { _id: user ? user._id : params.id },
            { username: params.username },
          ],
        });
        if (!foundUser) {
          throw new Error("Cannot find a user with this id or username!");
        }

        return foundUser;
      } catch (error) {
        throw new Error(error);
      }
    },
    users: async () => {
      return await User.find({});
    },
  },
  // Mutation: {

  // }
};

module.exports = resolvers;
