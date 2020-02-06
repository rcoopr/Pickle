import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

import Color from 'color';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10vw;
  height: 150px;
`;

const Swatch = styled.div<{ bg: string }>`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: ${p => p.bg};
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
`;

const paletteArray = [...Array(9).fill(null)];

export const Palette = () => {
  const baseColor = useSelector((state: RootState) => state.palette.baseColor);

  return (
    <Container>
      {paletteArray.map((_, i) => {
        return (
          <Swatch
            bg={Color(baseColor)
              .lighten(0.8 - i * 0.2)
              .string()}
          />
        );
      })}
    </Container>
  );
};
