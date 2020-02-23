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
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 50vh;
  margin: 10vw;
  max-width: 700px;
  z-index: 4;
  border-radius: 10px;
  background: ${p => p.theme.colors.tertiary};
  box-shadow: 0 3.4px 2.7px rgba(0, 0, 0, 0.022), 0 8.7px 6.9px rgba(0, 0, 0, 0.031),
    0 17.7px 14.2px rgba(0, 0, 0, 0.039), 0 36.5px 29.2px rgba(0, 0, 0, 0.048),
    0 100px 80px rgba(0, 0, 0, 0.07);
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
        Content!
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://refactoringui.com/previews/building-your-color-palette/"
        >
          Refactoring UI
        </a>
      </Card>
    </Container>
  );
};

export default InfoModal;
