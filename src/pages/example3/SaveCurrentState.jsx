import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data = {}, isConnectable, saveCurrentState }) => (
  <>
    <Handle
      type="source"
      position="top"
      id="a"
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
    <div
      className="createUserNode center"
      onClick={saveCurrentState}
      role="presentation"
    >
      {data.label}
    </div>
  </>
));
