import React from "react";
import {
  Image,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import greenDot from "../asset/greenDot.png";
import redDot from "../asset/redDot.png";
import yellowDot from "../asset/yellowDot.png";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { linkUsed } from "../utils/link";
import Axios from "axios";

export default function PopOutForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState(false);

  const history = useHistory();

  const [closeAlert, setCloseAlert] = useState(false);
  const [iframe, setIframe] = useState(false);
  const [reserveForm, setReserveForm] = useState(false);

  const [isBooked, setIsBooked] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const [floorPlanImage, setFloorPlanImage] = React.useState(null);
  const [svgPolygon, setSvgPolygon] = React.useState(null);

  const openInNewTab = (url: string | undefined) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  React.useEffect(() => {
    const getUnitStatus = async () => {
      let data = {
        blockId: "57",
        floor: "16",
      };

      await Axios.post(`${linkUsed()}/getFloorImage`, data)
        .then((res: any) => {
          setSvgPolygon(res.data.GetFloorPlanSvg.units); //can get unit number, status, fill-color
        })
        .catch((err: any) => {
          console.log(err);
        });
    };

    setSvgPolygon(getUnitStatus());
  }, []);

  const displayEveryUnitStatus = () => {
    if (svgPolygon && svgPolygon.length > 0) {
      let allUnits: any[] = [];
      // let allowedSvgPolygon = [];
      // let neededUnitNumber = ["16-02", "16-13", "16-07", "16-06"];

      // svgPolygon.forEach((unit: any) => {
      //   if unit.unitNumber === neededUnitNumber
      // });


      // to take data from array of svgPolygon
      svgPolygon.map((unit: any) => {

      //for unit 16-02
        if (unit.unitNumber == "16-02") {
          if (unit.status == "0") {
            allUnits.push(
              <Image
                cursor="pointer"
                pointerEvents="initial"
                zIndex="99"
                position="absolute"
                w="3vw"
                h="6vh"
                src={greenDot}
                top="29%"
                left="35%"
                onClick={() => {
                  openInNewTab(
                    "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                  );
                  setAlert(false);
                }}
              />
            );
          } else if (unit.status == "2") {
            console.log("Here I am, 16-02, 2");
            allUnits.push(
              <Image
                cursor="pointer"
                pointerEvents="initial"
                zIndex="6"
                position="absolute"
                w="3vw"
                h="6vh"
                src={redDot}
                top="29%"
                left="35%"
                onClick={() => {
                  openInNewTab(
                    "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                  );
                  setAlert(true);
                }}
              />
            );
          } else {
            allUnits.push(
              <Image
                cursor="pointer"
                pointerEvents="initial"
                zIndex="6"
                position="absolute"
                w="3vw"
                h="6vh"
                src={yellowDot}
                top="29%"
                left="35%"
                onClick={() => {
                  openInNewTab(
                    "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                  );
                  setAlert(true);
                }}
              />
            );
          }
        }


      //for unit 16-13
      if (unit.unitNumber == "16-13") {
        if (unit.status == "0") {
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="99"
              position="absolute"
              w="3vw"
              h="6vh"
              src={greenDot}
              top="52%"
              left="35%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(false);
              }}
            />
          );
        } else if (unit.status == "2") {
          console.log("Here I am, 16-02, 2");
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="6"
              position="absolute"
              w="3vw"
              h="6vh"
              src={redDot}
              top="52%"
              left="35%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(true);
              }}
            />
          );
        } else {
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="6"
              position="absolute"
              w="3vw"
              h="6vh"
              src={yellowDot}
              top="52%"
              left="35%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(true);
              }}
            />
          );
        }
        }
        

      //for unit 16-07
      if (unit.unitNumber == "16-07") {
        if (unit.status == "0") {
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="99"
              position="absolute"
              w="3vw"
              h="6vh"
              src={greenDot}
              top="35%"
              left="62%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(false);
              }}
            />
          );
        } else if (unit.status == "2") {
          console.log("Here I am, 16-02, 2");
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="6"
              position="absolute"
              w="3vw"
              h="6vh"
              src={redDot}
              top="35%"
              left="62%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(true);
              }}
            />
          );
        } else {
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="6"
              position="absolute"
              w="3vw"
              h="6vh"
              src={yellowDot}
              top="35%"
              left="62%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(true);
              }}
            />
          );
        }
        }
        

      //for unit 16-06
      if (unit.unitNumber == "16-06") {
        if (unit.status == "0") {
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="99"
              position="absolute"
              w="3vw"
              h="6vh"
              src={greenDot}
              top="52%"
              left="62%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(false);
              }}
            />
          );
        } else if (unit.status == "2") {
          console.log("Here I am, 16-02, 2");
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="6"
              position="absolute"
              w="3vw"
              h="6vh"
              src={redDot}
              top="52%"
              left="62%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(true);
              }}
            />
          );
        } else {
          allUnits.push(
            <Image
              cursor="pointer"
              pointerEvents="initial"
              zIndex="6"
              position="absolute"
              w="3vw"
              h="6vh"
              src={yellowDot}
              top="52%"
              left="62%"
              onClick={() => {
                openInNewTab(
                  "https://salesbooking.infradigital.com.my/Account/Login?ReturnUrl=%2FAdmin"
                );
                setAlert(true);
              }}
            />
          );
        }
        }
      });

      return allUnits;
    }
  };

  return (
    <Box overflowX="hidden">
      {displayEveryUnitStatus()}

      {alert ? (
        <HStack zIndex="5" pos="absolute" w="100%" top={0}>
          <Alert status="error" w="100%">
            <AlertIcon />
            <AlertDescription>This unit has been booked.</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              cursor="pointer"
              pointerEvents="initial"
              onClick={() => {
                setCloseAlert(true);

                <>{closeAlert ? setAlert(false) : null}</>;
              }}
            />
          </Alert>
        </HStack>
      ) : null}

      {/* {iframe 
                ? <iframe
                src="https://salesbooking.infradigital.com.my/"
                height="80%"
                width="100%"
                title="Pro Sales Website"
                ></iframe>
                
                :null
  
                }  */}
    </Box>
  );
}
