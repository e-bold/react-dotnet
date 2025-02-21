import { FC, useEffect } from "react";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";

const sigmaStyle = { height: "500px", width: "100%" };

const MyGraph: FC = () => {
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();
  const sigmaInstance = useSigma(); // Access Sigma instance

  useEffect(() => {
    // Create the graph
    const graph = new MultiDirectedGraph();
    
    graph.addNode("A", { 
      x: 0, y: 0, label: "Node A", size: 15, color: "#3498db",
      description: "This is Node A. It has some additional information." 
    });

    graph.addNode("B", { 
      x: 1, y: 1, label: "Node B", size: 15, color: "#e74c3c",
      description: "Node B contains more details when hovered." 
    });

    graph.addNode("C", { 
      x: 0, y: 1, label: "Node C", size: 15, color: "#2ecc71",
      description: "This is Node C. It has some useful info." 
    });

    graph.addNode("D", { 
      x: 1, y: 0, label: "Node D", size: 15, color: "#f39c12",
      description: "Node D has additional insights when hovered." 
    });

    graph.addEdgeWithKey("rel1", "A", "B", { label: "REL_1", size: 2 });
    graph.addEdgeWithKey("rel2", "A", "C", { label: "REL_2", size: 2 });
    graph.addEdgeWithKey("rel3", "B", "D", { label: "REL_3", size: 2 });
    graph.addEdgeWithKey("rel4", "C", "D", { label: "REL_4", size: 2 });

    loadGraph(graph);

    // Register event for node interactions
    registerEvents({
      clickNode: (event) => {
        const nodeAttributes = graph.getNodeAttributes(event.node);
        console.log(`Clicked Node: ${nodeAttributes.label}`);

        // Center the clicked node
        sigmaInstance.getCamera().animate(
          { x: nodeAttributes.x, y: nodeAttributes.y, ratio: 0.7 }, 
          { duration: 300 }
        );
      },

      clickStage: () => {
        console.log("Clicked outside of a node.");

        // Reset camera to default position (zoom out and center)
        sigmaInstance.getCamera().animate(
          { x: 0.5, y: 0.5, ratio: 2 }, 
          { duration: 300 }
        );
      },

      // Handle mouse entering a node (hover)
      enterNode: (event) => {
        const nodeId = event.node;
        const attributes = graph.getNodeAttributes(nodeId);

        // Show description by updating the label
        graph.setNodeAttribute(nodeId, "label", `${attributes.label}\n\n${attributes.description}`);
        graph.setNodeAttribute(nodeId, "size", 25); // Enlarge the node

        sigmaInstance.refresh();
      },

      // Handle mouse leaving a node (hover ends)
      leaveNode: (event) => {
        const nodeId = event.node;
        const attributes = graph.getNodeAttributes(nodeId);

        // Restore original label
        const originalLabel = attributes.label.split("\n\n")[0]; // Remove description
        graph.setNodeAttribute(nodeId, "label", originalLabel);
        graph.setNodeAttribute(nodeId, "size", 15); // Restore original size

        sigmaInstance.refresh();
      }
    });
  }, [loadGraph, registerEvents, sigmaInstance]);

  return null;
};

export const MultiDirectedGraphView: FC = () => {
  return (
    <SigmaContainer style={sigmaStyle} graph={MultiDirectedGraph} >
      <MyGraph />
    </SigmaContainer>
  );
};
