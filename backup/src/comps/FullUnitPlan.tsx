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
import loading from "../asset/loading2.png";
import legend from "../asset/LEGENDS.png";
import PopOutForm from "./PopOutForm";
import "../styles.css";
import Axios from "axios";
import { linkUsed } from "../utils/link";
import FloorPlanImage from "../utils/FloorPlanImage";
import './style.css';


export default function FullUnitPlan() {
  const [currentBlockId, setCurrentBlockId] = React.useState("57");
  const [allFloorsData, setAllFloorsData] = React.useState([]);
  const [currentFloorIndicator, setCurrentFloorIndicator] = React.useState("");
  const [isShowIndividualFloor, setShowIndividualFloor] = React.useState(false);
  const [currentFloor, setCurrentFloor] = React.useState("");
  const [floorPlanImage, setFloorPlanImage] = React.useState(null);
  const [svgPolygon, setSvgPolygon] = React.useState(null);
  const [isPopOutAllow, setIsPopOutAllow] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  // const [tempSvgPolygon, setTempSvgPolygon] = React.useState("");


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
          // bgColor={isClicked ? "#ff9d5c" : "white"}
          bgColor="white"
          _hover={{ background: "#ff9d5c" }}
          _focus={{backgroundColor: "#ff9d5c"}}
          fontSize="1.2rem"
          onClick={() => {
            setCurrentFloorIndicator(floor.floorIndicator);
            setShowIndividualFloor(true);
            // setIsClicked(false);
            // console.log(currentFloorIndicator);

            //comment below's checking, because slow down loading
            // if (currentFloorIndicator) {
            //   //     // displayEveryFloor(currentFloorIndicator)
            //   setShowIndividualFloor(true);
            // }
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
    if (allFloorsData && allFloorsData.length > 0) {
      allFloorsData.forEach((floor: any) => {
        if (currentFloorIndicator === floor.floorIndicator) {
          // console.log("Now", currentFloorIndicator);
          // console.log("Now2", floor.floorIndicator);
          // console.log("Compare", floor.floorArray);

          currentFloorArray = floor.floorArray;
        }
      });
    }

    if (currentFloorArray && currentFloorArray.length > 0) {
      return currentFloorArray.map((floorName: string) => (
        <Button
          w="100%"
          cursor="pointer"
          pointerEvents="initial"
          bgColor={"white"}
          _hover={{ background: "#ff9d5c" }}
          _focus={{backgroundColor: "#ff9d5c"}}
          fontSize="1.2rem"
          onClick={() => {
            setCurrentFloor(floorName);
          }}
        >
          {floorName}
        </Button>

      ));
      //   return currentFloorArray.map((floorName: string) => {
      //     // <Button w="100%" cursor="pointer" pointerEvents="initial" bgColor={"white"}
      //     // _hover={{ background: "#ff9d5c" }} fontSize="1.2rem">{floorName}</Button>
      //     return <p>{floorName}</p>;
      //   });
    }
  };


  React.useEffect(() => {
    const retrieveFloorPlanImage = async () => {
      let data = {
        blockId: currentBlockId,
        floor: currentFloor
      };

      await Axios.post(`${linkUsed()}/getFloorImage`, data)
        .then((res: any) => {

          setFloorPlanImage(res.data.src);
          setIsPopOutAllow(false);

          if(currentBlockId == "57" && currentFloor == "16"){
          setIsPopOutAllow(true);
          }
          setSvgPolygon(res.data.GetFloorPlanSvg.svgAnnotation); //can get unit number(id) , 4 points(coordinates)
          // setSvgPolygon(res.data.GetFloorPlanSvg.units); //can get unit number, status, fill-color

        })
        .catch((err: any) => {
          console.log(err);
        });
    };

    setFloorPlanImage(retrieveFloorPlanImage());

  }, [currentFloor, currentBlockId]);


  // {svgPolygon && setTempSvgPolygon(svgPolygon.substring("<svg", "</svg>"))}
  // {svgPolygon && console.log(tempSvgPolygon)}
  


  return (
    <Box className="iframe" h="100vh" overflowY="hidden">
      <Flex w="100%" color="black" overflowY="hidden">
        {
          isPopOutAllow ? <PopOutForm /> : null
        }
        
        <VStack p="5%" h="100vh" w="30%">
          <RadioGroup
            pt="40%"
            onChange={setCurrentBlockId}
            value={currentBlockId}
          >
            <Stack color="white" direction="column">
              <Radio size="lg" colorScheme="yellow" value="57">
                <Text fontSize="1.6rem" color="white">TOWER A</Text>
              </Radio>
              {/* <Radio size="lg" colorScheme="yellow" value="66">
                <Text fontSize="1.6rem">TOWER B</Text>
              </Radio> */}
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

        <VStack w="100%">
          <VStack paddingTop={0} borderColor="none" h="100%" w="100%">
            <Center paddingTop="40%">
            
            {/* Commented as request in dummy form  */}
            {/* {floorPlanImage && currentFloor && allFloorsData && currentBlockId && <Image cursor="pointer" className="noFill" w="80vw" pointerEvents="initial"
              h="76vh" position="absolute" zIndex="6" src={`data:image/svg+xml;utf8,${encodeURIComponent(svgPolygon)}`}/>} */}
              {/* {floorPlanImage && currentFloor && allFloorsData && currentBlockId && tempSvgPolygon} */}
            <Image
              zIndex="5"
              position="absolute"
              w="55vw"
              h="70vh"
              src={floorPlanImage}
              // alt="floorplan is loading.."
              fallbackSrc={loading}
            ></Image>
            </Center>

            <Stack p="absolute" paddingTop="35vh">
              <Text color="white" fontSize="32px">
                LEVEL {currentFloor}
              </Text>
            </Stack>

            <HStack
              borderRadius="10px"
              w="38%"
              position="absolute"
              zIndex="8"
              bgColor={"white"}
              bottom={45}
              h="50px"
            >
              <Box ml={5} w="100%" bgColor={"white"} fontSize="1.4rem">
                LEVELS
              </Box>
              {isShowIndividualFloor && currentFloorIndicator && displayEveryFloor()}
            </HStack>
          </VStack>
        </VStack>

        <Stack w="40%" pt={20} pl={5} spacing="90%">
          <Image
            zIndex="8"
            position="absolute"
            w="16vw"
            h="20vh"
            src={legend}
          ></Image>
          {/* <Button zIndex="5" w="50%" onClick={() => history.push('/contact-agent')}>Contact Us</Button> */}
        </Stack>
      </Flex>
    </Box>
  );
}


