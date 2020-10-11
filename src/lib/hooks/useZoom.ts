import React, { useState, useEffect } from 'react'
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'

export function useZoom(svgRef: any) {
  const [svg, setSvg] = useState(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 })

  useEffect(() => {
    setSvg(svgRef.current)

    const selection = select(svg)

    // create the zoom behaviour
    const zoomHandler = zoom().on('zoom', (event: any) => {
      return setTransform(event.transform)
    })
    // zoomHandler(svgRef)
    selection.call(zoomHandler)

    // on unmount
    return () => selection.on('.zoom', null)
  }, [svg, svgRef])

  return transform
}
