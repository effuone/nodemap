import MainNode from "@/components/mainNode";
import MainPathEdge from "@/components/mainPathEdge";
import { Button } from "@/components/ui/button";
import Layout from "@/layout/layout";
import { applyCommonProperties, constructMainPathEdges } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import ReactFlow, { Position } from "reactflow";
import "reactflow/dist/style.css";

const edgeTypes = {
  mainPathEdge: MainPathEdge,
};

const initialNodes = [
  {
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "Internet" },
  },
  {
    position: { x: 200, y: 0 },
    data: { label: "Html" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 400, y: 0 },
    data: {
      label: "Css",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 600, y: 0 },
    data: {
      label: "JavaScript",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 800, y: 0 },
    data: {
      label: "Version Control Systems",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 1000, y: 0 },
    data: {
      label: "Package Managers",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 1200, y: 0 },
    data: {
      label: "Pick a framework",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 1400, y: 0 },
    data: { label: "Writing CSS" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 1400, y: 100 },
    data: {
      label: "CSS Architecture",
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 1200, y: 100 },
    data: { label: "CSS Prepocessors" },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 1000, y: 100 },
    data: { label: "Build Tools" },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 800, y: 100 },
    data: { label: "Testing Your apps" },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 600, y: 100 },
    data: {
      label: "Authentication strategies",
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 400, y: 100 },
    data: {
      label: "Web Security Basics",
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 200, y: 100 },
    data: { label: "Web Components" },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 0, y: 100 },
    data: { label: "Type Checkers" },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    position: { x: 0, y: 200 },
    data: {
      label: "Server Sring(SSR)",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 200, y: 200 },
    data: { label: "GraphQL" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 400, y: 200 },
    data: {
      label: "Static Site Generators",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 600, y: 200 },
    data: {
      label: "Progressive Web Apps",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    position: { x: 800, y: 200 },
    data: {
      label: "Mobile Applications",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const parentNode: NodeType = {
  data: {
    label: "Web App",
  },
};

type NodeType = {
  index?: number,
  data: {
    label: string,
  },
  position?: {
    x: number,
    y: number,
  },
  sourcePosition?: Position
  targetPosition?: Position
}

const RoadmapPage = () => {
  const newNode = useMemo(() => ({ mainNode: MainNode }), []);

  const [nodeList, setNodeList] = useState<NodeType[]>([]);

  const addParentNode = (parentNode: NodeType) => {
    setNodeList(prevNodeList => {
      const lastIndex = prevNodeList.length > 0 ? prevNodeList[prevNodeList.length - 1].index : -1;
      const lastYPosition = prevNodeList.length > 0 ? prevNodeList[prevNodeList.length - 1].position?.y : 0;
      
      const newNode = {
        ...parentNode,
        index: lastIndex as number + 1,
        position: { x: 0, y: lastYPosition as number + 200 },
        sourcePosition: Position.Top,
        targetPosition: Position.Bottom,
      };
  
      return [...prevNodeList, newNode];
    });
  };

  useEffect(() => {
    console.log(nodeList)
  }, [nodeList])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Layout>
        <Button
          onClick={() => {
            addParentNode(parentNode);
          }}
        >
          {" "}
          add Parent element
        </Button>
        <ReactFlow
          nodeTypes={newNode}
          fitView
          edgeTypes={edgeTypes}
          nodes={applyCommonProperties(nodeList)}
          edges={constructMainPathEdges(initialNodes)}
        ></ReactFlow>
      </Layout>
    </div>
  );
};
export default RoadmapPage;
