import React from 'react';
import styled from 'styled-components';

import { hslArrayToString } from 'utils/swatchColors';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10vw;
  height: 150px;
`;

const Swatch = styled.div.attrs<{ bg: string }>(p => ({
  style: {
    background: `${p.bg}`,
  },
}))<{ bg: string }>`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const Palette = () => {
  // const baseColor = useSelector((state: RootState) => state.palette.baseColor);
  const swatches = useSelector((state: RootState) => state.palette.swatches);
  const swatchesHSLString = hslArrayToString(swatches);

  return (
    <Container>
      {swatchesHSLString.map(color => {
        return <Swatch bg={color} />;
      })}
    </Container>
  );
};
