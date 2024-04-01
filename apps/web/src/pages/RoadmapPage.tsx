import MainNode from "@/components/mainNode";
import MainPathEdge from "@/components/mainPathEdge";
import { Button } from "@/components/ui/button";
import Layout from "@/layout/layout";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { io } from "socket.io-client";
import { applyEdgeChanges } from "reactflow";
import ChildNode from "@/components/childNode";
import ChildPathEdge from "@/components/childPathEdge";
import DialogGenerate from "@/components/generate-dialog.tsx";
import DialogCustom from "@/components/dialog-custom.tsx";
import { BACKEND_URL } from "@/services";

// Define the steps for the x position values
const xSteps = [350, 400, 600, 800];
// Variable to keep track of the current step index
let currentStepIndex = 0;

// Function to get the next x position value and update the step index
function getNextXStep() {
  const step = xSteps[currentStepIndex];
  currentStepIndex = (currentStepIndex + 1) % xSteps.length; // Cycle through the steps
  return step;
}

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
  const [userPrompt, setUserPrompt] = useState(""); // For storing user input
  const [hideButton, setHideButton] = useState(false);
  const handleInputChange = (e) => setUserPrompt(e.target.value);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {setIsModalOpen(true); setHideButton(true)};
  const handleClose = () => {setIsModalOpen(false); setHideButton(false)};

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleDialogOpen = () => setIsDialogOpen(true);

  const [newNode, setNewNode] = useState<GPTNode>();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges] = useEdgesState([]);

  const [clickedNode, setClickedNode] = useState(null);

  const addNode = (newNode: Node) => {
    setNodes((oldNodes) => [...oldNodes, newNode]);
  };

  const addEdge = (newEdge: Edge) => {
    setEdges((oldEdges) => [...oldEdges, newEdge]);
  };

  const getMainNodes = () => {
    return nodes.filter((node) => node.type === "mainNode");
  };

  useEffect(() => {
    if (!newNode) {
      return;
    }
    const mainNodes = getMainNodes();
    const nodeId = mainNodes.length !== 0 ? mainNodes.length + 1 : 1;
    console.log("nodeId", nodeId);
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
      type: "mainNode",
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: { label: newNode.title },
    });

    addNode({
      id: groupNodeIndex,
      type: "group",
      position: {
        x: nodeId % 2 != 0 ? -1 * getNextXStep() : getNextXStep(),
        y: nodeId % 2 != 0 ? rightSum : leftSum,
      },
      style: {
        width: 150,
        background: "none",
        height: groupSize,
        border: "none",
      },
      data: { label: "" },
    });

    let incrementalStep = 0;

    // Create child nodes for each detail and connect them to the main node
    newNode.details.forEach((detail, index) => {
      const childId = index + 1;
      const detailNodeId = `node_${nodeId}_child_${childId}`;
      addNode({
        id: detailNodeId,
        type: "childNode",
        position: {
          x: 0,
          y: incrementalStep,
        },
        data: { label: detail },
        sourcePosition: nodeId % 2 !== 0 ? Position.Right : Position.Left,
        targetPosition: nodeId % 2 == 0 ? Position.Left : Position.Right,
        //@ts-ignore
        parent: "extent",
        parentNode: groupNodeIndex,
      });
      incrementalStep = incrementalStep + 80;

      // Connect the main node to this detail node
      addEdge({
        id: `node_${nodeId}_to_child_${childId}`,
        source: mainNodeId,
        target: detailNodeId,
        // Use 'bottom' as the source handle for connections from main to child nodes
        sourceHandle: nodeId % 2 !== 0 ? "left" : "right",
        // Choose the target handle based on the child's position (left or right of the main node)
        targetHandle: nodeId % 2 == 0 ? "left" : "right", // Assuming odd nodeId means left, even means right
        type: "childPathEdge",
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
        type: "mainPathEdge", // Make sure this type matches your defined edge types
      });
    }
  }, [newNode]);

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    },
    [setEdges]
  );

  const startStreaming = () => {
    console.log("Starting streaming");
    setHideButton(true);
    const socket = io(BACKEND_URL);

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("createRoadmap", userPrompt);
    });

    socket.on("streamData", (data: GPTNode) => {
      setNewNode(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Layout>
          <ReactFlow
            nodeTypes={nodeTypes}
            fitView
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(event, node) => {
              console.log(node);
              setClickedNode(node);
              handleDialogOpen();
            }}
          >
            <Background
              style={{ backgroundColor: "#282828" }}
              color="#3E3E3E"
              variant={"dots" as BackgroundVariant}
              gap={12}
              size={2}
            />
            <Controls />
          </ReactFlow>
        </Layout>
      </div>
      {!hideButton && (
        <Button
          onClick={handleOpen} // Triggers the modal to open
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Start Generating
        </Button>
      )}
      <DialogGenerate
        isOpen={isModalOpen}
        onClose={handleClose}
        inputValue={userPrompt}
        onInputChange={handleInputChange}
        onSubmit={startStreaming}
      />
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title={clickedNode ? clickedNode.data.label : "Node Information"}
      />
    </>
  );
};
export default RoadmapPage;
