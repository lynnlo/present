import React from 'react';
import { Slide } from '../screen';
import styled from 'styled-components';
import Text, { Title, Large } from '../screen/text';

const FeaturedText = styled.span`
  color: #ff686b;
  text-decoration: underline;
`;

export default () => (
  <Slide>
    <img src="/showcase.png" style={{ maxHeight: '60vh', border: '1px solid black' }} />
    <Title>Register your team ASAP @ <FeaturedText>Showcase.CodeDay.org</FeaturedText></Title>
    <Text block>- Even if you don't know what you're making yet.</Text>
    <Text block>- <FeaturedText>Assigns you a mentor</FeaturedText> to help @ discord.gg/codeday</Text>
  </Slide>
);
