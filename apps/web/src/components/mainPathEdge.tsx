import { FC } from 'react';
import { BaseEdge, getBezierPath, EdgeProps } from 'reactflow';

// You might need to adjust the interface based on the actual props you use
interface MainPathEdgeProps extends EdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

const MainPathEdge: FC<MainPathEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  // Use getBezierPath for a curved path
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: 'white', // Edge color
          strokeWidth: 2, // Edge thickness
          strokeLinecap: 'round', // Edge line cap style
          strokeDasharray: '0', // Solid line
          fill: 'none', // Ensures the path is not filled
        }}
      />
    </>
  );
};

export default MainPathEdge;
