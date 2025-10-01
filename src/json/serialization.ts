import type { Json, JsonString } from "./primitives.js";

type JsonReplacerFunction = (key: string, value: Json) => Json;

type JsonReplacerArray<T extends Json> =
    | Exclude<keyof T, symbol>[]
    | null;
type JsonSpace = number | string;

export function toJsonString<T, JsonPart extends (T extends Json ? T : T & Json)>(
    obj: T,
    replacer?: JsonReplacerFunction | JsonReplacerArray<JsonPart>,
    space?: JsonSpace,
): JsonString<JsonPart> {
    if (typeof replacer === "function") {
        // because typescript is funny.
        return JSON.stringify(obj, replacer, space) as JsonString<JsonPart>;
    }
    return JSON.stringify(obj, replacer, space) as JsonString<JsonPart>;
}

type ParsedJsonString<T> = T extends JsonString<infer U> ? U : unknown;

export function parseJsonString<T extends string>(str: T): ParsedJsonString<T> {
    return JSON.parse(str);
}
