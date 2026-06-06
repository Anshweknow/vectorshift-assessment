// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [endpointUrl, setEndpointUrl] = useState(data?.endpointUrl || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handleEndpointChange = (e) => {
    const value = e.target.value;
    setEndpointUrl(value);
    updateNodeField(id, 'endpointUrl', value);
  };

  const handleMethodChange = (e) => {
    const value = e.target.value;
    setMethod(value);
    updateNodeField(id, 'method', value);
  };

  return (
    <BaseNode
      title="API"
      description="Request external services and pass the response forward."
      variant="api"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
        },
      ]}
    >
      <div className="node-form">
        <label className="node-field">
          Endpoint
          <input
            className="node-input"
            type="text"
            value={endpointUrl}
            onChange={handleEndpointChange}
          />
        </label>
        <label className="node-field">
          Method
          <select className="node-select" value={method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
