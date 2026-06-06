// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || 'Text'
  );

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'outputName', value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  };

  return (
    <BaseNode
      title="Output"
      description="Publish the final workflow result."
      variant="output"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    >
      <div className="node-form">
        <label className="node-field">
          Name
          <input
            className="node-input"
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </label>

        <label className="node-field">
          Type
          <select
            className="node-select"
            value={outputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};