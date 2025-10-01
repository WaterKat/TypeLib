//~ MARK: Brand
/**
 * Brands a type `K` with a unique string identifier `T`.
 * Used to create nominal types.
 *
 * @example
 *   type UserId = Brand<string, 'UserId'>
 */

export type Brand<K, T extends string> = K & { __brand: T; };
/**
 * Applies a brand to each key of an object type.
 *
 * @example
 *   BrandKeys<{ id: number }, 'MyKey'> -> { [id__brand]: number }
 */

export type BrandKeys<O extends object, T extends string> = {
    [K in keyof O as Brand<K, T>]: O[K];
};

/** TODO */
type BrandError = "brand must be literal";

/** TODO */
export function asBrand<K, B extends string & {}>(value: K, _brand: B): string extends B ? BrandError : Brand<K, B> {
	return value as string extends B ? BrandError : Brand<K, B>;
}

/**
 * A string uniquely branded as a `Uuid` to prevent misuse.
 * Use for IDs where plain strings should not be accepted.
 */
export type Uuid = Brand<string, "Uuid">;

/**
 * A number (in seconds) branded as `UnixSeconds` to represent a Unix timestamp.
 * Prevents misuse of plain numbers where a timestamp in seconds is expected.
 */
export type UnixSeconds = Brand<number, "UnixSeconds">;

/**
 * A number (in milliseconds) branded as `UnixMilliseconds` to represent a Unix timestamp.
 * Prevents misuse of plain numbers where a timestamp is expected.
 */
export type UnixMilliseconds = Brand<number, "UnixMilliseconds">;

