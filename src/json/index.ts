import type { JSONSchema7, JSONSchema7Object, JSONSchema7Type } from "json-schema";
import type { CommonTypesInTuple, Prettify } from "../general";

/**
 * Extends JSONSchema7Object by enforcing `properties` and `required` keys
 * based on the generic type `T`.
 *
 * @template T - The object type to infer properties and required keys from.
 * @typedef {Omit<JSONSchema7Object, "properties" | "required"> & {
 *   properties: Record<keyof T & string, JSONSchema7>;
 *   required: Array<keyof T & string>;
 * }} JsonSchema7WithProps
 */
export type JsonSchema7WithProps<T> = Omit<JSONSchema7Object, "properties" | "required"> & {
	properties: {
		[K in (keyof T & string)]: JSONSchema7;
	};
	required: Array<keyof T & string>;
};


/**
 * Infers a TypeScript type from a JSON Schema object `T` with `properties` and optional `required`.
 * 
 * - If `T` has `properties` and `required`, it returns an object type where:
 *   - Properties listed in `required` are **required** keys.
 *   - Other properties are **optional**.
 * - If `T` has only `properties` (no `required`), all properties are optional.
 * - If neither are present, the result is a general object with string keys and unknown values.
 * 
 * @template T - JSON Schema object type with optional `properties` and `required`.
 * @example
 * Given schema:
 * {
 *   properties: {
 *     a: { type: "string" },
 *     b: { type: "number" }
 *   },
 *   required: ["a"]
 * }
 * Resulting TypeScript type:
 * { a: string; b?: number }
 */
type TypeFromJsonObjectSchema<T> =
	T extends { properties: infer P, required: infer R } ? Prettify<{ [K in keyof P as K extends R[keyof R] ? K : never]: TypeFromJsonSchema<P[K]> } & { [K in keyof P as K extends R[keyof R] ? never : K]?: TypeFromJsonSchema<P[K]> }> :
	T extends { properties: infer P } ? { [K in keyof P]?: TypeFromJsonSchema<P[K]> } :
	{ [key: string]: unknown };

/**
 * Infers a TypeScript type from a JSON Schema (draft-07) object `T`.
 * Supports handling of `const`, `enum`, `oneOf`, `anyOf`, `allOf`, and basic types.
 *
 * - `const`: extracts the constant literal value.
 * - `enum`: extracts union of enum literals.
 * - `oneOf`: excludes types common to multiple schemas using `CommonTypesInTuple`.
 * - `anyOf`: returns union of possible schemas (currently same as `oneOf`).
 * - `allOf`: intersects schemas using `CommonTypesInTuple`.
 * - Basic types: string, number (integer|number), boolean, null, array, object.
 * - For arrays, recursively infers item types.
 * - For objects, recursively infers property types.
 * - Defaults to `unknown` if no match.
 *
 * @template T - The JSON Schema type object.
 * @typedef TypeFromJsonSchema
 * @type {any}
 */
export type TypeFromJsonSchema<T> =
	T extends { const: infer C } ? C extends JSONSchema7Type ? C : never :
	T extends { enum: (infer E)[] } ? E : // TODO: verify E extends JSONSchema7Type
	T extends { oneOf: infer O } ? O extends unknown[] ? Exclude<TypeFromJsonSchema<O[number]>, CommonTypesInTuple<{ [K in keyof O]: TypeFromJsonSchema<O[K]> }>> : never :
	T extends { anyOf: (infer A)[] } ? TypeFromJsonSchema<A> :
	T extends { allOf: infer O } ? CommonTypesInTuple<{ [K in keyof O]: TypeFromJsonSchema<O[K]> }> :
	T extends { type: "string" } ? T extends { enum: (infer S)[] } ? S : string :
	T extends { type: "integer" | "number" } ? number :
	T extends { type: "boolean" } ? boolean :
	T extends { type: "null" } ? null :
	T extends { type: "array" } ? T extends { items: infer I } ? TypeFromJsonSchema<I>[] : unknown[] :
	T extends { type: "object" } ?
	/**/ T extends { additionalProperties: false } ?
	/**/ TypeFromJsonObjectSchema<T> :
	/**/ Prettify<TypeFromJsonObjectSchema<T> & { [key: string]: unknown }> :
	unknown;
