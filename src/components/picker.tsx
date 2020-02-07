import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { changeBaseColor } from 'redux/paletteSlice';
import { RootState } from 'redux/rootReducer';
import { hslLabel } from 'utils/swatchColors';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface WellProps {
  bg: string;
}

const Well = styled.div<WellProps>`
  width: 100px;
  height: 100px;
  margin: ${p => p.theme.sizing.large};

  background-color: ${p => p.bg};
  border-radius: 8px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Label = styled.ul`
  font-size: ${p => p.theme.sizing.small};
  margin: ${p => p.theme.sizing.large};
  margin-left: 0;
  width: 5em;
  line-height: ${p => p.theme.fonts.larger};
  font-size: ${p => p.theme.fonts.small};
  list-style: none;
`;

export const Picker = () => {
  const baseColor = useSelector((state: RootState) => state.palette.baseColor);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(changeBaseColor('#ffc900'));

  const labels = hslLabel(baseColor);

  return (
    <Container>
      <Well bg={baseColor} onClick={() => handleClick()} />
      <Label>
        {labels.map(label => (
          <li>{label}</li>
        ))}
      </Label>
    </Container>
  );
};
