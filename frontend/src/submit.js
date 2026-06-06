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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px'}}>
            <button type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            {result && (
                <div style={{border: '1px solid #ccc', borderRadius: '8px', padding: '12px', minWidth: '240px'}}>
                    <div><strong>Pipeline Analysis</strong></div>
                    <div>Nodes: {result.num_nodes}</div>
                    <div>Edges: {result.num_edges}</div>
                    <div>Is DAG: {result.is_dag ? 'Yes' : 'No'}</div>
                </div>
            )}
            {error && (
                <div style={{color: '#b00020', maxWidth: '480px', textAlign: 'center'}}>
                    {error}
                </div>
            )}
        </div>
    );
}
