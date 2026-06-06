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
    width: Math.min(500, Math.max(200, longestLineLength * 8 + 80)),
    height: Math.max(80, lines.length * 22 + 60, variableCount * 24 + 40),
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
      <div>
        <label>
          Text:
          <textarea
            value={currText}
            onChange={handleTextChange}
            rows={Math.max(1, currText.split('\n').length)}
            style={{
              width: nodeSize.width - 20,
              height: nodeSize.height - 45,
              boxSizing: 'border-box',
              resize: 'none',
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
