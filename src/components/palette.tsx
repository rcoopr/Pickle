import React from 'react';
import styled from 'styled-components';

import Color from 'color';

import { useSelector } from 'react-redux';
import { selectSwatches } from 'redux/paletteSlice';
import { Swatch } from 'components/swatch';

const Container = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10vw;
  height: ${p => p.theme.sizing.palette}px;
  box-shadow: 0 -0.9px 2.2px rgba(0, 0, 0, 0.017), 0 -2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 -5.3px 13.5px rgba(0, 0, 0, 0.033), 0 -23px 54px rgba(0, 0, 0, 0.05),
    0 0.9px 2.2px rgba(0, 0, 0, 0.017), 0 2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 5.3px 13.5px rgba(0, 0, 0, 0.033), 0 23px 54px rgba(0, 0, 0, 0.05);
`;

export const Palette = () => {
  const swatches = useSelector(selectSwatches);

  return (
    <Container>
      {swatches.map(([H, S, L], i) => {
        const hex = Color.hsl(H, S, L).hex();
        return <Swatch key={i} index={i} hex={hex} />;
      })}
    </Container>
  );
};
