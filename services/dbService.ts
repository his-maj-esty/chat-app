import { PrismaClient } from "@prisma/client";

export class dbService {
  static client: PrismaClient;

  constructor() {
    if (!dbService.client) {
      dbService.client = new PrismaClient();
    }
  }

  async addMessage({
    roomId,
    message,
    email,
  }: {
    roomId: string;
    message: string;
    email: string;
  }) {
    const res = await dbService.client.message.create({
      data: {
        content: message,
        sender: email,
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });
  }

  async addUser({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{
    email: string;
  }> {
    const res = await dbService.client.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      select: {
        email: true,
      },
    });

    return res;
  }

  async checkUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const pass = await dbService.client.user.findUnique({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    });
    if (pass?.password === password) {
      return true;
    } else {
      return false;
    }
  }

  async createRoom({
    roomName,
    creator,
  }: {
    roomName: string;
    creator: string;
  }): Promise<{ id: string; name: string }> {
    const res = await dbService.client.room.create({
      data: {
        name: roomName,
        createdBy: creator,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return res;
  }
}
