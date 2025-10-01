import type { Assert } from "../general/index.test.js";
import type { TypeFromJsonSchema } from "./schema.js";

// === Const ===
type ConstTest = Assert<
    TypeFromJsonSchema<{ const: 42 }>,
    42
>;
const ConstTest: ConstTest = "Pass" as const;

// === Enum ===
type EnumTest = Assert<
    TypeFromJsonSchema<{ enum: ["a", "b", "c"] }>,
    "a" | "b" | "c"
>;
const EnumTest: EnumTest = "Pass" as const;

// === oneOf (simplified test, assuming CommonTypesInTuple is identity here) ===
// For example, oneOf with string | number results in string | number
type OneOfTest = Assert<
    TypeFromJsonSchema<{ oneOf: [{ type: "string" }, { type: "number" }] }>,
    string | number
>;
const OneOfTest: OneOfTest = "Pass" as const;

// === anyOf (same as oneOf in your code) ===
type AnyOfTest = Assert<
    TypeFromJsonSchema<{ anyOf: [{ type: "string" }, { type: "boolean" }] }>,
    string | boolean
>;
const AnyOfTest: AnyOfTest = "Pass" as const;

// === allOf === //! ------------------------------------------------------------------------------------------ MARK: TODO
// allOf intersecting { a: string } & { b: number }
//type AllOfTest = Assert<
//    TypeFromJsonSchema<{
//        allOf: [
//            { type: "object"; properties: { a: { type: "string" } }; required: ["a"] },
//            { type: "object"; properties: { b: { type: "number" } }; required: ["b"] }
//        ]
//    }>,
//    { a: string } & { b: number }
//>;
//const AllOfTest: AllOfTest = "Pass" as const;

// === Primitive types ===
type StringTest = Assert<
    TypeFromJsonSchema<{ type: "string" }>,
    string
>;
const StringTest: StringTest = "Pass" as const;

type NumberTest = Assert<
    TypeFromJsonSchema<{ type: "integer" }>,
    number
>;
const NumberTest: NumberTest = "Pass" as const;

type BooleanTest = Assert<
    TypeFromJsonSchema<{ type: "boolean" }>,
    boolean
>;
const BooleanTest: BooleanTest = "Pass" as const;

type NullTest = Assert<
    TypeFromJsonSchema<{ type: "null" }>,
    null
>;
const NullTest: NullTest = "Pass" as const;

// === Array type with items ===
type ArrayTest = Assert<
    TypeFromJsonSchema<{ type: "array"; items: { type: "string" } }>,
    string[]
>;
const ArrayTest: ArrayTest = "Pass" as const;

// === Object with properties & required ===
type ObjectTest = Assert<
    TypeFromJsonSchema<{
        type: "object";
        properties: {
            a: { type: "string" };
            b: { type: "number" };
        };
        required: ["a"];
        additionalProperties: false;
    }>,
    { a: string; b?: number }
>;
const ObjectTest: ObjectTest = "Pass" as const;

// === Object with properties only (all optional) ===
type ObjectOptionalTest = Assert<
    TypeFromJsonSchema<{
        type: "object";
        properties: {
            x: { type: "boolean" };
            y: { type: "null" };
        };
        additionalProperties: false;
    }>,
    { x?: boolean; y?: null }
>;
const ObjectOptionalTest: ObjectOptionalTest = "Pass" as const;

// === Object without properties or required ===
type GenericObjectTest = Assert<
    TypeFromJsonSchema<{ type: "object" }>,
    { [key: string]: unknown }
>;
const GenericObjectTest: GenericObjectTest = "Pass" as const;

// === Fallback unknown ===
type UnknownTest = Assert<
    TypeFromJsonSchema<{}>,
    unknown
>;
const UnknownTest: UnknownTest = "Pass" as const;
