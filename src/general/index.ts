//~ MARK: TUPLES
/**
 * Constructs a tuple from two values.
 * 
 * @example
 *   AsTuple<'a', 'b'> -> ['a', 'b']
 */
export type AsTuple<A, B> = [A, B];

/**
 * Appends an element `C` to the end of tuple `T`.
 * 
 * @example
 *   AppendToTuple<['a', 'b'], 'c'> -> ['a', 'b', 'c']
 */
export type AppendToTuple<T extends unknown[], C> = [...T, C];

/**
 * Prepends an element `Z` to the beginning of tuple `T`.
 * 
 * @example
 *   PrependToTuple<'a', ['b', 'c']> -> ['a', 'b', 'c']
 */
export type PrependToTuple<Z, T extends unknown[]> = [Z, ...T];

/**
 * Gets the first element of a tuple type.
 * 
 * @example
 *   First<['a', 'b', 'c']> -> 'a'
 */
export type First<T> = T extends [never] ? [] :
    T extends [infer F, ...infer _L] ? F : never;

/**
 * Gets the last element of a tuple type.
 * 
 * @example
 *   Last<['a', 'b', 'c']> -> 'c'
 */
export type Last<T> = T extends [never] ? [] :
    T extends [...infer _F, infer L] ? L : never;

/**
 * Reverses the order of elements in a tuple type.
 * 
 * @example
 *   ReverseTuple<['a', 'b', 'c']> -> ['c', 'b', 'a']
 */
export type ReverseTuple<T> =
    T extends [infer F, ...infer L] ? [...ReverseTuple<L>, F] : [];

/**
 * Recursively extracts the intersection of types within a tuple.
 * 
 * Given a tuple of types `T`, this type evaluates to the common subtype
 * that exists in *all* tuple elements by repeatedly applying `Extract`
 * (type intersection) pairwise from left to right.
 * 
 * @template T - A tuple of types to intersect.
 * 
 * @returns The intersection of all types in the tuple, or `never` if any type is `never`.
 * 
 * @example
 * ```ts
 * type Result = CommonTypesInTuple<["a" | "c", "a" | "b"]>; // "a"
 * ```
 */
export type CommonTypesInTuple<T> =
    T extends [infer First] ? First :
    T extends [infer First, infer Second] ? Extract<First, Second> :
    T extends [infer First, infer Second, ...infer Last] ?
    CommonTypesInTuple<[Extract<First, Second>, ...Last]> :
    never;

//~ MARK: Brand
/**
 * Brands a type `K` with a unique string identifier `T`.
 * Used to create nominal types.
 * 
 * @example
 *   type UserId = Brand<string, 'UserId'>
 */
export type Brand<K, T extends string> = K & { __brand: T };

/**
 * Applies a brand to each key of an object type.
 * 
 * @example
 *   BrandKeys<{ id: number }, 'MyKey'> -> { [id__brand]: number }
 */
export type BrandKeys<O extends object, T extends string> = {
    [K in keyof O as Brand<K, T>]: O[K];
};

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
 *   AsValueOptional<{ a: number }> -> { a: number | undefined }
 */
export type AsValueOptional<T> = {
    [K in keyof T]: T[K] | undefined;
};

/**
 * Converts a union type into an intersection.
 * 
 * @example
 *   UnionToIntersection<{ a: 1 } | { b: 2 }> -> { a: 1 } & { b: 2 }
 */
export type UnionToIntersection<U> =
    (U extends any ? (a: U) => void : never) extends ((a: infer I) => void) ? I : never;

/**
* Extracts the last type from a union.
* This relies on distributive conditionals and function overload inference.
* 
* ! Order is not guaranteed in regular unions — use only for well-defined closed unions.
*
* @example
*   LastOfUnion<'a' | 'b' | 'c'> -> 'c'
*/
export type LastOfUnion<U> =
    UnionToIntersection<U extends any ? () => U : never> extends () => infer R ? R : never;

/**
* Converts a union to a tuple of its members in stable order.
* 
* @warning Very slow! Use for introspection or low-volume meta-programming only.
* 
* @example
*   UnfoldUnionIntoTuple<'a' | 'b' | 'c'> -> ['a', 'b', 'c']
*/
export type UnfoldUnionIntoTuple<U> =
    [U] extends [never] ? [] :
    [...UnfoldUnionIntoTuple<Exclude<U, LastOfUnion<U>>>, LastOfUnion<U>]
