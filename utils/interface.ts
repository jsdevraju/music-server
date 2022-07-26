import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  _doc: object;
  __v: string;
  formGoogle:boolean,
}

export interface IReqAuth extends Request {
  user?: IUser;
}