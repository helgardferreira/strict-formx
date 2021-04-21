export type FlagExcludedType<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends Type ? never : Key;
};
export type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base];
export type FilterFormKeys<Base> = {
  [Key in keyof Base]: Key extends 'errors' | 'touched' ? never : Base[Key];
};
export type FormFieldKeys<T> = AllowedNames<FilterFormKeys<T>, Function>;
export type FormFieldObject<T> = {
  [P in FormFieldKeys<T>]: T[P];
};
