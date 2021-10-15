export default G6 => {
  G6.registerEdge('poly-my', {
    draw (cfg, group) {
      const { startPoint, endPoint } = cfg
      const yDiff = endPoint.y - startPoint.y
      const xOffset = (endPoint.x - startPoint.x)/3
      const qPoint = {
        x: startPoint.x + xOffset,
        y: endPoint.y
      }
      const path = yDiff === 0 ? [
        ['M', startPoint.x + xOffset, startPoint.y],
        ['L', endPoint.x, endPoint.y]
      ] : [
        ['M', startPoint.x, startPoint.y],
        ['L', qPoint.x, startPoint.y],
        ['L', qPoint.x, endPoint.y + (yDiff > 0 ? -10 : 10)],
        ['Q', qPoint.x, qPoint.y, qPoint.x + 10, qPoint.y],
        ['L', endPoint.x, endPoint.y]
      ]
      const shape = group.addShape('path', {
        attrs: {
          path,
          stroke: '#ccc',
          ...cfg
        },
        name: 'poly-edge'
      })

      return shape
    }
  })
}
