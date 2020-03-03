import React from 'react';
import styled from 'styled-components';

const Container = styled.div<ModalContainer>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsla(210, 38%, 95%, 0.8);
  z-index: 3;
  opacity: ${p => (p.visible ? 1 : 0)};
  display: ${p => (p.visible ? 'unset' : 'none')};
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 80vw;
  margin: 10vw;
  max-width: 700px;
  z-index: 4;
  border-radius: 10px;
  padding: ${p => p.theme.sizing.large};
  background: ${p => p.theme.colors.tertiary};
  box-shadow: 0 3.4px 2.7px rgba(0, 0, 0, 0.022), 0 8.7px 6.9px rgba(0, 0, 0, 0.031),
    0 17.7px 14.2px rgba(0, 0, 0, 0.039), 0 36.5px 29.2px rgba(0, 0, 0, 0.048),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;

const Header = styled.h1`
  padding-bottom: ${p => p.theme.sizing.medium};
`;

const Description = styled.p`
  padding-top: ${p => p.theme.sizing.medium};
  padding-bottom: ${p => p.theme.sizing.medium};
  line-height: 1.55rem;
`;

const Link = styled.a`
  font-weight: 700;
  color: ${p => p.theme.colors.primary};
  transition: all 300ms ease;
  text-decoration: none;
  border-bottom: 1px solid transparent;

  &:hover {
    border-color: ${p => p.theme.colors.primary};
  }
`;

interface InfoModal {
  visible: boolean;
  setIsModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalContainer {
  visible: boolean;
  onClick: () => void;
}

const InfoModal = ({ visible, setIsModalDisplayed }: InfoModal) => {
  return (
    <Container visible={visible} onClick={() => setIsModalDisplayed(false)}>
      <Card>
        <Header>Pickle is a tool to help you create a cohesive color palette</Header>
        <Description>
          Other tools aim to create a pretty looking palette but they often don&#39;t play that nice
          with each other. Working from a base color of your choosing, this creates a scale of
          cohesive tones
        </Description>
        <Description>
          Lighter tones can sometimes look washed out, so the first setting let&#39;s you increase
          saturation on those tail-end tones. Another way to deal with that is by rotating the hue
          so you get bright, punchy colors at the lighter end
        </Description>
        <Description>
          <Link href="https://twitter.com/adamwathan">Adam Wathan</Link>
          {` & `}
          <Link href="https://twitter.com/steveschoger">Steve Schoger</Link>
          {` `}
          said it better than I could, so go read their article on
          {` `}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://refactoringui.com/previews/building-your-color-palette/"
          >
            color palettes
          </Link>
        </Description>
      </Card>
    </Container>
  );
};

export default InfoModal;
