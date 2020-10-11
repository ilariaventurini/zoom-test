import React from 'react'
import { formatDate } from '../lib/format-utils'

const TICKS_COUNTER = 5
const TICK_SIZE = 5
const SPACE_BETWEEN_TICK_AND_LABEL = 5
const FONT_SIZE = 10

interface Props {
  className?: string
  xScale: any
  yScale: any
}

export const Axes: React.FC<Props> = ({ className = '', xScale, yScale }) => {
  const xLeft = xScale.range()[0]
  const xRight = xScale.range()[1]
  const yTop = yScale.range()[1]
  const yBottom = yScale.range()[0]

  const xTicks: Date[] = xScale.ticks(TICKS_COUNTER)
  const yTicks: number[] = yScale.ticks(TICKS_COUNTER)

  return (
    <g className={`-axes ${className}`}>
      <g className="-x-axis">
        <line x1={xLeft} y1={yBottom} x2={xRight} y2={yBottom} stroke="black" />
        <g className="-ticks">
          {xTicks.map((t, i) => {
            const x = xScale(t)

            return (
              <React.Fragment key={i}>
                <line x1={x} y1={yBottom} x2={x} y2={yBottom + TICK_SIZE} stroke="black" />
                <text
                  x={x}
                  y={yBottom + TICK_SIZE + SPACE_BETWEEN_TICK_AND_LABEL}
                  fill="black"
                  fontSize={FONT_SIZE}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                >
                  {formatDate(t)}
                </text>
              </React.Fragment>)
          })}
        </g>
      </g>

      <g className="-y-axis">
        <line x1={xLeft} y1={yTop} x2={xLeft} y2={yBottom} stroke="black" />
        <g className="-ticks">
          {yTicks.map((t, i) => {
            const y = yScale(t)

            return (
              <React.Fragment key={i}>
                <line x1={xLeft - TICK_SIZE} y1={y} x2={xLeft} y2={y} stroke="black" />
                <text
                  x={xLeft - TICK_SIZE - SPACE_BETWEEN_TICK_AND_LABEL}
                  y={y}
                  fill="black"
                  fontSize={FONT_SIZE}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {t}
                </text>
              </React.Fragment>)
          })}
        </g>
      </g>
    </g>
  )
}