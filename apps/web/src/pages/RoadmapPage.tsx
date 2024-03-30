import MainNode from '@/components/mainNode';
import MainPathEdge from '@/components/mainPathEdge';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/layout';
import { applyCommonProperties, constructMainPathEdges } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  Node,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { io } from 'socket.io-client';

type GPTNode = {
  title?: string;
  details?: string[];
};

const RoadmapPage = () => {
  const nodeType = useMemo(() => ({ mainNode: MainNode }), []);
  const edgeTypes = useMemo(
    () => ({
      mainPathEdge: MainPathEdge,
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    applyCommonProperties([
      {
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        data: { label: 'Internet' },
      },
      {
        position: { x: 0, y: 200 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        data: { label: 'Internet' },
      },
    ])
  );

  const [newNode, setNewNode] = useState<GPTNode>();

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    constructMainPathEdges(nodes)
  );

  const userPrompt = 'Create a roadmap for becoming full-stack engineer';

  useEffect(() => {
    if (!newNode) return;

    setNodes((currentNodes: any) => {
      const lastNode = currentNodes[currentNodes.length - 1];
      const lastNodeYPosition = lastNode ? lastNode.position.y : 0;
      const lastNodeIndex = lastNode ? (lastNode.id as number) + 1 : 1;

      const newNodeObject: Node = {
        id: `${lastNodeIndex}`,
        type: 'mainNode',
        position: { x: lastNode.position.x, y: lastNodeYPosition + 100 },
        data: {
          label: newNode.title,
        },
        sourcePosition: lastNode.sourcePosition,
        targetPosition: lastNode.targetPosition,
      };

      setEdges(constructMainPathEdges(nodes));

      return [...currentNodes, newNodeObject];
    });
  }, [newNode]);

  const startStreaming = () => {
    const socket = io('http://localhost:7070');

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('createRoadmap', userPrompt);
    });

    socket.on('streamData', (data: GPTNode) => {
      setNewNode(data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  };

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Layout>
        <Button
          onClick={startStreaming}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Start Streaming
        </Button>
        <ReactFlow
          nodeTypes={nodeType}
          fitView
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
        </ReactFlow>
      </Layout>
    </div>
  );
};
export default RoadmapPage;
