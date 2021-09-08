/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  Controls,
} from 'react-flow-renderer';
import localforage from 'localforage';
import './index.css';
import CreateUser from './CreateUser';
import SaveCurrentState from './SaveCurrentState';

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const flowKey = 'userDetails';

const initialElements = [
  {
    id: '1', type: 'createUser', position: { x: 100, y: 100 },
  },
  {
    id: '2', data: { label: 'Save the current state' }, type: 'saveCurrentState', position: { x: 400, y: 300 },
  },
  { id: 'e1-2', source: '1', target: '2' },
];

const Example2 = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };
  const onConnect = (params) => setElements((els) => addEdge(
    { ...params, type: 'buttonedge' }, els,
  ));

  //   const { transform } = useZoomPanHelper();

  const setUserDetailsInElements = (userDetails) => {
    const newElements = [...initialElements];
    newElements[0].data = { userDetails };
    setElements(newElements);
  };

  const setDefaultIfInLocalStorage = async () => {
    const userDetails = await localforage.getItem(flowKey);
    if (userDetails) {
      setUserDetailsInElements(userDetails);
    }
  };

  const saveState = () => {
    localforage.setItem('createUserElements', elements);
    console.log('storing elements', elements);
    // eslint-disable-next-line no-alert
    alert('saved flowchart info');
  };

  useEffect(() => {
    setDefaultIfInLocalStorage();
  }, []);

  const nodeTypes = {
    createUser: (nodeProps) => (
      <CreateUser
        {...nodeProps}
        setUserDetailsInElements={setUserDetailsInElements}
      />
    ),
    saveCurrentState: (nodeProps) => (
      <SaveCurrentState
        {...nodeProps}
        saveCurrentState={saveState}
      />
    ),
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        className="reactflow"
      >
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default Example2;
