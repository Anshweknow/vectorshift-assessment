// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <div
        className={`draggable-node node-accent--${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        draggable
        role="button"
        tabIndex={0}
        aria-label={`Add ${label} node`}
      >
          <span className="draggable-node__label">{label}</span>
      </div>
    );
  };
