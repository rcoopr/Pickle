import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

interface WellProps {
  bg: string;
}

const Well = styled.div<WellProps>`
  width: 100px;
  height: 100px;
  background-color: ${p => p.bg};
  border-radius: 8px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const handleClick = (setPrimary: any) => {
  setPrimary('#fff');
};

export const Picker = () => {
  const [primary, setPrimary] = useState('#1FC6EA');
  return (
    <Container>
      <Well bg={primary} onClick={() => handleClick(setPrimary)} />
      {/* <Details /> */}
    </Container>
  );
};
