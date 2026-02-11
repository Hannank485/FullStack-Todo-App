import prisma from "../prismaClient";

const authModels = {
  // GET DATA BY USERNAME
  async findUser(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  },
  // REGISTER A USER
  async register(username: string, password: string) {
    try {
      const result = await prisma.user.create({
        data: {
          username: username,
          password: password,
        },
      });
      return result.id;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw err;
      } else {
        console.log("Something went wrong", err);
        throw err;
      }
    }
  },
};

export default authModels;
