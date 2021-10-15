
function Map2String(val) {
    const res = Object.keys(val).map(i => `
        ${i}:${val[i]},
    `)

    return ['{{', ...res, '}}'].join(' ')
}

export default G6 => {


    const textXML = function(cfg) {
        const {style} = cfg
        return  `
        <group>
            <rect
             keyShape="true"
             style={{
                width: ${style.width},
                height: ${style.height},
                fill: ${style.fill},
                stroke: ${style.stroke},
                radius: ${style.radius}, 
            }}>
            <rect style={{{
                next: inline
            }}}>
                <text   style={{
			    textAlign: 'start',
			    fontWeight: 'bold', 
			    fill: '#fff' }}>${cfg.label}</text>
            </rect>
            <rect>
			    <text style={{
			    textAlign: 'start',
			    fontWeight: 'bold',
			    fill: '#fff' }} >测绘</text>
			 </rect>
            </rect>
            
        </group>
       `
    }
    G6.registerNode('domNode', {
        jsx: textXML
    })
}
