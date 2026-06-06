from collections import defaultdict, deque
from typing import Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class PipelineNode(BaseModel):
    id: str

    class Config:
        extra = "allow"


class PipelineEdge(BaseModel):
    source: str
    target: str

    class Config:
        extra = "allow"


class PipelineParseRequest(BaseModel):
    nodes: List[PipelineNode]
    edges: List[PipelineEdge]


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def is_dag(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    graph_nodes = {node.id for node in nodes}
    adjacency: Dict[str, List[str]] = defaultdict(list)
    in_degree: Dict[str, int] = {node_id: 0 for node_id in graph_nodes}

    for edge in edges:
        graph_nodes.add(edge.source)
        graph_nodes.add(edge.target)
        in_degree.setdefault(edge.source, 0)
        in_degree.setdefault(edge.target, 0)
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque(node_id for node_id in graph_nodes if in_degree[node_id] == 0)
    visited_count = 0

    while queue:
        node_id = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[node_id]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(graph_nodes)


@app.get('/')
def read_root() -> Dict[str, str]:
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse', response_model=PipelineParseResponse)
def parse_pipeline(pipeline: PipelineParseRequest) -> PipelineParseResponse:
    return PipelineParseResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_dag(pipeline.nodes, pipeline.edges),
    )
