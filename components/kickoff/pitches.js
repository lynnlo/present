import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Slide } from '../screen';
import Text, { Title, Large } from '../screen/text';

const RainbowKeyframes = keyframes`
  0%{background-position:0% 90%}
  50%{background-position:100% 11%}
  100%{background-position:0% 90%}
`;

const RainbowSlide = styled(Slide)`
  animation: ${RainbowKeyframes} 20s ease infinite;
  background: linear-gradient(318deg, #ff8900, #1ed74e, #00b9ff, #ff0000);
  background-size: 800% 800%;

  ${Title} {
    color: #fff;
    text-align: center;
    font-size: 15vh;
  }

  ${Large} {
    color: #fff;
    text-align: center;
  }
`;

const BgImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 0;
  opacity: ${({ display }) => display ? '100' : '0'};
  transition: opacity 1.5s ease-in-out;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url("${({ src }) => src}");
`;

const ThemeTextOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  text-align: center;
  padding-top: 20vh;
  background: radial-gradient(
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.8)
  );
  ${Large}, ${Text}, ${Title} {
    color: #fff;
    display: block;
  }
  ${Title} {
    font-size: 10vh;
    margin-top: 4vh;
  }
`;



export default class Pitches extends React.Component {
  state = {
    visibleThemeIndex: 0,
  }

  componentDidMount() {
    const { event } = this.props;
    if (!event.theme || event.themeImages || event.themeImages.length == 0)
    setInterval(
      () => {
        const { visibleThemeIndex } = this.state;
        this.setState({ visibleThemeIndex: (visibleThemeIndex+1) % event.themeImages.length});
      },
      3000,
    );
  }


  render() {
    const { visibleThemeIndex } = this.state;
    const { event } = this.props;
    const { theme, themeImages } = event;

    const visibleThemeImage = themeImages[visibleThemeIndex];

    const hasTheme = (theme && themeImages && themeImages.length > 0);

    return (
      <RainbowSlide padding={0} bg="#000">
        {hasTheme && themeImages.map(src => (
          <BgImage src={src} display={visibleThemeImage === src} />
        ))}
        <ThemeTextOverlay>
          <Title>Time for Pitches</Title>
          {theme && <Large style={{ marginBottom: '3vh'}}>Optional theme: &ldquo;{theme}&rdquo;</Large>}
          <Text style={{ marginBottom: '3vh' }}>PITCH YOUR WILDEST IDEA. We don't expect you to know how to build it yet.</Text>
          <Text>(You must pitch even if you have a team already!)</Text>
        </ThemeTextOverlay>
      </RainbowSlide>
    )
  }

}