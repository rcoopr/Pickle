import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`;

const Swatch = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: ${p => p.theme.colors.accent};
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
`;

export const Palette = () => {
  return (
    <Container>
      <Swatch />
    </Container>
  );
};
