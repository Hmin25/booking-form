import React from "react";
import {
  ChakraProvider,
  theme,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Alert,
  Center,
} from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import FullUnitPlan from "./comps/FullUnitPlan";
import Test from "./comps/Test";
import OTPForm from "./comps/OTPForm";
import BookNowForm from "./comps/BookNowForm";
import ContactAgent from "./comps/ContactAgent";
import KeyMap from "./KeyMap";
import FloorPlanBoard from "./comps/FloorPlanBoard";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <FloorPlanBoard />
        </Route>

        <Route path="/keymap">
          <KeyMap />
        </Route>

        <Route path="/otp">
          <Center
            pointerEvents="none"
            w="100%"
            h="100%"
            pos="absolute"
            zIndex="3"
          >
            <OTPForm />
          </Center>
        </Route>

        <Route path="/test">
          {/* <Center pointerEvents="none"  w="100%" h="100%" pos="fixed" zIndex="3"> */}
          {/* <Test/> */}
          <FullUnitPlan />
          {/* </Center> */}
        </Route>

        <Route path="/vgklcc/contact-agent.htm">
          <ContactAgent />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
