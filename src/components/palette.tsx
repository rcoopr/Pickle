import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`;

const Swatch = styled.div<{ bg: string }>`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: ${p => p.bg};
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
`;

export const Palette = () => {
  const baseColor = useSelector((state: RootState) => state.palette.baseColor);

  return (
    <Container>
      <Swatch bg={baseColor} />
    </Container>
  );
};
