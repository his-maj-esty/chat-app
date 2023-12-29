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
}
