import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { changeBaseColor } from 'redux/paletteSlice';
import { RootState } from 'redux/rootReducer';

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

const Details = styled.p`
  font-size: ${p => p.theme.sizing.small};
`;

export const Picker = () => {
  const baseColor = useSelector((state: RootState) => state.palette.baseColor);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(changeBaseColor('#ffc900'));

  return (
    <Container>
      <Well bg={baseColor} onClick={() => handleClick()} />
      <Details />
    </Container>
  );
};
