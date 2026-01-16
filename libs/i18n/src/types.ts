export type TKey<Namespace extends string> = string & { __brand: Namespace };
