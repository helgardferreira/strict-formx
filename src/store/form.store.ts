import { validate, ValidationError } from 'class-validator';

import { observable, action, makeObservable } from 'mobx';
import { FormFieldKeys, FormFieldObject } from '../types';

export class FormStore {
  @observable
  errors: ValidationError[] = [];

  @observable
  touched: Partial<Record<FormFieldKeys<this>, boolean>> = {};

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
  setFieldValue<T extends FormFieldKeys<this>>(
    field: T,
    value: FormFieldObject<this>[T]
  ) {
    this[field] = value;
    this.touched[field] = true;
    this.validate();
  }

  @action
  setFieldTouched<T extends FormFieldKeys<this>>(field: T, value: boolean) {
    this.touched[field] = value;
    this.validate();
  }

  private isValidKey<T>(key: keyof T | string, state: T): key is keyof T {
    return Object.prototype.hasOwnProperty.call(state, key);
  }

  private doKeysOverlap<T>(
    keys: (keyof this & keyof T)[] | string[],
    state: T
  ): keys is (keyof this & keyof T)[] {
    for (const key of keys) {
      if (!this.isValidKey(key, this) || !this.isValidKey(key, state)) {
        return false;
      }
    }
    return true;
  }

  @action
  mapStateToStore<T extends FormStore>(state: Partial<FormFieldObject<T>>) {
    const keys = Object.keys(state);
    if (this.doKeysOverlap(keys, state)) {
      keys.forEach((key: keyof this & keyof typeof state) => {
        this[key] = state[key] as any;
      });
    }
  }
}
