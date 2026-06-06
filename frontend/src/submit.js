// submit.js

import { useState } from 'react';
import { useStore } from './store';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Unable to analyze pipeline. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="submit-section" aria-label="Pipeline analysis controls">
            <button className="submit-button" type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Analyzing...' : 'Analyze Pipeline'}
            </button>
            {result && (
                <div className="analysis-card" role="status" aria-live="polite">
                    <div className="analysis-card__header">
                        <h2 className="analysis-card__title">Pipeline Analysis</h2>
                        <span className={`status-badge ${result.is_dag ? 'status-badge--success' : 'status-badge--danger'}`}>
                            {result.is_dag ? 'DAG Valid' : 'Cycle Detected'}
                        </span>
                    </div>
                    <div className="analysis-grid">
                        <div className="metric-card">
                            <span className="metric-card__label">Total Nodes</span>
                            <span className="metric-card__value">{result.num_nodes}</span>
                        </div>
                        <div className="metric-card">
                            <span className="metric-card__label">Total Edges</span>
                            <span className="metric-card__value">{result.num_edges}</span>
                        </div>
                        <div className="metric-card">
                            <span className="metric-card__label">DAG Status</span>
                            <span className="metric-card__value">{result.is_dag ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="error-card" role="alert">
                    {error}
                </div>
            )}
        </section>
    );
}
