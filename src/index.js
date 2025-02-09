import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box } from "@chakra-ui/react";

const App = () => (
  <ChakraProvider>
    <Box p={4} maxW="400px" mx="auto" bg="gray.100">
      <h1>Chakra UI (v2.8.0) ✅</h1>
    </Box>
  </ChakraProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);
