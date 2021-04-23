import { ObservableMap, ObservableSet } from 'mobx';

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

export type Recursive<Values, Value> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? Recursive<Values[K][number], Value>[]
      : Value
    : Values[K] extends ObservableMap
    ? { [key: string]: any }
    : Values[K] extends ObservableSet
    ? { [key: number]: any }
    : Values[K] extends object
    ? Recursive<Values[K], Value>
    : Value;
};

export type StrictTouched<T> = Recursive<T, boolean>;
