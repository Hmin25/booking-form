import React from "react";
import {
  Flex,
  Center,
  Image,
  VStack,
  Button,
  Stack,
  HStack,
  Text,
  Box,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import unitPlan from "../asset/isola_keyplan2.png";
import legend from "../asset/LEGENDS.png";
import PopOutForm from "./PopOutForm";
import "../styles.css";
import Axios from "axios";
import { linkUsed } from "../utils/link";

export default function Test() {
  const [currentBlockId, setCurrentBlockId] = React.useState("183");
  const [allFloorsData, setAllFloorsData] = React.useState([]);
  const [currentFloorIndicator, setCurrentFloorIndicator] = React.useState("");
  const [isShowIndividualFloor, setShowIndividualFloor] = React.useState(false);
  const [currentFloor, setCurrentFloor] = React.useState("");

  React.useEffect(() => {
    const retrieveFloorLevelInfo = async () => {
      let data = {
        blockId: currentBlockId,
      };

      await Axios.post(`${linkUsed()}/getUnitSalesLayout`, data)
        .then((res: any) => {
          // console.log("HIHI", res.data)
          // return res.data

          setAllFloorsData(res.data);

          // console.log(res.data[0].floorIndicator)
          // console.log(res.data)
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    // let something = retrieveFloorLevelInfo();

    setAllFloorsData(retrieveFloorLevelInfo());
  }, [currentBlockId]);


  const displayFloorGroup = () => {
    if (allFloorsData && allFloorsData.length > 0) {
      return allFloorsData.map((floor: any) => (
        // console.log(floor.floorArray)

        <Button
          w="100%"
          h="50px"
          cursor="pointer"
          pointerEvents="initial"
          bgColor={"white"}
          _hover={{ background: "#ff9d5c" }}
          fontSize="1.2rem"
          onClick={() => {
            setCurrentFloorIndicator(floor.floorIndicator);
            if (currentFloorIndicator) {
              //     // displayEveryFloor(currentFloorIndicator)
              setShowIndividualFloor(true);
              console.log(currentFloorIndicator);
            }
          }}
        >
          {floor.floorIndicator}
        </Button>
      ));
    } else {
      return null;
    }
  };

  const displayEveryFloor = () => {
    let currentFloorArray: Array<string> = [];
    // if (currentFloorIndicator) {
    // allFloorsData.map((floor: any) => {
    allFloorsData.forEach((floor: any) => {
      if (currentFloorIndicator === floor.floorIndicator) {
        console.log("Now", currentFloorIndicator);
        console.log("Now2", floor.floorIndicator);
        console.log("Compare", floor.floorArray);

        currentFloorArray = floor.floorArray;
      }
    });

    if (currentFloorArray && currentFloorArray.length > 0) {
      return currentFloorArray.map((floorName: string) => (
        <Button
          w="100%"
          cursor="pointer"
          pointerEvents="initial"
          bgColor={"white"}
          _hover={{ background: "#ff9d5c" }}
          fontSize="1.2rem"
          onClick={() => {
            setCurrentFloor(floorName);
          }}
        >
          {floorName}
        </Button>

        //   <Button
        //     w="100%"
        //     cursor="pointer"
        //     pointerEvents="initial"
        //     bgColor={"white"}
        //     _hover={{ background: "#ff9d5c" }}
        //     fontSize="1.2rem"
        //   >
        //     31
        //   </Button>
      ));
      //   return currentFloorArray.map((floorName: string) => {
      //     // <Button w="100%" cursor="pointer" pointerEvents="initial" bgColor={"white"}
      //     // _hover={{ background: "#ff9d5c" }} fontSize="1.2rem">{floorName}</Button>
      //     return <p>{floorName}</p>;
      //   });
    }

    //   }

    // return allFloorsData.map(( floor : any) => (

    //     floor.floorArray.map(function(example : any){
    //         console.log(example)
    //         return example;
    //     })))

    // floor.filter((currentFloorIndicator: any) => currentFloorIndicator === floor.floorIndicator).floorArray.map((example : any) =>
    // floor.floorArray.map((example : any) =>
    // console.log(example)
    // <Button w="100%" cursor="pointer" pointerEvents="initial" bgColor={"white"}
    // _hover={{ background: "#ff9d5c" }} fontSize="1.2rem">{example}</Button>
    // )
    // ));
    // } else {
    //   return null;
    // }
  };


  return (
    <Box className="iframe" h="100vh" overflowY="hidden">
      <Flex w="100%" color="black" overflowY="hidden">
        <PopOutForm />
        <VStack p="5%" h="100vh" w="30%" bgColor="green.500">
          <RadioGroup
            pt="40%"
            onChange={setCurrentBlockId}
            value={currentBlockId}
          >
            <Stack color="white" direction="column">
              <Radio size="lg" colorScheme="yellow" value="183">
                <Text fontSize="1.6rem">Block A</Text>
              </Radio>
              <Radio size="lg" colorScheme="yellow" value="184">
                <Text fontSize="1.6rem">Block B</Text>
              </Radio>
            </Stack>
          </RadioGroup>
          <VStack
            zIndex="5"
            bgColor={"white"}
            pos="absolute"
            align="center"
            bottom="30"
            w="9%"
            borderRadius="10px"
          >
            <Box
              mt={2}
              borderRadius="10px"
              align="center"
              w="100%"
              bgColor={"white"}
              fontSize="1.5rem"
            >
              LEVELS
            </Box>
            {displayFloorGroup()}
          </VStack>
        </VStack>

        <VStack w="100%" bgColor="blue.500">
          <VStack paddingTop={0} h="100%" w="100%">
            <Image
              zIndex="5"
              position="absolute"
              w="75vw"
              h="85vh"
              src={unitPlan}
            ></Image>

            <Stack p="absolute" paddingTop="83vh">
              <Text color="white" fontSize="28px">
                LEVEL {currentFloor}
              </Text>
            </Stack>

            <HStack
              borderRadius="10px"
              w="38%"
              position="absolute"
              zIndex="5"
              bgColor={"white"}
              bottom={15}
              h="50px"
            >
              <Box ml={5} w="100%" bgColor={"white"} fontSize="1.4rem">
                LEVELS
              </Box>
              {isShowIndividualFloor && displayEveryFloor()}
            </HStack>
          </VStack>
        </VStack>

        <Stack w="40%" pt={20} bgColor="red.500">
          <Image
            zIndex="5"
            position="absolute"
            w="16vw"
            h="20vh"
            src={legend}
          ></Image>
        </Stack>
      </Flex>
    </Box>
  );
}
