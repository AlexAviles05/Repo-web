import { LoginPayLoad } from "./LoginPayLoad.ts";

export type AuthAction = 
  |  { type : 'logout' }
  |  { type : 'login',payload:LoginPayLoad };
