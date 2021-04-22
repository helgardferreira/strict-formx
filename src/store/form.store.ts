import { validate, ValidationError } from 'class-validator';

import { observable, action, makeObservable } from 'mobx';
import { FormFieldKeys, FormFieldObject } from '../types';

export type Recursive<Values, Value> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? Recursive<Values[K][number], Value>[]
      : Value
    : Values[K] extends object
    ? Recursive<Values[K], Value>
    : Value;
};

export type StrictTouched<T> = Recursive<T, boolean>;

export class FormStore<T> {
  @observable
  errors: ValidationError[] = [];

  @observable
  touched: StrictTouched<FormFieldObject<T>> = {};

  @action
  async validate() {
    return validate(this)
      .then(
        action('validateSuccess', res => {
          console.log(res);
          this.errors = res;
        })
      )
      .catch(
        action('validateError', err => {
          console.error(err);
        })
      );
  }

  constructor() {
    makeObservable(this);
  }

  @action
  setFieldValue<U extends FormFieldKeys<T>>(
    field: U,
    value: FormFieldObject<T>[U]
  ) {
    this[field as keyof this] = value as any;
    if (typeof this.touched[field] === 'boolean') {
      (this.touched[field] as boolean) = true;
    }
    this.validate();
  }

  @action
  setFieldTouched<U extends keyof StrictTouched<FormFieldObject<T>>>(
    field: U,
    value: StrictTouched<FormFieldObject<T>>[U]
  ) {
    this.touched[field] = value;
    this.validate();
  }

  private isValidKey<U>(key: keyof U | string, state: U): key is keyof U {
    return Object.prototype.hasOwnProperty.call(state, key);
  }

  private doKeysOverlap<U>(
    keys: (keyof this & keyof U)[] | string[],
    state: U
  ): keys is (keyof this & keyof U)[] {
    for (const key of keys) {
      if (!this.isValidKey(key, this) || !this.isValidKey(key, state)) {
        return false;
      }
    }
    return true;
  }

  @action
  mapStateToStore<T>(state: Partial<FormFieldObject<T>>) {
    const keys = Object.keys(state);
    if (this.doKeysOverlap(keys, state)) {
      keys.forEach((key: keyof this & keyof typeof state) => {
        this[key] = state[key] as any;
      });
    }
  }
}
