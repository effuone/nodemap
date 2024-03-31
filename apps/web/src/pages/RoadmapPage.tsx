import MainNode from '@/components/mainNode';
import MainPathEdge from '@/components/mainPathEdge';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/layout';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { io } from 'socket.io-client';
import { applyEdgeChanges } from 'reactflow';
import ChildNode from '@/components/childNode';
import ChildPathEdge from '@/components/childPathEdge';

type GPTNode = {
  title: string;
  details: string[];
};

const nodeTypes = {
  mainNode: MainNode,
  childNode: ChildNode,
};
const edgeTypes = {
  mainPathEdge: MainPathEdge,
  childPathEdge: ChildPathEdge,
};

let yPosMainNode = 0;
const yGapMainNode = 150;
const yPosDetailNodeStart = 50;
const yGapDetailNode = 100;
let leftSum = 0;
let rightSum = -200;

const RoadmapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);

  const [newNode, setNewNode] = useState<GPTNode>();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges] = useEdgesState([]);

  const addNode = (newNode: Node) => {
    setNodes((oldNodes) => [...oldNodes, newNode]);
  };

  const addEdge = (newEdge: Edge) => {
    setEdges((oldEdges) => [...oldEdges, newEdge]);
  };

  const getMainNodes = () => {
    return nodes.filter((node) => node.type === 'mainNode');
  };

  useEffect(() => {
    if (!newNode) {
      return;
    }
    const mainNodes = getMainNodes();
    const nodeId = mainNodes.length !== 0 ? mainNodes.length + 1 : 1;
    console.log('nodeId', nodeId);
    const mainNodeId = `node_${nodeId}`;
    yPosMainNode += yGapMainNode;

    let yPosDetailNode = yPosDetailNodeStart;

    const groupNodeIndex = `node_${nodeId}_children`;

    //add group node for upcoming children
    const groupSize = newNode.details.length * yGapDetailNode;

    if (nodeId % 2 !== 0) {
      leftSum += groupSize + 50; // Increment the sum by the group size plus a gap
    } else {
      rightSum += groupSize + 50; // Increment the sum by the group size plus a gap
    }

    addNode({
      id: mainNodeId,
      position: { x: 0, y: yPosMainNode },
      type: 'mainNode',
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: { label: newNode.title },
    });

    addNode({
      id: groupNodeIndex,
      type: 'group',
      position: {
        x: nodeId % 2 != 0 ? -250 : 250,
        y: nodeId % 2 != 0 ? rightSum : leftSum,
      },
      style: {
        width: 150,
        height: groupSize,
        border: 'none',
      },
      data: { label: '' },
    });

    let incrementalStep = 0;

    // Create child nodes for each detail and connect them to the main node
    newNode.details.forEach((detail, index) => {
      const childId = index + 1;
      const detailNodeId = `node_${nodeId}_child_${childId}`;
      addNode({
        id: detailNodeId,
        type: 'childNode',
        position: {
          x: 0,
          y: incrementalStep,
        },
        data: { label: detail },
        sourcePosition: nodeId % 2 !== 0 ? Position.Left : Position.Right,
        targetPosition: Position.Bottom,
        //@ts-ignore
        parent: 'extent',
        parentNode: groupNodeIndex,
      });
      incrementalStep = incrementalStep + 100;

      // Connect the main node to this detail node
      addEdge({
        id: `node_${nodeId}_to_child_${childId}`,
        source: mainNodeId,
        target: detailNodeId,
        type: 'childPathEdge',
      });

      // Update position for next detail node
      yPosDetailNode += yGapDetailNode;
    });

    if (nodeId > 1) {
      // If there's a previous main node, create an edge to connect them
      addEdge({
        id: `edge_node_${nodeId - 1}_to_node_${nodeId}`,
        source: `node_${nodeId - 1}`,
        target: mainNodeId,
        type: 'mainPathEdge', // Make sure this type matches your defined edge types
      });
    }
  }, [newNode]);

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    },
    [setEdges]
  );

  const userPrompt = 'Create a roadmap for becoming full-stack engineer';

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

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Layout>
          <Button
            onClick={startStreaming}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Start Streaming
          </Button>
          <Button
            onClick={handleOpen}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Open Drawer
          </Button>
          <ReactFlow
            nodeTypes={nodeTypes}
            fitView
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          >
            <Background
              style={{ backgroundColor: '#282828' }}
              color="#3E3E3E"
              variant={'dots' as BackgroundVariant}
              gap={12}
              size={2}
            />
            <Controls />
          </ReactFlow>
        </Layout>
      </div>
    </>
  );
};
export default RoadmapPage;
