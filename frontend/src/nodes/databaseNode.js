// databaseNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [databaseName, setDatabaseName] = useState(data?.databaseName || 'default_db');

  const handleDatabaseNameChange = (e) => {
    const value = e.target.value;
    setDatabaseName(value);
    updateNodeField(id, 'databaseName', value);
  };

  return (
    <BaseNode
      title="Database"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-query`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-result`,
        },
      ]}
    >
      <div>
        <label>
          Database:
          <input
            type="text"
            value={databaseName}
            onChange={handleDatabaseNameChange}
          />
        </label>
      </div>
    </BaseNode>
  );
}
