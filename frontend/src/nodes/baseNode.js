// baseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({ title, children, handles = [], style = {} }) => {
  return (
    <div style={{width: 200, height: 80, border: '1px solid black', ...style}}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
      <div>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};
