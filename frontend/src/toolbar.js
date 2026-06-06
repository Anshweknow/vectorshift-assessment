// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <section className="toolbar" aria-label="Pipeline node toolbar">
            <div className="toolbar__header">
                <h2 className="toolbar__title">Node library</h2>
                <span className="toolbar__hint">Drag a node onto the canvas</span>
            </div>
            <div className="toolbar__nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='email' label='Email' />
                <DraggableNode type='condition' label='Condition' />
            </div>
        </section>
    );
};
