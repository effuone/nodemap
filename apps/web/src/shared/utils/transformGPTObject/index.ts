import { Position } from "reactflow";

type gptNodeType = {
  title: string;
  x: string | number;
  y: string | number; 
  sourcePosition: "right" | "left" | "top" | "bottom";
  targetPosition: "right" | "left" | "top" | "bottom";
};

export type NodeType = {
  position: {
    x: number;
    y: number;
  };
  sourcePosition: Position;
  targetPosition: Position;
  data: { label: string };
};

const INITIAL_STATE = {
  position: {
    x: 0,
    y: 0,
  },
  sourcePosition: Position.Left,
  targetPosition: Position.Right,
  data: { label: "default" },
};

const transformGPTObject = (gptNodes: gptNodeType[]) => {
  const position = {
    right: Position.Right,
    left: Position.Left,
    top: Position.Top,
    bottom: Position.Bottom,
  };

  gptNodes.forEach((gptNode) => {
    const node: NodeType = INITIAL_STATE;

    node.position = {
      x: Number(gptNode.x),
      y: Number(gptNode.y),
    };
    node.sourcePosition = position[gptNode.sourcePosition];
    node.data = {
      label: gptNode.title,
    };
  });
};

export default transformGPTObject;
