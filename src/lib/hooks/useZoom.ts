import React, { useState, useEffect } from 'react'
import { zoom, zoomIdentity } from 'd3-zoom'
import { select } from 'd3-selection'

export function useZoom(zoomBaseRef: any, xScale: any, yScale:any) {
  const [svg, setSvg] = useState(null)
  const [transform, setTransform] = useState(zoomIdentity) // zoomIdentity is { x: 0, y: 0, k: 1 }

  // rescale scales: returns a copy of the scale whose domain is transformed
  const xScaleRescaled = transform.rescaleX(xScale)
  const yScaleRescaled = transform.rescaleY(yScale)

  // get transform object
  useEffect(() => {
    setSvg(zoomBaseRef.current)
    const selection = select(svg)
    // create the zoom behaviour
    const zoomHandler = zoom().on('zoom', (event: any) => setTransform(event.transform))
    selection.call(zoomHandler)
    // on unmount
    return () => selection.on('.zoom', null)
  }, [svg, zoomBaseRef])


  return [transform, xScaleRescaled, yScaleRescaled]
}
