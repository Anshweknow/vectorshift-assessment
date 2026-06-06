// emailNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const EmailNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [recipientEmail, setRecipientEmail] = useState(data?.recipientEmail || 'user@example.com');

  const handleRecipientChange = (e) => {
    const value = e.target.value;
    setRecipientEmail(value);
    updateNodeField(id, 'recipientEmail', value);
  };

  return (
    <BaseNode
      title="Email"
      variant="email"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-message`,
        },
      ]}
    >
      <div className="node-form">
        <label className="node-field">
          Recipient
          <input
            className="node-input"
            type="email"
            value={recipientEmail}
            onChange={handleRecipientChange}
          />
        </label>
      </div>
    </BaseNode>
  );
}
