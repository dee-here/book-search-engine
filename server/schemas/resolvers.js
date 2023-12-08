const User = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
console.log("=======================================")
console.log(context.user)
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select("-__v -password")
            .populate("savedBooks");
          console.log(userData)
          return userData;
        }
        // Throw authentication Error
        throw AuthenticationError;
      } catch(error){
        console.log(error)
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, {user}) => {
      try{
        console.log("==============Login_++++++++++++++++++++++++++")
        console.log("user is: ", user);
        const userData = await User.findOne({email: user.email});
        
        if (!userData) {
          console.log("couldn't find")
          throw AuthenticationError;
        }
        
        const correctPw = await userData.isCorrectPassword(user.password);
        if (!correctPw) {
          console.log('wrong password')
          throw AuthenticationError;
        }
        
        const token = signToken(userData);

        return { token, userData };
      } catch(error){
        console.log(error)
      }
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError();
    },
    removeBook: async (parent, { bookId }, context) => {
      try{
        console.log("+==================================")
        console.log("Hellooooooo")
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError();
      } catch(err){
        console.log(err)
      }
    },
  },
};

module.exports = resolvers;
