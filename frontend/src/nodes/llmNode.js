// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id }) => {

  return (
    <BaseNode
      title="LLM"
      variant="llm"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: {top: `${100/3}%`},
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: {top: `${200/3}%`},
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
        },
      ]}
    >
      <p className="node-description">Structured language model step with system and prompt inputs.</p>
    </BaseNode>
  );
}
