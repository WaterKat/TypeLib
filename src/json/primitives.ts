
export type JsonPrimitive = null | boolean | number | string;
export type JsonObject = { [key: string]: Json; };
export type JsonArray = Json[];
export type Json = JsonPrimitive | JsonObject | JsonArray;

export type JsonString<T extends Json> = string & { __json: T; };
