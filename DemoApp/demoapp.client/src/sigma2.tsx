import { FC, useEffect, useRef } from "react";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";

const sigmaStyle = { height: "500px", width: "100%" };

const MyGraph: FC = () => {
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();
  const sigmaInstance = useSigma(); // Access Sigma instance
  const initialCameraPosition = useRef({ x: 0, y: 0, ratio: 1 }); // Store initial camera position

  useEffect(() => {
    // Create the graph
    const graph = new MultiDirectedGraph();

    graph.addNode("A", { x: 0, y: 0, label: "Node A", size: 15, color: "#3498db" });
    graph.addNode("B", { x: 1, y: 1, label: "Node B", size: 15, color: "#e74c3c" });
    graph.addEdgeWithKey("rel1", "A", "B", { label: "REL_1", size: 2 });
    graph.addEdgeWithKey("rel2", "A", "B", { label: "REL_2", size: 2 });

    loadGraph(graph);

    // Store the initial camera position
    const camera = sigmaInstance.getCamera();
    initialCameraPosition.current = { x: camera.x, y: camera.y, ratio: camera.ratio };

    // Register event for node click
    registerEvents({
      clickNode: (event) => {
        const nodeAttributes = graph.getNodeAttributes(event.node); // Get clicked node's attributes
        console.log(`Clicked Node: ${nodeAttributes.label}`);

        // Center the clicked node
        sigmaInstance.getCamera().animate(
          { x: nodeAttributes.x, y: nodeAttributes.y, ratio: 0.7 }, // Adjust ratio for zoom level
          { duration: 300 } // Smooth animation transition
        );
      },
      clickStage: () => {
        // Reset the camera to initial position when clicking outside of a node
        sigmaInstance.getCamera().animate(initialCameraPosition.current, { duration: 300 });
      }
    });
  }, [loadGraph, registerEvents, sigmaInstance]);

  return null;
};

export const MultiDirectedGraphView: FC = () => {
  return (
    <SigmaContainer style={sigmaStyle} graph={MultiDirectedGraph}>
      <MyGraph />
    </SigmaContainer>
  );
};
