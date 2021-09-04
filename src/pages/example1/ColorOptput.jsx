import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {};
  }

  function getrgb(key,value){
      let result
      switch (key) {
          case 'r':
            result='rgb('+value+',0,0)'
            break;
            case 'g':
            result='rgb(0,'+value+',0)'
            break;
            case 'b':
            result='rgb(0,0,'+value+')'
            break;
          default:
              break;
      }
      return result;
  }

export default memo(({ data, isConnectable }) => {
    
    const color=hexToRgb(data.color)[data.colorType[0]]
    const background=  getrgb(data.colorType[0],color)
    console.log(background)
  return (
    <>
    <Handle
        type="source"
        position="left"
        id="a"
        style={{ top: '50%', background: '#555' }}
        isConnectable={isConnectable}
      />
    <div style={{ border: '1px solid #777', padding: 10, background: '#fff' , color: '#000'}}>
        {data.colorType} Amount: {color}
        <div style={{background:background, width:'20px', height:'10px', content: ' ', border: '1px solid black' }}>
            
        </div>
    </div>
     
    </>
    
  );
});