import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  observable,
  makeObservable,
  action,
  FormStore,
} from '../../../../dist';
import LangTexts from './lang-texts.store';

interface IPodcast {
  name: string;
  author: string;
  desc: string;
  langTexts: LangTexts[];
}

export default class PodcastStore extends FormStore<PodcastStore>
  implements IPodcast {
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
    const langIndex = this.langTexts.findIndex(
      lang => lang.language === language
    );
    if (langIndex === -1) return;

    if (this.touched.langTexts !== undefined) {
      if (this.touched.langTexts[langIndex] !== undefined) {
        this.touched.langTexts[langIndex][field] = true;
      } else {
        this.touched.langTexts[langIndex] = {
          [field]: true,
        };
      }
    } else {
      this.touched.langTexts = new Array(this.langTexts.length);
      this.touched.langTexts[langIndex] = {
        [field]: true,
      };
    }

    this.langTexts[langIndex][field] = value;
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
