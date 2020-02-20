import React from 'react';
import styled from 'styled-components';

import { IChartProps } from 'components/graph';

interface Canvas {
  width: number;
  height: number;
}

const Canvas = styled.div<Canvas>`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  position: relative;
  border-left: 2px solid ${p => p.theme.colors.primary};
  border-bottom: 2px solid ${p => p.theme.colors.primary};
`;

const Grid = styled.div<IGrid>`
  width: 100%;
  height: 100%;
  background-size: 25px 25px;
  background-image: linear-gradient(to right, ${p => p.theme.colors.secondary} 1px, transparent 1px),
    linear-gradient(to bottom, ${p => p.theme.colors.secondary} 1px, transparent 1px);
  box-shadow: inset 0px 0px 10px 14px ${p => p.theme.colors.tertiary};
`;

const SVGCanvas = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  & .shadow {
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2));
  }

  & #active {
    fill: #f9df9d;
  }
`;

interface IGrid {
  width: number;
  height: number;
}

export const Chart = ({ data, xAxis, yAxis, width, height }: IChartProps) => {
  return (
    <Canvas width={width} height={height}>
      <Grid width={width} height={height} />
      <SVGCanvas width={width} height={height}>
        {data.map((color, i) => {
          const [H, S, L] = color;
          const fill = `hsl(${H}, ${S}%, ${L}%)`;
          const maxVal = (channel: number) => (channel === 0 ? 360 : 100);

          const unscaledX = (width * color[xAxis.channel]) / maxVal(xAxis.channel);
          const unscaledY = (height * color[yAxis.channel]) / maxVal(yAxis.channel);

          const padding = 20;
          const x = ((padding + unscaledX) * (width - padding * 2)) / width;
          const y = ((height + padding - unscaledY) * (height - padding * 2)) / height;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="white"
                className="shadow"
                id={i === 4 ? 'active' : ''}
                key={`${x}-${y}-${i}`}
              />
              <circle cx={x} cy={y} r="8" fill={fill} key={`${fill}-${i}`} />
            </g>
          );
        })}
      </SVGCanvas>
    </Canvas>
  );
};
