import { Request } from "express";

export interface IUser {
  name: string;
  email: string;
  domain?: string;
}

export type EmailFormat = "FULLNAME" | "INITIAL";

interface IDefReqParams {}

interface IDefResBody {}

interface IDefReqBody {}

interface IDefReqQuery {}

export interface IGetUserEmailReq
  extends Request<
    IDefReqParams,
    IDefResBody,
    IDefReqBody,
    {
      firstName: string;
      lastName: string;
      domain: string;
    }
  > {}

export interface IPostUserEmailReq
  extends Request<
    IDefReqParams,
    IDefResBody,
    {
      name: string;
      email: string;
    },
    IDefReqQuery
  > {}
