import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
} from 'react-flow-renderer';
import ColorSelectorNode from './ColorSelectorNode';
import '../index.css';
import ColorOptput from './ColorOptput';

const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  colorOutputNode: ColorOptput,
};

const CustomNodeFlow = () => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event) => {
      const color = event.target.value;
      setElements((els) => els.map((e) => ({
        ...e,
        data: {
          ...e.data,
          color,
        },
      })));
      setBgColor(color);
    };

    setElements([

      {
        id: '2',
        type: 'selectorNode',
        data: { onChange, color: initBgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 10, y: 50 },
      },
      {
        id: '3',
        type: 'colorOutputNode',
        data: { color: initBgColor, colorType: 'red' },
        position: { x: 350, y: 0 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'colorOutputNode',
        data: { color: initBgColor, colorType: 'green' },
        position: { x: 350, y: 75 },
        targetPosition: 'left',
      },
      {
        id: '5',
        type: 'colorOutputNode',
        data: { color: initBgColor, colorType: 'blue' },
        position: { x: 350, y: 150 },
        targetPosition: 'left',
      },

      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2c-5',
        source: '2',
        target: '5',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
    ]);
  }, []);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onElementsRemove = useCallback(
    (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els)),
    [],
  );
  const onConnect = useCallback(
    (params) => setElements((els) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els)),
    [],
  );

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
      }
    },
    [reactflowInstance],
  );

  return (
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      style={{ background: bgColor }}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      defaultZoom={0.5}
      className="reactflow"
    >
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
