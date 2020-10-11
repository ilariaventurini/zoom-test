import React, { useRef } from 'react'
import { scaleTime, scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { useZoom } from '../lib/hooks/useZoom'
import rawDataset from '../dataset/dataset.csv'
import { Datum } from '../lib/types'
import { Axes } from './Axes'

const dataset = rawDataset as Datum[]

interface Props {
  className?: string
}

const WIDTH = 500
const HEIGHT = 500
const RADIUS = 5
const MARGINS = { top: RADIUS * 2, right: RADIUS, bottom: 50, left: 50 }

export const Scatterplot: React.FC<Props> = ({ className = '' }) => {
  const zoomBaseRef = useRef(null)
  const transform = useZoom(zoomBaseRef)
  console.log(transform);
  // const { x, y, k } = transform

  const dates = dataset.map(d => new Date(d.date))
  const xDomain = extent(dates)
  const xScale = scaleTime().domain(xDomain).range([MARGINS.left, WIDTH - MARGINS.right]).nice()

  const heights = dataset.map(d => d.height)
  const yDomain = extent(heights)
  const yScale = scaleLinear().domain(yDomain).range([HEIGHT - MARGINS.bottom, MARGINS.top]).nice()

  const xLeft = xScale.range()[0]
  const xRight = xScale.range()[1]
  const yTop = yScale.range()[1]
  const yBottom = yScale.range()[0]

  return (
    <svg className={`${className}`} x={0} y={0} width={WIDTH} height={HEIGHT} >
      <g className="-debug">
        <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="none" stroke="black" />
        <rect x={xLeft} y={yTop} width={xRight - xLeft} height={yBottom - yTop} fill="none" stroke="red" />
      </g>

      {/* zoom base */}
      <rect x={xLeft} y={yTop} width={xRight - xLeft} height={yBottom - yTop} fill="tomato" fillOpacity={0.2} ref={zoomBaseRef} />

      <g className="-dots">
        {dataset.map((d, i) => {
          const cx = xScale(new Date(d.date))
          const cy = yScale(d.height)

          return <circle key={i} cx={cx} cy={cy} r={RADIUS} fill="tomato" />
        })}
      </g>

      <Axes xScale={xScale} yScale={yScale} />

      {/* <g transform={`translate(${x}, ${y}) scale(${k})`}>
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
      </g> */}
    </svg>
  )
}