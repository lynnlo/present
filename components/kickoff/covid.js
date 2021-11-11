import React from 'react';
import { Slide } from '../screen';
import Text, { Title, Large } from '../screen/text';

export default () => (
  <Slide bg="#ff686b" fg="#fff">
    <Title>COVID Safety Rules</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '2vw' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="/mask.svg" style={{ height: '30vh' }} alt="" />
        <Large block>Mask up!</Large>
        <Text block>
          Wear the high-flow N95 masks we provide (mouth AND NOSE) except when actively eating. We have
          extras if you'd like to swap.
        </Text>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img src="/sick.svg" style={{ height: '30vh' }} alt="" />
        <Large block>Feel sick?.</Large>
        <Text block>Head home, you can keep participating online.</Text>
      </div>
    </div>
    <Text style={{ textAlign: 'center', marginTop: '10vh' }} block>Report problems anonymously @ http://codeday.to/safety</Text>
  </Slide>
);
