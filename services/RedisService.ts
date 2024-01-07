import { RedisClientType, createClient } from "redis";

export class RedisService {
  private static instance: RedisService;
  private subscriber: RedisClientType;
  private publisher: RedisClientType;
  private subscriptions: Map<string, { userId: number; wsObj: any }[]>;

  constructor() {
    this.subscriptions = new Map();
    this.subscriber = createClient({
      socket: {
        host: "redis-server",
        port: 6379,
      },
    });
    this.publisher = createClient({
      socket: {
        host: "redis-server",
        port: 6379,
      },
    });
    this.subscriber.connect();
    this.publisher.connect();
  }

  static getInstance(): RedisService {
    if (!this.instance) {
      this.instance = new RedisService();
    }
    return this.instance;
  }

  async subscribe(id: number, ws: any, room: string) {
    try {
      console.log(
        "subscribers before subscribing",
        this.subscriptions.get(room)
      );
      const isRoomSubscribed = this.subscriptions.get(room)?.length;
      if (!isRoomSubscribed) {
        this.subscriptions.set(room, [
          {
            userId: id,
            wsObj: ws,
          },
        ]);
        console.log("new subscribers", this.subscriptions.get(room)?.length);

        await this.subscriber.subscribe(
          room,
          (msgObj: string, room: string) => {
            console.log("listener called for :", msgObj, room);
            this.subscriptions.get(room)?.map(({ wsObj }) => {
              wsObj.send(msgObj);
              console.log("msg sent from subscribe");
            });
          }
        );
        console.log(
          "subscribed to ",
          room,
          "subscribers are :",
          this.subscriptions.get(room)
        );
      } else {
        const currentSubscribers = this.subscriptions.get(room);
        this.subscriptions.set(room, [
          ...currentSubscribers!,
          { userId: id, wsObj: ws },
        ]);
        console.log(
          "already subscribed to ",
          room,
          "subscribers are :",
          this.subscriptions.get(room)
        );
      }
    } catch (error) {
      console.log("error occured while subscribing: ", error);
    }
  }

  async unsubscribe(id: number, room: string) {
    try {
      const isRoomSubscribed = this.subscriptions.get(room)?.length;
      if (isRoomSubscribed) {
        const subscribersForChannel = this.subscriptions.get(room);
        console.log("subscribers: ", subscribersForChannel);
        const newList = subscribersForChannel!.filter(({ userId }) => {
          if (userId !== id) {
            console.log("ids not equal:", id, userId);
            return true;
          } else {
            return false;
          }
        });
        console.log("new list: ", newList);
        this.subscriptions.set(room, newList);
        console.log(
          "new list at unsubscribing: ",
          this.subscriptions.get(room)
        );
        if (newList.length === 0) {
          this.subscriber.unsubscribe(room);
          console.log("unsubscribed for", room);
        }
      } else {
        console.log("no room of this name");
      }
    } catch (error) {
      console.log("error occured while unsubscribing : ", error);
    }
  }

  async publish(room: string, msgObj: string) {
    try {
      this.publisher.publish(room, msgObj);
      console.log("published to", room);
    } catch (error) {
      console.log("error while publishing msg : ", error);
    }
  }
}
