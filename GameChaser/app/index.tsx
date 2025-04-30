import React from "react";
import { registerRootComponent } from "expo";
import MapScreen from "@/screens/MapScreen";

// Export your root component
export default function App() {
  return <MapScreen />;
}

// Register it for web and native
registerRootComponent(App);
