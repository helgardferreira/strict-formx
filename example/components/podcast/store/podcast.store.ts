import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  observable,
  makeObservable,
  action,
  FormStore,
  FormFieldObject,
} from '../../../../dist';
import LangTexts from './lang-texts.store';

interface IPodcast {
  name: string;
  author: string;
  desc: string;
  langTexts: LangTexts[];
}

export default class PodcastStore extends FormStore {
  @observable
  @IsNotEmpty()
  @IsString()
  name: string = '';

  @observable
  @IsNotEmpty()
  @IsString()
  author: string = '';

  @observable
  @IsNotEmpty()
  @IsString()
  desc: string = '';

  @observable
  @ValidateNested()
  langTexts: LangTexts[] = [];

  @action
  addLang(language: string) {
    this.langTexts.push(new LangTexts(language));
  }

  @action
  setLangValue(language: string, field: keyof LangTexts, value: any) {
    const langText = this.langTexts.find(lang => lang.language === language);
    if (!langText) return;

    langText[field] = value;
    this.validate();
  }

  constructor() {
    super();
    makeObservable(this);
    this.addLang('English');

    this.mapStateToStore<PodcastStore>({
      name: 'Example Name',
    });
  }
}
