import React, { FunctionComponent, useState } from 'react';
import { useForm, StrictForm, Observer, observer } from '../../../.';

import InputField from '../input-field.component';
import PodcastStore from './store/podcast.store';

const PodcastView: FunctionComponent = () => {
  const podcastStore = useForm<PodcastStore>();

  const [newLang, setNewLang] = useState('');

  return (
    <div>
      <input
        value={newLang}
        onChange={e => {
          setNewLang(e.target.value);
        }}
      />
      <button
        onClick={() => {
          podcastStore.addLang(newLang);
        }}
      >
        Add New Lang
      </button>
      <br />
      <br />
      <label htmlFor="name">Name: </label>
      <InputField
        store={podcastStore}
        fieldName="name"
        onChange={e => {
          podcastStore.setFieldValue('name', e.target.value);
        }}
        onBlur={() => {
          podcastStore.setFieldTouched('name', true);
        }}
      />
      <br />
      <label htmlFor="author">Author: </label>
      <InputField
        store={podcastStore}
        fieldName="author"
        onChange={e => {
          podcastStore.setFieldValue('author', e.target.value);
        }}
        onBlur={() => {
          podcastStore.setFieldTouched('author', true);
        }}
      />
      <br />
      <label htmlFor="desc">Description: </label>
      <InputField
        store={podcastStore}
        fieldName="desc"
        onChange={e => {
          podcastStore.setFieldValue('desc', e.target.value);
        }}
        onBlur={() => {
          podcastStore.setFieldTouched('desc', true);
        }}
      />

      <br />
      <br />
      English Locale Name:
      <Observer>
        {() => (
          <InputField
            store={podcastStore}
            value={podcastStore.langTexts[0].name}
            onChange={e => {
              podcastStore.setLangValue('English', 'name', e.target.value);
            }}
          />
        )}
      </Observer>
      <br />
      English locale Description:
      <Observer>
        {() => (
          <InputField
            store={podcastStore}
            value={podcastStore.langTexts[0].desc}
            onChange={e => {
              podcastStore.setLangValue('English', 'desc', e.target.value);
            }}
          />
        )}
      </Observer>
      <br />
      <button
        onClick={() => {
          podcastStore.setFieldValue('name', 'Mutated!');
        }}
      >
        Mutate State
      </button>
      <input type="submit" name="submit" id="submit" value="Submit" />
    </div>
  );
};

const PodcastLangView: FunctionComponent = observer(() => {
  const podcastStore = useForm<PodcastStore>();

  return <pre>{JSON.stringify(podcastStore.langTexts, null, 2)}</pre>;
});

const PodcastErrorView: FunctionComponent = observer(() => {
  const podcastStore = useForm<PodcastStore>();

  return (
    <pre>
      {JSON.stringify(
        podcastStore.errors.map(({ constraints, property }) => ({
          constraints,
          property,
        })),
        null,
        2
      )}
    </pre>
  );
});

const LangTextsErrorView: FunctionComponent = observer(() => {
  const podcastStore = useForm<PodcastStore>();
  const langTextErrors = podcastStore.errors.find(
    e => e.property === 'langTexts'
  );
  if (!langTextErrors || !langTextErrors.children)
    return <pre>{JSON.stringify({}, null, 2)}</pre>;

  const englishErrors = langTextErrors.children.find(
    l => l.value.language === 'English'
  );

  return (
    <pre>
      {englishErrors &&
        JSON.stringify(
          englishErrors.children!.map(({ constraints, property }) => ({
            constraints,
            property,
          })),
          null,
          2
        )}
    </pre>
  );
});

const Podcast: FunctionComponent = () => {
  return (
    <section>
      <StrictForm
        store={new PodcastStore()}
        handleSubmit={store => {
          console.log(store);
        }}
      >
        <PodcastView />
        <PodcastErrorView />
        <LangTextsErrorView />
        <PodcastLangView />
      </StrictForm>
    </section>
  );
};

export default Podcast;
