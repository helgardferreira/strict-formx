import React, { PropsWithChildren } from 'react';
import { FormStore, FormFieldKeys, observer } from '../../.';

interface IProps<T extends FormStore<T>> {
  store: T;
  fieldName?: FormFieldKeys<T>;
  value?: any;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function InputField<T extends FormStore<T>>(
  props: PropsWithChildren<IProps<T>>
) {
  const { fieldName, id, store, value, onChange, onBlur } = props;

  /* function objPath(obj: object, pathArr: string[]): any {
    // @ts-ignore
    const result = obj[pathArr.shift()];
    console.log(result);
    console.log(pathArr);
    if (pathArr.length === 0) return result;
    return objPath(result, pathArr);
  } */

  return (
    <input
      type="text"
      name={fieldName as string}
      id={id ? id : (fieldName as string)}
      value={value !== undefined ? value : fieldName ? store[fieldName] : ''}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
    />
  );
}

export default observer(InputField);
