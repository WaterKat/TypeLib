import type { AsTuple, AppendToTuple, PrependToTuple } from "./index.js";

// MARK: testing
type Assert<A, B> = A extends B ? B extends A ? "Pass" : "Fail: B does not extends A" : "Fail: A does not extends B";

type AsTupleTest = Assert<AsTuple<"a", "b">, ["a", "b"]>; //=>
const AsTupleTest: AsTupleTest = "Pass" as const;

type AppendToTupleTest = Assert<AppendToTuple<["a", "b"], "c">, ["a", "b", "c"]>; //=>
const AppendToTupleTest: AppendToTupleTest = "Pass" as const;

type PrependToTupleTest = Assert<PrependToTuple<"a", ["b", "c"]>, ["a", "b", "c"]>; //=>
const PrependToTupleTest: PrependToTupleTest = "Pass" as const;
