import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div>
            <p className="app-eyebrow">VectorShift Assessment</p>
            <h1 className="app-title">Workflow Builder</h1>
            <p className="app-subtitle">
              Compose nodes, connect pipeline steps, and validate graph structure with a polished React Flow workspace.
            </p>
          </div>
        </header>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </main>
  );
}

export default App;
