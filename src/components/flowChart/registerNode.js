export default G6 => {
  G6.registerNode('flowNode', {
    draw (cfg, group) {
      const style = this.getShapeStyle(cfg, group)

      const total = 100

      // 测量文字大小
      const [textSize] = G6.Util.getTextSize(cfg.label + '', 14)

      //元素间距
      const elGap = 8
      // 控制展开按钮的宽度
      const btnSpan = cfg.children ? 24 : 0

      // 方框半径
      const midW = (style.width / 2)
      const midH = style.height / 2

      //边框左右编剧
      const padH = 10;
      const padV = 10;


      //计算标签的宽度
      let infoSize = 0
      if(cfg.children) {
        const numberInfo = `${cfg.children.length}/${total}`
        const [width] = G6.Util.getTextSize(numberInfo, 12)
        infoSize = width
      }


      //计算是双列布局还是单列布局
      let is2Line = false
      const totelElementSize = textSize + padH*2 + (cfg.icons || []).length * (16 + elGap) + (infoSize > 0 ? (infoSize + elGap) : 0) + btnSpan + elGap
      if(totelElementSize - midW * 2 > 0) {
        is2Line = true
      }

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

      if(cfg.icons) {
        cfg.icons.forEach((i,index) => {
          group.addShape('image', {
            attrs: {
              x: midW -16 -padH - btnSpan - infoSize - index*24 - (btnSpan == 0 || infoSize == 0 ? 0 : elGap),
              y: (style.height / 2) - 16 - 12,
              img: i,
              width: 16,
              height: 16
            },
            name: 'flowDom'
          })
        })
      }
      if (cfg.children) {

        //绘制 10/100 标识

        const backInfo = `/${total}`
        const [bWidth] = G6.Util.getTextSize(backInfo, 12)
        const selfWidth = infoSize - bWidth
        group.addShape('text', {
          attrs: {
            text: cfg.children.length,
            fontSize: 12,
            stroke: '#FF7F5A',
            fontWeight: 300,
            textBaseline: 'top',
            x: midW - selfWidth - padH - btnSpan - bWidth,
            y: -5.5
          }
        })

        group.addShape('text', {
          attrs: {
            text: `/${total}`,
            fontSize: 12,
            stroke: '#39B8DB',
            fontWeight: 300,
            textBaseline: 'top',
            x: midW - padH - btnSpan - infoSize/2 - elGap,
            y: -5.5
          }
        })

        // 绘制动作
        group.addShape('circle', {
          attrs: {
            r: 7,
            stroke: '#30373B',
            x: midW - 7 - padH,
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
            x: midW - 7 - padH - 9/2,
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
