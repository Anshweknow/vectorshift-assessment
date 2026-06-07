// baseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({
  title,
  description,
  children,
  handles = [],
  style = {},
  variant = 'default',
}) => {
  return (
    <div
      className={`base-node node-accent--${variant}`}
      style={style}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          className="base-node__handle"
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div className="base-node__header">
        <span className="base-node__title">
          {title}
        </span>

        {description && (
          <span className="base-node__description">
            {description}
          </span>
        )}
      </div>

      <div className="base-node__body">
        {children}
      </div>
    </div>
  );
};