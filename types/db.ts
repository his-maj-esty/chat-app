export interface RoomType {
  id: string;
  name: string;
  createdAt: Date;
  createdBy: string;
}

export interface MessageType {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
}
