import React from 'react';
import styled from 'styled-components';

import Picker from 'components/picker';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: ${p => p.theme.sizing.large};
  border-radius: 12px;
  box-shadow: 0 0.2px 0.4px rgba(0, 0, 0, 0.024), 0 0.6px 1px rgba(0, 0, 0, 0.035),
    0 1.5px 2.4px rgba(0, 0, 0, 0.046), 0 5px 8px rgba(0, 0, 0, 0.07);
`;

const Details = styled.ul`
  margin: ${p => p.theme.sizing.large};
  margin-left: 0;
  width: max-content;
  line-height: ${p => p.theme.fonts.larger};
  font-size: ${p => p.theme.fonts.small};
  list-style: none;
`;

export const PickerCard = () => (
  <Container>
    <Picker />
    <Details>
      <li>H: 191</li>
      <li>S: 83%</li>
      <li>L: 52%</li>
    </Details>
  </Container>
);
