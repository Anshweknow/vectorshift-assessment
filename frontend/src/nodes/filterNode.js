// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [conditionText, setConditionText] = useState(
    data?.conditionText || 'value contains text'
  );

  const handleConditionChange = (e) => {
    const value = e.target.value;
    setConditionText(value);
    updateNodeField(id, 'conditionText', value);
  };

  return (
    <BaseNode
      title="Filter"
      description="Allow matching values through the pipeline."
      variant="filter"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    >
      <div className="node-form">
        <label className="node-field">
          Condition
          <input
            className="node-input"
            type="text"
            value={conditionText}
            onChange={handleConditionChange}
          />
        </label>
      </div>
    </BaseNode>
  );
};