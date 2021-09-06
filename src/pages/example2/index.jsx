/* eslint-disable max-len */
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  Controls,
} from 'react-flow-renderer';
import localforage from 'localforage';
import './save.css';
import ButtonEdge from './ButtonEdge';

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const initialElements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
];

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const Example2 = () => {
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };
  const onConnect = (params) => setElements((els) => addEdge({ ...params, type: 'buttonedge' }, els));

  //   const { transform } = useZoomPanHelper();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);
      if (flow) {
        // const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        // transform({ x, y, zoom: flow.zoom || 0 });
      } else {
        setElements(initialElements);
      }
    };

    restoreFlow();
  }, [setElements]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: 500,
        y: 100,
      },
    };
    setElements((els) => els.concat(newNode));
  }, [setElements]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onLoad={setRfInstance}
        className="reactflow"
      >
        <div className="save__controls">
          <button onClick={onSave} type="button">save</button>
          <button onClick={onRestore} type="button">restore</button>
          <button onClick={onAdd} type="button">add node</button>
        </div>
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default Example2;
