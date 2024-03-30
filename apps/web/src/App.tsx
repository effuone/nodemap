import ReactFlow, { Position } from 'reactflow';
import 'reactflow/dist/style.css';

const applyStyles = (nodes: any) => {
  nodes.forEach(
    (node: any) =>
      (node.style = {
        background: '#FFFF00',
        color: 'black',
        width: 100,
      })
  );
  return nodes;
};

const initialNodes = [
  {
    id: '3',
    position: { x: 0, y: 0 },
    data: { label: 'Internet' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '4',
    position: { x: 200, y: 0 },
    data: { label: 'Html' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '5',
    position: { x: 400, y: 0 },
    data: { label: 'Css' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    position: { x: 600, y: 0 },
    data: {
      label: 'JavaScript',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    position: { x: 800, y: 0 },
    data: {
      label: 'Version Control Systems',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '8',
    position: { x: 1000, y: 0 },
    data: {
      label: 'Package Managers',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '9',
    position: { x: 1200, y: 0 },
    data: {
      label: 'Pick a framework',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '10',
    position: { x: 1400, y: 0 },
    data: { label: 'Writing CSS' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '11',
    position: { x: 1400, y: 100 },
    data: {
      label: 'CSS Architecture',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '12',
    position: { x: 1200, y: 100 },
    data: { label: 'CSS Prepocessors' },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '13',
    position: { x: 1000, y: 100 },
    data: { label: 'Build Tools' },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '14',
    position: { x: 800, y: 100 },
    data: { label: 'Testing Your apps' },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '15',
    position: { x: 600, y: 100 },
    data: {
      label: 'Authentication strategies',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '16',
    position: { x: 400, y: 100 },
    data: {
      label: 'Web Security Basics',
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '17',
    position: { x: 200, y: 100 },
    data: { label: 'Web Components' },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '18',
    position: { x: 0, y: 100 },
    data: { label: 'Type Checkers' },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  {
    id: '19',
    position: { x: 0, y: 200 },
    data: {
      label: 'Server Side Rendering(SSR)',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '20',
    position: { x: 200, y: 200 },
    data: { label: 'GraphQL' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '21',
    position: { x: 400, y: 200 },
    data: {
      label: 'Static Site Generators',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '22',
    position: { x: 600, y: 200 },
    data: {
      label: 'Progressive Web Apps',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '23',
    position: { x: 800, y: 200 },
    data: {
      label: 'Mobile Applications',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '24',
    position: { x: 1000, y: 200 },
    data: {
      label: 'Desktop Applications',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];
const initialEdges = [
  { id: 'e1-2', source: '3', target: '4' },
  { id: 'e1-3', source: '4', target: '5' },
  { id: 'e1-4', source: '5', target: '6' },
  { id: 'e1-5', source: '6', target: '7' },
  { id: 'e1-6', source: '7', target: '8' },
  { id: 'e1-7', source: '8', target: '9' },
  { id: 'e1-8', source: '9', target: '10' },
  { id: 'e1-9', source: '10', target: '11' },
  { id: 'e1-10', source: '11', target: '12' },
  { id: 'e1-11', source: '12', target: '13' },
  { id: 'e1-12', source: '13', target: '14' },
  { id: 'e1-13', source: '14', target: '15' },
  { id: 'e1-14', source: '15', target: '16' },
  { id: 'e1-15', source: '16', target: '17' },
  { id: 'e1-16', source: '17', target: '18' },
  { id: 'e1-17', source: '18', target: '19' },
  { id: 'e1-18', source: '19', target: '20' },
  { id: 'e1-19', source: '20', target: '21' },
  { id: 'e1-20', source: '21', target: '22' },
  { id: 'e1-21', source: '22', target: '23' },
  { id: 'e1-22', source: '23', target: '24' },
];

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={applyStyles(initialNodes)} edges={initialEdges} />
    </div>
  );
}

export default App;
