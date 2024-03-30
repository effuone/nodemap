import { useMemo } from "react";
import ReactFlow, { Position } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/customNode";
import { applyCommonProperties, constructEdges } from "./lib/utils";
import Layout from "./layout/layout";

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
  {
    position: { x: 1000, y: 200 },
    data: {
      label: "Desktop Applications",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

function App() {
  const newNode = useMemo(() => ({ customNode: CustomNode }), []);
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Layout>
          <ReactFlow
            nodeTypes={newNode}
            fitView
            nodes={applyCommonProperties(initialNodes)}
            edges={constructEdges(initialNodes)}
          ></ReactFlow>
        </Layout>
      </div>
    </>
  );
}

export default App;
