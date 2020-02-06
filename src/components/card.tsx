import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: ${p => p.theme.sizing.large};
  border-radius: 12px;
  box-shadow: 0 0.2px 0.4px rgba(0, 0, 0, 0.024), 0 0.6px 1px rgba(0, 0, 0, 0.035),
    0 1.5px 2.4px rgba(0, 0, 0, 0.046), 0 5px 8px rgba(0, 0, 0, 0.07);
`;

export const Card = ({ children }: { children: React.ReactNode }) => (
  <Container>{children}</Container>
);
