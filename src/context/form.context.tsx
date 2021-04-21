import React, { useContext, createContext, PropsWithChildren } from 'react';
import { FormStore } from '../store/form.store';

interface IFormContext<T extends FormStore> {
  fields: T;
}

const FormContext = createContext<IFormContext<any>>({
  fields: new FormStore(),
});

export function useForm<T extends FormStore>() {
  return useContext<IFormContext<T>>(FormContext).fields;
}

export function FormProvider<T extends FormStore>(
  props: PropsWithChildren<{ value: T }>
) {
  const { value, children } = props;
  const formFields = value;

  return (
    <FormContext.Provider
      value={{
        fields: formFields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
