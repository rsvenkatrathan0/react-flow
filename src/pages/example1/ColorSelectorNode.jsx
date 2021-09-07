import React, { memo, useState } from 'react';
import Modal from 'react-modal';
import { Handle } from 'react-flow-renderer';
import ColorOptput from './ColorOptput';

const customStyles = {
  overlay: {
    zIndex: 9,
    background: 'rgba(0,0,0,0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '400px',
    height: '300px',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default memo(({ data, isConnectable }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={openModal} role="presentation">
        Custom Color Picker Node:
        {' '}
        <strong>{data.color}</strong>
        <div>
          <input
            className="nodrag"
            type="color"
            onChange={data.onChange}
            defaultValue={data.color}
            onClick={(ev) => { ev.stopPropagation(); }}
          />
        </div>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 30, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Color Details
          <button
            onClick={closeModal}
            type="button"
            style={{
              padding: '0.5rem',
              background: 'inherit',
              outline: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            X
          </button>
        </h2>
        <div>
          <ColorOptput
            data={{ color: data.color, colorType: 'red' }}
            renderAsNode={false}
          />
          <ColorOptput
            data={{ color: data.color, colorType: 'green' }}
            renderAsNode={false}
          />
          <ColorOptput
            data={{ color: data.color, colorType: 'blue' }}
            renderAsNode={false}
          />
        </div>
      </Modal>
    </>
  );
});
