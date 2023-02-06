import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Slide } from '../screen';
import Text, { Title, Large } from '../screen/text';

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
  padding-top: 5vh;
  padding-left: 5vh;
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
    margin-top: 2vh;
  }
`;

export default class Pitches extends React.Component {
  state = {
    visibleProjectIndex: 0,
  }

  componentDidMount() {
    const { pastProjects } = this.props;
    setInterval(
      () => {
        const { visibleProjectIndex } = this.state;
        this.setState({ visibleProjectIndex: (visibleProjectIndex+1) % pastProjects.length});
      },
      3000,
    );
  }


  render() {
    const { visibleProjectIndex } = this.state;
    const { pastProjects } = this.props;

    return (
      <Slide padding={0} bg="#000">
        {pastProjects.map((p, i) => (
          <BgImage src={p.media.filter(i => i.type === 'IMAGE')[0].image} display={i === visibleProjectIndex}>
            <ThemeTextOverlay>
              <Text>You can make something creative and new, like:</Text>
              <Title>{p.name}</Title>
              <Text>{p.eventGroup.name}</Text>
            </ThemeTextOverlay>
          </BgImage>
        ))}
      </Slide>
    )
  }

}