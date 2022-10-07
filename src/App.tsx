import React from "react";
import logo from "./logo.svg";
import Body from "./Body";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div>
        <Body />
      </div>
    </ChakraProvider>
  );
}

export default App;
