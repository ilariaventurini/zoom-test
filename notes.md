# Zoom

## Zoom types

- **Geometric zoom**: means elements just get scaled up or down without any differentiation. All their properties will get scaled up or down.

- **Semantic zoom**: means we control each single element’s property during zoom.

| Function   | Element            | Zoom type | Scale props |
|------------|--------------------|-----------|-------------|
| Zoom base  | rect#listener-rect | -         | -           |
| Zoom target  | circle.planet      | semantic  | radius      |
| Zoom target | x axis tick lines  | semantic  | no          |
| Zoom target | x axis tick labels | semantic  | no          |
