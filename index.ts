// MARK: tuples
export type AsTuple<A, B> = [A, B];
export type AppendToTuple<T extends unknown[], C> = [...T, C];
export type PrependToTuple<Z, T extends unknown[]> = [Z, ...T];


