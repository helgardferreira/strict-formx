import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Podcast from './components/podcast/podcast.component';

const App = () => {
  return (
    <div>
      <Podcast />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
