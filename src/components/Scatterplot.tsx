import React, { useState, useRef, useEffect } from 'react'
import { useZoom } from '../lib/hooks/useZoom'

interface Props {
  className?: string
}

const WIDTH = 300
const HEIGHT = 300

export const Scatterplot: React.FC<Props> = ({ className = "" }) => {
  const svgRef = useRef(null)
  const transform = useZoom(svgRef)
  const { x, y, k } = transform

  return (
    <svg className={`${className}`} x={0} y={0} width={WIDTH} height={HEIGHT} ref={svgRef}>
      <g transform={`translate(${x}, ${y}) scale(${k})`}>
        <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="teal" />
        <text
          x={WIDTH / 2}
          y={HEIGHT / 2}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Hello world!
            </text>
        <circle cx={WIDTH / 3} cy={HEIGHT / 3} r={5} fill="tomato" />
      </g>
    </svg>
  )
}