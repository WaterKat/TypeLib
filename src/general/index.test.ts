export type Assert<A, B> = A extends B ? B extends A ? "Pass" : ["Fail: B does not extends A", A, B] : ["Fail: A does not extends B", A, B];

//type FooTest = Assert<Foo<>, 'Expected'>;
//const FooTest: FooTest = "Pass" as const;

// MARK: TUPLES
import type { AsTuple, AppendToTuple, PrependToTuple, First, Last, ReverseTuple } from "./index.js";

type AsTupleTest = Assert<AsTuple<"a", "b">, ["a", "b"]>; //=>
const AsTupleTest: AsTupleTest = "Pass" as const;

type AppendToTupleTest = Assert<AppendToTuple<["a", "b"], "c">, ["a", "b", "c"]>; //=>
const AppendToTupleTest: AppendToTupleTest = "Pass" as const;

type PrependToTupleTest = Assert<PrependToTuple<"a", ["b", "c"]>, ["a", "b", "c"]>; //=>
const PrependToTupleTest: PrependToTupleTest = "Pass" as const;

type FirstTest = Assert<First<['a', 'b', 'c']>, 'a'>;
const FirstTest: FirstTest = "Pass" as const;

type LastTest = Assert<Last<['a', 'b', 'c']>, 'c'>;
const LastTest: LastTest = "Pass" as const;

type ReverseTupleTest = Assert<ReverseTuple<['a', 'b', 'c']>, ['c', 'b', 'a']>;
const ReverseTupleTest: ReverseTupleTest = "Pass" as const;


// MARK: OTHER
import type { AsValueOptional, UnionToIntersection, LastOfUnion, UnfoldUnionIntoTuple } from "./index.js";

type AsValueOptionalTest = Assert<AsValueOptional<{ a: "test" }>, { a: "test" | undefined }>;
const AsValueOptionalTest: AsValueOptionalTest = "Pass" as const;

type UnionToIntersectionTest = Assert<UnionToIntersection<{ a: "1" } | { b: "2" } | { c: "3" }>, { a: "1", b: "2", c: "3" }>;
const UnionToIntersectionTest: UnionToIntersectionTest = "Pass" as const;

type LastOfUnionTest = Assert<LastOfUnion<"a" | "b" | "c">, "c">;
const LastOfUnionTest: LastOfUnionTest = "Pass" as const;

type UnfoldUnionIntoTupleTest = Assert<UnfoldUnionIntoTuple<"a" | "b" | "c">, ["a", "b", "c"]>;
const UnfoldUnionIntoTupleTest: UnfoldUnionIntoTupleTest = "Pass" as const;
