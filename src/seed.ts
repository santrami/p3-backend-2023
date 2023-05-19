import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.createMany({
  data: [
    {
      name: "Juliana",
      surname: "Vallejo",
      email: "julim@upc.edu",
      username: "julianam",
      password: "fullstack123",
    },
    {
      email: "santiago@upc.com",
      name: "santiago",
      surname: "ramirez",
      username: "santrami",
      password: "fullstack123",
    },
    {
      name: "juan",
      surname: "pérez",
      email: "juan@upc.edu",
      username: "juancho",
      password: "fullstack123",
    },
    {
      name: "pedro",
      surname: "ramos",
      email: "pedro@upc.edu",
      username: "peter",
      password: "fullstack123",
    },
  ],
});

await prisma.post.createMany({
  data: [
    {
      authorId: 1,
      content: "Este es mi primer post",
    },
    {
      authorId: 1,
      content: "Este es mi segundo post",
    },
    {
      authorId: 2,
      content: "Este es mi tercer post",
    },
    {
      authorId: 3,
      content: "Este es mi cuarto post",
    },
    {
      authorId: 4,
      content: "Este es mi quinto post",
    },
  ],
});
