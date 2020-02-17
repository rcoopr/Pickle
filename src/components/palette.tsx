import React from 'react';
import styled from 'styled-components';

import { hslArrayToString } from 'utils/hslConvert';
import { useSelector } from 'react-redux';
import { selectSwatches } from 'redux/paletteSlice';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10vw;
  height: ${p => p.theme.sizing.palette}px;
  box-shadow: 0 -0.9px 2.2px rgba(0, 0, 0, 0.017), 0 -2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 -5.3px 13.5px rgba(0, 0, 0, 0.033), 0 -23px 54px rgba(0, 0, 0, 0.05),
    0 0.9px 2.2px rgba(0, 0, 0, 0.017), 0 2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 5.3px 13.5px rgba(0, 0, 0, 0.033), 0 23px 54px rgba(0, 0, 0, 0.05);
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
  const swatches = useSelector(selectSwatches);
  const swatchesHSLString = swatches.map(swatch => hslArrayToString(swatch));

  return (
    <Container>
      {swatchesHSLString.map((color, i) => {
        return <Swatch bg={color} key={i} />;
      })}
    </Container>
  );
};
