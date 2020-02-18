import React from 'react';
import styled from 'styled-components';

import { hslArrayToString } from 'utils/hslConvert';
import { useSelector } from 'react-redux';
import { selectSwatches } from 'redux/paletteSlice';

interface Swatch {
  bg: string;
}

const Container = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10vw;
  height: ${p => p.theme.sizing.palette}px;
  box-shadow: 0 -0.9px 2.2px rgba(0, 0, 0, 0.017), 0 -2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 -5.3px 13.5px rgba(0, 0, 0, 0.033), 0 -23px 54px rgba(0, 0, 0, 0.05),
    0 0.9px 2.2px rgba(0, 0, 0, 0.017), 0 2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 5.3px 13.5px rgba(0, 0, 0, 0.033), 0 23px 54px rgba(0, 0, 0, 0.05);
`;

const PaletteRow = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const SwatchWrapper = styled.div`
  width: 6%;
`;

const Swatch = styled.div.attrs<Swatch>(p => ({
  style: {
    background: `${p.bg}`,
  },
}))<Swatch>`
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  border-radius: 99em;
  box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ToneValue = styled.div`
  font-size: ${p => p.theme.fonts.small};
  font-weight: 700;
  padding-top: ${p => p.theme.sizing.small};
  width: 6%;
  text-align: center;
`;

const ColorCode = styled.div`
  font-size: ${p => p.theme.fonts.smallest};
  text-align: center;
  width: 6%;
`;

export const Palette = () => {
  const swatches = useSelector(selectSwatches);

  return (
    <Container>
      <PaletteRow>
        {swatches.map(([H, S, L]) => {
          const colorString = hslArrayToString([H, S, L]);
          return (
            <SwatchWrapper>
              <Swatch bg={colorString} />
            </SwatchWrapper>
          );
        })}
      </PaletteRow>
      <PaletteRow>
        {swatches.map((_, i) => (
          <ToneValue>{(i + 1) * 100}</ToneValue>
        ))}
      </PaletteRow>
      <PaletteRow>
        {swatches.map(([H, S, L]) => {
          const [hue, sat, light] = [H, S, L].map(each => Math.round(each));
          return <ColorCode>{`[${hue} ${sat} ${light}]`}</ColorCode>;
        })}
      </PaletteRow>
    </Container>
  );
};
