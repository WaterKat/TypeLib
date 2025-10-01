//~ MARK: Prettify
/**
 * Forces evaluation and simplification of a type.
 * Useful for flattening intersections or resolving mapped types for better readability.
 *
 * @example
 *   Prettify<{ a: number } & { b: string }> -> { a: number; b: string }
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

//~ MARK: OTHER
/**
 * Makes all values of the object type optional (not the keys).
 *
 * @example
 *   AsValueOptional<{ a: number, b?: string }> -> { a: number | undefined, b?: string | undefined }
 */

export type AsValueOptional<T> = Prettify<{
    [K in keyof T as T[K] extends Array<any> ? K : never]?: T[K] | undefined;
} & {
    [K in keyof T as T[K] extends Array<any> ? never : K]: T[K] | undefined;
}>;
/**
 * Makes all keys and values of the object type optional.
 *
 * @example
 *   AsKeyValueOptional<{ a: number, b: string }> -> { a?: number | undefined, b?: string | undefined }
 */

export type AsKeyValueOptional<T> = AsValueOptional<Partial<T>>;
/**
 * Converts a union type into an intersection.
 *
 * @example
 *   UnionToIntersection<{ a: 1 } | { b: 2 }> -> { a: 1 } & { b: 2 }
 */

export type UnionToIntersection<U> = (U extends any ? (a: U) => void : never) extends ((a: infer I) => void) ? I : never;
/**
* Extracts the last type from a union.
* This relies on distributive conditionals and function overload inference.
*
* ! Order is not guaranteed in regular unions — use only for well-defined closed unions.
*
* @example
*   LastOfUnion<'a' | 'b' | 'c'> -> 'c'
*/

export type LastOfUnion<U> = UnionToIntersection<U extends any ? () => U : never> extends () => infer R ? R : never;
/**
* Converts a union to a tuple of its members in stable order.
*
* @warning Very slow! Use for introspection or low-volume meta-programming only.
*
* @example
*   UnfoldUnionIntoTuple<'a' | 'b' | 'c'> -> ['a', 'b', 'c']
*/

export type UnfoldUnionIntoTuple<U> = [U] extends [never] ? [] : [...UnfoldUnionIntoTuple<Exclude<U, LastOfUnion<U>>>, LastOfUnion<U>];
