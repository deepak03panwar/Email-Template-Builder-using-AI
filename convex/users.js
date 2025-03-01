import { v } from "convex/values";

const { mutation } = require("./_generated/server");

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Attempting to create user with args:", args);

    try {
      // Execute the query using .collect() to fetch data
      const existingUsers = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();

      console.log("User query result:", existingUsers);

      // If no user exists, insert a new user
      if (existingUsers.length === 0) {
        console.log("No existing user found, inserting new user...");
        const result = await ctx.db.insert("users", {
          name: args.name,
          email: args.email,
          picture: args.picture,
          credits: 3, // Default value
        });

        console.log("User inserted successfully:", result);
        return result;
      } else {
        // User already exists
        console.log("Returning existing user:", existingUsers[0]);
        return existingUsers[0];
      }
    } catch (error) {
      console.error("Error in CreateUser mutation:", error);
      throw new Error("Failed to create or fetch user.");
    }
  },
});
