// textNode.js

import { useEffect, useMemo, useState } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

const variableRegex = /{{\s*([A-Za-z_][A-Za-z0-9_]*)\s*}}/g;

const getVariablesFromText = (text) => {
  const variables = new Set();
  let match;

  while ((match = variableRegex.exec(text)) !== null) {
    variables.add(match[1]);
  }

  variableRegex.lastIndex = 0;
  return Array.from(variables);
};

const getTargetHandleTop = (index, totalHandles) => {
  return `${((index + 1) / (totalHandles + 1)) * 100}%`;
};

const getTextNodeSize = (text, variableCount) => {
  const lines = text.split('\n');
  const longestLineLength = Math.max(...lines.map((line) => line.length));

  return {
    width: Math.min(520, Math.max(260, longestLineLength * 8 + 96)),
    minHeight: Math.max(128, lines.length * 24 + 88, variableCount * 26 + 56),
  };
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = useMemo(() => getVariablesFromText(currText), [currText]);
  const nodeSize = useMemo(() => getTextNodeSize(currText, variables.length), [currText, variables.length]);

  useEffect(() => {
    updateNodeInternals(id);
    updateNodeField(id, 'variables', variables);
  }, [id, updateNodeField, updateNodeInternals, variables]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-input-${variable}`,
    style: {top: getTargetHandleTop(index, variables.length)},
  }));

  return (
    <BaseNode
      title="Text"
      variant="text"
      style={nodeSize}
      handles={[
        ...variableHandles,
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    >
      <div className="node-form">
        <label className="node-field">
          Text
          <textarea
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            rows={Math.max(2, currText.split('\n').length)}
            style={{
              minHeight: nodeSize.minHeight - 70,
              resize: 'none',
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
