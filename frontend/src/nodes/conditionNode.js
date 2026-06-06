// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [conditionExpression, setConditionExpression] = useState(data?.conditionExpression || 'value === true');

  const handleExpressionChange = (e) => {
    const value = e.target.value;
    setConditionExpression(value);
    updateNodeField(id, 'conditionExpression', value);
  };

  return (
    <BaseNode
      title="Condition"
      description="Split flow into true and false branches."
      variant="condition"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: {top: `${100/3}%`},
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: {top: `${200/3}%`},
        },
      ]}
    >
      <div className="node-form">
        <label className="node-field">
          Expression
          <input
            className="node-input"
            type="text"
            value={conditionExpression}
            onChange={handleExpressionChange}
          />
        </label>
      </div>
    </BaseNode>
  );
}
