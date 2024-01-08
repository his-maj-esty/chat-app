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

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
}