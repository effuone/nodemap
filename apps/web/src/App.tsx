import { useMemo } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/customNode";

function App() {
  const initialNodes = [
    { id: "1", type: 'customNode', position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", type: 'customNode', position: { x: 0, y: 100 }, data: { label: "2" } },
    { id: "3", type: 'customNode', position: { x: 0, y: 200 }, data: { label: "3" } },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ];

  const newNode = useMemo(() => ({ customNode: CustomNode }), []);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow nodeTypes={newNode} nodes={initialNodes} edges={initialEdges} />
      </div>
    </>
  );
}

export default App;
