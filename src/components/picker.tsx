import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import palette, { changeBaseColor } from 'redux/paletteSlice';

const mapDispatch = { changeBaseColor };

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

const handleClick = () => changeBaseColor('#fff');

const Picker = () => {
  const { baseColor } = palette(undefined, {
    type: changeBaseColor.type,
    payload: '#f7cf7d',
  });
  return (
    <Container>
      <Well bg={baseColor} onClick={() => handleClick()} />
      <Details />
    </Container>
  );
};

export default connect(null, mapDispatch)(Picker);
