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

export type First<T> = T extends [never] ? [] : T extends [infer F, ...infer _L] ? F : never;
/**
 * Returns a tuple type without the first element.
 *
 * @example
 *   WithoutFirst<['a', 'b', 'c']> // -> ['b', 'c']
 *   WithoutFirst<[1]>             // -> []
 *   WithoutFirst<[]>              // -> never
 */

export type WithoutFirst<T> = T extends [never] ? [] : T extends [infer _F, ...infer L] ? L : never;
/**
 * Gets the last element of a tuple type.
 *
 * @example
 *   Last<['a', 'b', 'c']> -> 'c'
 */

export type Last<T> = T extends [never] ? [] : T extends [...infer _F, infer L] ? L : never;
/**
 * Returns a tuple type without the last element.
 *
 * @example
 *   WithoutLast<['a', 'b', 'c']> // -> ['a', 'b']
 *   WithoutLast<[1]>             // -> []
 *   WithoutLast<[]>              // -> []
 */

export type WithoutLast<T> = T extends [never] ? [] : T extends [...infer F, infer _L] ? F : never;
/**
 * Reverses the order of elements in a tuple type.
 *
 * @example
 *   ReverseTuple<['a', 'b', 'c']> -> ['c', 'b', 'a']
 */

export type ReverseTuple<T> = T extends [infer F, ...infer L] ? [...ReverseTuple<L>, F] : [];
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

export type CommonTypesInTuple<T> = T extends [infer First] ? First : T extends [infer First, infer Second] ? Extract<First, Second> : T extends [infer First, infer Second, ...infer Last] ? CommonTypesInTuple<[Extract<First, Second>, ...Last]> : never;
/**
 * Recursively constructs all prefixes of a tuple type `T`, including the full tuple.
 *
 * This includes:
 * - the empty prefix `[]`
 * - the first element `[T[0]]`
 * - the first two elements `[T[0], T[1]]`
 * - ...
 * - the full tuple `T`
 *
 * If `T` is `[never]` or `[]`, it returns just `[]`.
 *
 * @example
 *   TuplePrefixes<[1, 2, 3]> // => [] | [1] | [1, 2] | [1, 2, 3]
 *   TuplePrefixes<[]>       // => []
 *   TuplePrefixes<[never]>  // => []
 */

export type TuplePrefixes<T> = T | (T extends [never] ? [] : TuplePrefixes<WithoutLast<T>>);
