import { PrismaClient } from "@prisma/client";
import { MessageType, RoomType } from "../types/db";

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

    return res;
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
    console.log(pass?.password, pass);
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

    await dbService.client.user.update({
      where: {
        email: creator,
      },
      data: {
        rooms: {
          connect: {
            id: res.id,
          },
        },
      },
    });

    return res;
  }

  async deleteRoom({ roomId, email }: { roomId: string; email: string }): Promise<RoomType> {
    const res = await dbService.client.user.delete({
      where: {
        email: email,
        rooms: {
          some: {
            id:roomId
          }
        }
      },
      select: {
        rooms: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            createdBy: true
          }
        }
      }
    });
    return res.rooms[0];
  }


  async getRooms({
    email,
  }: {
    email: string;
  }): Promise<{ rooms: RoomType[]; id: string; email: string }> {
    const res = await dbService.client.user.findUnique({
      where: {
        email: email,
      },

      select: {
        id: true,
        email: true,
        rooms: true,
      },
    });
    return res!;
  }


  async getMessages({ roomId }: { roomId: string }): Promise<MessageType[]> {
    const res = await dbService.client.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
        name: true,
        messages: {
          select: {
            content: true,
            sender: true,
            timestamp: true,
            id: true
          },
        },
      },
    });
    
    const response = res?.messages ?? [];
    return response;
  }

  async isUserInRoom({
    email,
    roomId,
  }: {
    email: string;
    roomId: string;
  }): Promise<boolean> {
    const res = await dbService.client.user.findUnique({
      where: {
        email: email,
        rooms: {
          some: {
            id: roomId
          }
        },
      },
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }
}
