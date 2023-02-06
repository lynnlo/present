import React from 'react';
import { Slide } from '../screen';
import styled from 'styled-components';
import QrCode from 'qrcode.react';
import Icon from '@srnd/topocons';
import Text, { Title, Large } from '../screen/text';

const FeaturedText = styled.span`
  color: #ff686b;
  text-decoration: underline;
`;

const LargeText = styled.div`
  font-size: 5vh;
`;

const WifiInfo = styled.div`
  position: absolute;
  left: 5vw;
  bottom: 5vh;
  color: #ff686b;

  section, & > svg {
    display: inline-block;
  }

  & > svg {
    margin-right : 2vw;
    height: 19vh;
    width: auto;
    position: relative;
    bottom: -1vh;
  }

  h2 {
   font-size: 5vh;
   margin-bottom: 0;
   span {
     border-bottom: 0.4vh solid #ff686b;
   }
   svg {
     position: relative;
     top: 0.5vh;
   }
  }

  ul {
    padding: 0;
    li {
      list-style-type: none;
      font-size: 5vh;
      font-family: 'Fira Mono', 'Fira Code', 'Inconsolata', 'Courier New', monospace;


      span {
        display: inline-block;
        width: 15vh;
        font-family: 'Gosha Sans', Helvetica, sans-serif;
      }
    }
  }
`;

export default ({ config }) => (
  <Slide>
    <Title>What next?</Title>
    <LargeText block>1. Join with someone else, or work on your own.</LargeText>
    <LargeText block>2. Register a project ASAP @ <FeaturedText>Showcase.CodeDay.org</FeaturedText></LargeText>
    <LargeText block>3. Get started! (Beginner workshops starting soon.)</LargeText>

    <WifiInfo>
      <QrCode
        value={`WIFI:S:${config.ssid};T:${config.pass && 'WPA'};P:${config.pass};;`}
        renderAs="svg"
        bgColor="white"
        fgColor="#ff686b"
        includeMargin
      />
      <section>
        <h2><span><Icon.Wifi /> wifi</span></h2>
        <ul>
          <li><span>ssid</span> {config.ssid}</li>
          <li><span>pass</span> {config.pass || '(none)'}</li>
        </ul>
      </section>
    </WifiInfo>
  </Slide>
);
