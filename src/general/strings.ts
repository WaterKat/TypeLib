/**
 * Utility type that enforces all keys of `T` are uppercase strings.
 *
 * @template T - Object type to check keys for uppercase.
 *
 * @example
 * ```ts
 * type Valid = ExtendsUppercaseKeys<{ MESSAGE: string; ERROR: string }>; // Valid
 * type Invalid = ExtendsUppercaseKeys<{ message: string; ERROR: string }>; // Error (never)
 * ```
 *
 * @remarks
 * Evaluates to `T` if all keys are uppercase strings, otherwise `never`.
 */
export type ExtendsUppercaseKeys<T> =
    keyof T extends infer K ?
    /**/ K extends string ?
    /**/ /**/ K extends Uppercase<K> ?
    /**/ /**/ /**/ T
    /**/ /**/ : never
    /**/ : never
    : never;

/**
 * Recursively extracts all values from a nested object `T` that are assignable to `Filter`.
 *
 * @template T - The input object type to extract values from.
 * @template Filter - The type used to filter the leaf values. Only values assignable to this type will be included in the union.
 *
 * @example
 * ```ts
 * type Example = {
 *   name: string;
 *   meta: {
 *     age: number;
 *     nested: {
 *       active: boolean;
 *     };
 *   };
 * };
 *
 * type OnlyStrings = ValuesAsUnion<Example, string>; // string
 * type OnlyBooleans = ValuesAsUnion<Example, boolean>; // boolean
 * type OnlyNumbers = ValuesAsUnion<Example, number>; // number
 * ```
 *
 * @remarks
 * - If a value matches the `Filter` type directly, it is included.
 * - If a value is an object, it is recursively processed.
 * - Non-object and non-matching values are excluded.
 */
export type ValuesAsUnion<T, Filter> = {
    [K in keyof T]: T[K] extends Filter ? T[K] : T[K] extends object ? ValuesAsUnion<T[K], Filter> : never;
}[keyof T];
