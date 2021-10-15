export default G6 => {
  G6.registerNode('flowNode', {
    draw (cfg, group) {
      const style = this.getShapeStyle(cfg, group)
      const shape = group.addShape('rect', {
        attrs: {
          ...style
        },
        name: 'flowRect'
      })

      group.addShape('text', {
        attrs: {
          fontSize: 14,
          fill: '#30373B',
          text: cfg.label,
          x: 6 - (style.width / 2),
          y: (style.height / 2) - 12
        },
        name: 'flowLabel'
      })

      if (cfg.children) {
        // group.addShape('image', {
        //   attrs: {
        //     x: (style.width / 2) - 16 - 4,
        //     y: (style.height / 2) - 16 - 4,
        //     img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //     width: 16,
        //     height: 16
        //   },
        //   name: 'flowDom'
        // })
        group.addShape('circle', {
          attrs: {
            r: 7,
            stroke: '#30373B',
            x: (style.width / 2) - 7 - 10,
            y: 0
          },
          name: 'actionBtn'
        })
        group.addShape('text', {
          attrs: {
            text: '-',
            fontSize: 14,
            stroke: '#30373B',
            cursor: 'pointer',
            x: (style.width / 2) - 7 - 10 - 4.3,
            y: 6
          },
          name: 'actionTxt'
        })
      }

      return shape
    },
    update (cfg, node) {
      const group = node.getContainer()
      const children = group.get('children')
      const nodeLabel = children.find(child => child.cfg.name === 'flowLabel')
      const icon = children.find(child => child.cfg.name === 'actionTxt')

      if (nodeLabel) {
        nodeLabel.attr({
          text: cfg.label
        })
      }
      if (icon) {
        icon.attr({
          text: cfg.collapsed ? '+' : '-'
        })
      }
    },
    setState (name, value, item) {

    }
  }, 'rect')
}
