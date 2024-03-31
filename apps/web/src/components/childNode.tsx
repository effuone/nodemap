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
    <div className=" bg-[#282828] rounded-[8px] border-[1px] border-[#474747] px-4 py-2 ">
      <div className="text-center text-white text-[17px]">{data.label}</div>
      <Handle type="target" position={targetPosition} className="bg-black hidden" />
      <Handle type="source" position={sourcePosition} className="bg-black hidden" />
    </div>
  );
};

export default ChildNode;
