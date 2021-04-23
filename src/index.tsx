import StrictForm from './components/strict-form.component';
import { FormProvider, useForm } from './context/form.context';
import { FormStore } from './store/form.store';
import { FormFieldKeys, FormFieldObject } from './types';

import { Observer, observer } from 'mobx-react';
import {
  observable,
  makeObservable,
  action,
  computed,
  ObservableMap,
  ObservableSet,
} from 'mobx';
export * from 'class-validator';

export {
  StrictForm,
  FormStore,
  useForm,
  FormProvider,
  FormFieldKeys,
  FormFieldObject,
  Observer,
  observer,
  observable,
  makeObservable,
  action,
  computed,
  ObservableMap,
  ObservableSet,
};
