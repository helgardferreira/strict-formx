import {
  IsNotEmpty,
  IsString,
  observable,
  makeObservable,
} from '../../../../.';

export default class LangTexts {
  @observable
  @IsNotEmpty()
  @IsString()
  language: string;

  @observable
  @IsNotEmpty()
  @IsString()
  name: string;

  @observable
  @IsNotEmpty()
  @IsString()
  desc: string;

  constructor(language: string) {
    makeObservable(this);
    this.language = language;
    this.name = '';
    this.desc = '';
  }
}
