import MainNode from "@/components/mainNode";
import MainPathEdge from "@/components/mainPathEdge";
import Layout from "@/layout/layout";
import { applyCommonProperties, constructMainPathEdges } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
// import { io } from "socket.io-client";
import { applyEdgeChanges } from "reactflow";
import ChildNode from "@/components/childNode";
import ChildPathEdge from "@/components/childPathEdge";

type GPTNode = {
  title?: string;
  details?: string[];
};

const nodeTypes = { mainNode: MainNode, childNode: ChildNode };
const edgeTypes = { mainPathEdge: MainPathEdge, childPathEdge: ChildPathEdge };

const nodesInit = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    type: "mainNode",
    data: { label: "Internet" },
  },
  {
    id: '2',
    position: { x: 0, y: 200 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    type: "mainNode",
    data: { label: "HTML" },
  },
  {
    id: '2-1',
    position: { x: 300, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "childNode",
    parentNode: '2',
    extent: 'parent',
    data: { label: "<Body> tag" },
  },
  {
    id: '2-2',
    position: { x: 300, y: 100},
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "childNode",
    parentNode: '2',
    extent: 'parent',
    data: { label: "<Body> tag" },
  },
  {
    id: '3',
    position: { x: 0, y: 400 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    type: "mainNode",
    data: { label: "CSS" },
  },
];

const edgesInit = [{ id: '1-2', source: '1', target: '2', type: "mainPathEdge",}, { id: '2-21', source: '2', target: '2-1',  sourceHandle: "2", type: "childPathEdge"}, { id: '2-3', type:"mainPathEdge", source: '2', target: '3',}];


const RoadmapPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    applyCommonProperties([
      {
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        data: { label: "Internet" },
      },
      {
        position: { x: 0, y: 200 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        data: { label: "HTML" },
      },
    ])
  );

  const [newNode, setNewNode] = useState<GPTNode>();

  const [edges, setEdges] = useEdgesState(constructMainPathEdges(nodes));

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    },
    [setEdges]
  );

  const userPrompt = "Create a roadmap for becoming full-stack engineer";

  useEffect(() => {
    if (!newNode) return;

    setNodes((currentNodes: any) => {
      const lastNode = currentNodes[currentNodes.length - 1];
      const lastNodeYPosition = lastNode ? lastNode.position.y : 0;
      const lastNodeIndex = lastNode ? (Number(lastNode.id) as number) + 1 : 1;

      const newNodeObject: Node = {
        id: `${lastNodeIndex}`,
        type: "mainNode",
        position: { x: lastNode.position.x, y: lastNodeYPosition + 140 },
        data: {
          label: newNode.title,
        },
        sourcePosition: lastNode.sourcePosition,
        targetPosition: lastNode.targetPosition,
      };

      return [...currentNodes, newNodeObject];
    });
  }, [newNode]);

  useEffect(() => {
    setEdges(constructMainPathEdges(nodes));
  }, [nodes]);

  // const startStreaming = () => {
  //   const socket = io("http://localhost:7070");

  //   socket.on("connect", () => {
  //     console.log("Socket connected");
  //     socket.emit("createRoadmap", userPrompt);
  //   });

  //   socket.on("streamData", (data: GPTNode) => {
  //     setNewNode(data);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Socket disconnected");
  //   });

  //   socket.on("connect_error", (error) => {
  //     console.error("Connection error:", error);
  //   });
  // };

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Layout>
        <ReactFlow
          nodeTypes={nodeTypes}
          fitView
          edgeTypes={edgeTypes}
          nodes={nodesInit}
          edges={edgesInit}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <Background style={{backgroundColor: "#282828"}} color="#3E3E3E" variant={'dots' as BackgroundVariant} gap={12} size={2} /> 

        </ReactFlow>
      </Layout>
    </div>
  );
};
export default RoadmapPage;
