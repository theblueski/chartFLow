<template>
  <div class="flowChartWrapper">
    <div id="g6Node" ref="mountNode" class="g6Wrapper"></div>
    <a-input
      v-show="showInput"
      id="inputHandler"
      ref="inputHandler"
      v-model="inputVal"
      :style="{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${position.width}px`,
        height: `${position.height}px`
      }"
      type="text"
      @blur="handleBlur"
    />
  </div>
</template>
<script>
import G6 from '@antv/g6'
import registerEdge from './registerEdge'
import registerNode from './registerNode'
export default {
  name: 'flowChart',
  mounted () {
    const { width, height } = this.$refs.mountNode.getBoundingClientRect()
    this.initGraph(width, height)
    this.graph.read(this.info)
    this.bindEvents()
  },
  methods: {
    initGraph (width, height) {
      const vm = this
      registerEdge(G6)
      registerNode(G6)

      const menu = new G6.Menu({
        offsetY: 10,
        itemTypes: ['node'],
        getContent (e) {
          return `
            <div class="g6MenuWrapper">
                <div class="menuItem" command="edit">编辑</div>
                <div class="menuItem" command="delete">删除</div>
            </div>
          `
        },
        handleMenuClick (target, item) {
          const command = target.getAttribute('command')
          switch (command) {
            case 'edit':
              vm.editNode(item)
              break
            case 'delete':
              vm.deleteNode(item)
              break
          }
        }
      })

      this.graph = new G6.TreeGraph({
        container: 'g6Node',
        width,
        height,
        defaultNode: {
          type: 'flowNode',
          style: {
            width: 260,
            height: 40,
            radius: 8,
            fill: '#fff',
            stroke: '#CCCCCC'
          },
          labelCfg: {
            fontSize: 14,
            fill: '#30373B'
          }
        },
        defaultEdge: {
          type: 'poly-my'
        },
        layout: {
          type: 'mindmap',
          getHGap: () => 80
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas'
          ]
        },
        plugins: [menu],
        fitView: true,
        fitCenter: false,
        maxZoom: 1
      })
    },
    bindEvents () {
      this.graph.on('node:click', ({ target: { cfg }, item }) => {
        const model = item.getModel()
        if (cfg.name === 'actionBtn' || cfg.name === 'actionTxt') {
          model.collapsed = !model.collapsed
          this.graph.updateItem(item, model)
          this.graph.layout()
          item.toFront()
        } else {
          this.currentNode.id = model.id
        }
      })
    },
    editNode (item) {
      const model = item.getModel()
      const { cacheCanvasBBox } = item.get('group').cfg
      const { x, y, width, height } = cacheCanvasBBox
      const { top, left } = this.$refs.mountNode.getBoundingClientRect()
      this.showInput = true
      this.currentNode.id = model.id
      this.inputVal = model.label
      this.position = {
        x: x + left,
        y: y + top,
        width,
        height
      }
      this.$nextTick(() => {
        this.$refs.inputHandler.focus()
      })
    },
    deleteNode (item) {
      const id = item.get('id')
      this.graph.removeChild(id)
    },
    handleBlur () {
      this.showInput = false
      const item = this.graph.findById(this.currentNode.id)
      const model = item.getModel()
      model.label = this.inputVal
      this.graph.updateItem(item, model)
    }
  },
  data () {
    return {
      position: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      currentNode: {
        id: 0
      },
      inputVal: null,
      showInput: false,
      graph: null,
      info: {
        id: 'Modeling Methods',
        label: 'Modeling Methods',
        children: [
          {
            id: 'Classification',
            label: 'Classification',
            children: [
              { id: 'Logistic regression', label: 'Logistic regression' },
              { id: 'Linear discriminant analysis', label: 'Linear discriminant analysis' }
            ]
          },
          {
            id: 'Consensus',
            label: 'Consensus'
          },
          {
            id: 'Regression',
            label: 'Regression',
            children: [
              { id: 'Multiple linear regression', label: 'Multiple linear regression' },
              { id: 'Partial least squares', label: 'Partial least squares' }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style lang="less">
  .flowChartWrapper {
    width: 100%;
    height: 100%;
    .g6-component-contextmenu {
      padding: 0;
      overflow: hidden;
    }
  }
  .g6Wrapper {
    width: 100%;
    height: 100%;
  }
  .g6MenuWrapper {
    background: #eee;
    .menuItem {
      width: 128px;
      line-height: 32px;
      color: #30373B;
      font-size: 12px;
      text-align: center;
      &:hover {
        color: #fff;
        background: #39B8DB;
      }
    }
  }
  #inputHandler {
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
  }
</style>
