/**
 * A branded error type wrapping a standard Error with additional type information.
 * 
 * @template E - The original error type wrapped by SafelyError.
 */
type SafelyError<E> = Error & {
	readonly __brand: "safely";
	readonly __error: E;
};

/**
 * Represents a successful result.
 *
 * @template T - Type of the success value.
 */
type SafelyResultSuccess<T> = { ok: true; value: T };

/**
 * Represents a failure result with a branded error.
 *
 * @template E - Type of the error wrapped.
 */
type SafelyResultFailure<E> = { ok: false; error: SafelyError<E> };

/**
 * Result wrapper type combining success or failure.
 * 
 * @template T - Success value type.
 * @template E - Error type.
 */
export type SafelyResult<T = unknown, E = unknown> =
	| SafelyResultSuccess<T>
	| SafelyResultFailure<E>;

/**
 * General function type for synchronous functions with any arguments and return type.
 */
// biome-ignore lint/suspicious/noExplicitAny: must be extended and unknown does not infer
type SafelyFunc = (...args: any[]) => any;

/**
 * Executes a synchronous function safely, capturing thrown errors into `SafelyResult`.
 *
 * @template K - Function type.
 * @template E - Error type to brand.
 * @param func - The synchronous function to execute.
 * @param args - Arguments to pass to the function.
 * @returns A `SafelyResult` with `ok: true` and value if successful,
 *          or `ok: false` and branded error if function throws.
 */
export function safelyRun<K extends SafelyFunc, E = unknown>(
	func: K,
	...args: Parameters<K>
): SafelyResult<ReturnType<K>, E> {
	try {
		const data = func(...args);
		return { ok: true, value: data } as SafelyResult<ReturnType<K>, E>;
	} catch (e) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { ok: false, error: error as SafelyError<E> };
	}
}

/**
 * General function type for asynchronous functions returning a Promise.
 */
// biome-ignore lint/suspicious/noExplicitAny: must be extended and unknown does not infer
type SafelyFuncAsync = (...args: any[]) => Promise<any>;

/**
 * Executes an async function safely, capturing rejected promises into `SafelyResult`.
 *
 * @template K - Async function type.
 * @template E - Error type to brand.
 * @param func - The async function to execute.
 * @param args - Arguments to pass to the async function.
 * @returns A Promise resolving to a `SafelyResult` with `ok: true` and resolved value,
 *          or `ok: false` and branded error if rejected.
 */
export async function safelyRunAsync<K extends SafelyFuncAsync, E = unknown>(
	func: K,
	...args: Parameters<K>
): Promise<SafelyResult<Awaited<ReturnType<K>>, E>> {
	try {
		const data = await func(...args);
		return { ok: true, value: data } as SafelyResult<Awaited<ReturnType<K>>, E>;
	} catch (e) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { ok: false, error: error as SafelyError<E> };
	}
}

/**
 * General type for a Promise of any resolved value.
 */
// biome-ignore lint/suspicious/noExplicitAny: must be extended and unknown does not infer
type SafelyPromise = Promise<any>;

/**
 * Safely unwraps a Promise, converting rejection into a `SafelyResult`.
 *
 * @template K - Promise type.
 * @template E - Error type to brand.
 * @param promise - The Promise to unwrap.
 * @returns A Promise resolving to `SafelyResult` with `ok: true` and resolved value,
 *          or `ok: false` and branded error if rejected.
 */
export async function safelyUnwrapPromise<K extends SafelyPromise, E = unknown>(
	promise: K,
): Promise<SafelyResult<Awaited<K>, E>> {
	try {
		const data = await promise;
		return { ok: true, value: data } as SafelyResult<Awaited<K>, E>;
	} catch (e) {
		const error = e instanceof Error ? e : new Error(String(e));
		return { ok: false, error: error as SafelyError<E> };
	}
}
