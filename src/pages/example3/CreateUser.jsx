import React, { memo, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Handle } from 'react-flow-renderer';
import localforage from 'localforage';

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const flowKey = 'userDetails';

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

const userInputFields = [
  { key: 'name' },
  { key: 'email' },
  { key: 'phone' },
];

export default memo(({ data = {}, isConnectable, setUserDetailsInElements }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showParameters, setShowParameters] = useState(false);

  const openModal = () => {
    setShowParameters(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUserDetails = (event, key) => {
    setUserDetails((details) => ({ ...details, [key]: event.target.value }));
  };

  const saveConfiguration = () => {
    console.log('saving configuration', userDetails);
    localforage.setItem(flowKey, userDetails);
    closeModal();
    setUserDetailsInElements(userDetails);
  };

  const renderParameter = () => (
    <div className="parameterPopup">
      {userInputFields.map((field) => (
        <div key={`parameter${field.key}`}>
          {field.key}
          :
          {' '}
          {userDetails[field.key] || 'NA'}
        </div>
      ))}
    </div>
  );

  const renderModal = () => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Provide User Details
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
        {userInputFields.map((field) => (
          <input
            type="text"
            placeholder={`Enter ${field.key}`}
            onChange={(e) => handleUserDetails(e, field.key)}
            value={userDetails[field.key]}
            key={field.key}
          />
        ))}
        <div><button type="button" style={{ background: 'skyblue' }} onClick={saveConfiguration}>Save Details</button></div>
      </div>
    </Modal>
  );

  useEffect(() => {
    if (data.userDetails) {
      setUserDetails(data.userDetails);
    }
  }, [data.userDetails]);

  return (
    <>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: '50%', background: '#555' }}
        isConnectable={isConnectable}
      />
      <div
        className="createUserNode center"
        onClick={openModal}
        role="presentation"
      >
        {' '}
        Create User:
        {' '}
        <div
          className="parametersBtn"
          role="presentation"
          onClick={(e) => {
            e.stopPropagation();
            setShowParameters((prev) => !prev);
          }}
        >
          <button
            type="button"
          >
            +
          </button>
          {' '}
          Parameters
          {showParameters && renderParameter()}
        </div>
      </div>
      {renderModal()}
    </>
  );
});
