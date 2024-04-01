import Layout from "@/layout/layout";
import { useState } from "react";
import ReactFlow, { Background, useEdgesState, useNodesState } from "reactflow";

//TYPES
type GPTNode = {
    title: string;
    details: string[];
};


const RoadmapPage = () => {
  
  const [userPrompt, setUserPrompt] = useState<string>("");
  const handleUserPromptChange = (e) => setUserPrompt(e.target.value); 

  const [isGenerateButtonHidden, setIsGenerateButtonHidden] = useState<boolean>(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [newNode, setNewNode] = useState<GPTNode>();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const [clickedNode, setClickedNode] = useState(null);
  return(
    <>
    <div style={{width: '100vw', height: '100vh', position: 'relative'}}>
        <Layout>
            <ReactFlow>
                <Background />
            </ReactFlow>
        </Layout>
    </div>
    </>
  )
};

export default RoadmapPage;
