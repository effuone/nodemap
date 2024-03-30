import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface childNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

const ChildNode: FC<childNodeProps> = ({
  data,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
}) => {
  return (
    <div className="w-[150px] min-h-[70px] px-4 py-2 border-[2px] rounded-md border-black bg-yellow-500 ">
      <div className="text-center">{data.label}</div>

      <Handle type="target" position={targetPosition} className="bg-black" />
      <Handle type="source" position={sourcePosition} className="bg-black" />
    </div>
  );
};

export default ChildNode;
