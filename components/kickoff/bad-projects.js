import React from 'react';
import Icon from '@srnd/topocons';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

const badIdeas = [
  'portfolio website',
  'information website',
  'flappy bird clone',
  'todo list app',
  'closet organizer app',
];

export default () => (
  <Slide bg="#fff" fg="#000">
    <Title>Be original!</Title>
    <Title>We&apos;ve already seen a thousand of these projects:</Title>
    {badIdeas.map(i => (
      <Large block><Icon.Prohibited style={{ fontSize: '0.6em', fill: '#f00'}} /> {i}</Large>
    ))}
  </Slide>
);
