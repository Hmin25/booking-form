import { Center } from "@chakra-ui/react";

export default function FloorPlanImage({props, image}:any) {

  return (
        <Center  {...props} position="relative" color="#B2A289" bgRepeat="no-repeat" backgroundSize=" 100% 100%" pointerEvents="visibleFill" h="75%" w="80%">
        {props.children}
    </Center>
  );
}