import { FC } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface MainNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

const MainNode: FC<MainNodeProps> = ({
  data,
  sourcePosition = Position.Top,
  targetPosition = Position.Right,
}) => {
  return (
    <div className="min-w-[150px] min-h-[50px] px-4 py-4 flex justify-center items-center rounded-[8px] bg-white">
      <div className="text-center text-[17px] font-semibold text-black">
        {data.label}
      </div>
      {/* Source handles */}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />

      {/* Handles for connecting child nodes */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="handle-left"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle-right"
      />
    </div>
  );
};

export default MainNode;