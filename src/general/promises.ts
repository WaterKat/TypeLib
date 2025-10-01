/**
 * Utility type that represents a type as a possible promise.
 *
 * @template T - Object type that represents the possible value within promise.
 *
 * @example
 * ```ts
 * type IsPromise: Awaitable<string> = Promise.resolve("test");
 * type IsNotPromise: Awaitable<string> = "test";
 * await IsPromise;     //valid
 * await IsNotPromise;  //valid
 * ```
 */
export type Awaitable<T> = T | Promise<T>;
