/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Slide } from '../screen';
import Text, { Title, Large } from '../screen/text';

export default () => (
  <Slide bg="#ccc" fg="#000">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '8vw', rowGap: '4vh', textAlign: 'center' }}>
      <div>
        <img src="/1.png" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
        <Text block>1. Pitch ideas.</Text>
      </div>
      <div>
        <img src="/2.png" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
        <Text block>2. Build a team.</Text>
      </div>
      <div>
        <img src="/3.png" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
        <Text block>3. Start building it.</Text>
      </div>
      <div>
        <img src="/4.png" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
        <Text block>4. Get help from mentors.</Text>
      </div>
      <div>
        <img src="/5.png" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
        <Text block>5. Join fun activities.</Text>
      </div>
      <div>
        <img src="/6.png" style={{ maxWidth: '100%', maxHeight: '40vh' }} />
        <Text block>6. Show off what you made.</Text>
      </div>
    </div>
  </Slide>
);
