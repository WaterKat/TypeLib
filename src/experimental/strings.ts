export type JoinString<
	A extends string,
	B extends string,
	S extends string = "",
> = A extends "" ? B : `${A}${S}${B}`;
