import React, { Component } from 'react';
import { FormFieldObject } from '../types';
import { FormProvider } from '../context/form.context';
import { FormStore } from '../store/form.store';

interface FormProps<T extends FormStore> {
  store: T;
  handleSubmit: (fields: FormFieldObject<T>) => void;
}

class StrictForm<T extends FormStore> extends Component<
  FormProps<T>
  // FormState<T>
> {
  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { store } = this.props;
    await store.validate();

    if (store.errors.length === 0) {
      this.props.handleSubmit(store);
    }
  }

  // componentDidUpdate(prevProps: FormProps<T>) {}

  render() {
    return (
      <FormProvider value={this.props.store}>
        <form onSubmit={e => this.handleSubmit(e)}>{this.props.children}</form>
      </FormProvider>
    );
  }
}

export default StrictForm;
