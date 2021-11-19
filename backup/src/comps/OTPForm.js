import {
    Button,
    Stack,
    Box,
    HStack,
    Center,
    Text,
    VStack,
    Input,
    PinInput,
    PinInputField,
    Alert,
    AlertDescription,
    AlertIcon
  } from "@chakra-ui/react";
  import { useHistory } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { schemaOtp } from "../utils/otpValid";
  import { linkUsed } from "../utils/link";
  import Axios from "axios";
  
  export default function OTPForm({realOTP, name, email, phone}) {
    const [currentOTP, setCurrentOTP] = useState("");
    const history = useHistory();
    const [error, setError] = useState(false);
    const [otp, setOtp] = useState("");
    const [enableKeyMap, setKeyMap] = useState(false);
    const [isOtpCorrect, setIsOtpCorrect] = useState(false);
    const [alert, setAlert] = useState(false);
  
    async function confirmOTP() {
        await schemaOtp
          .validate({
            otp: otp
          })
          .catch((err) => {
            setError(true);
            return null;
          })
          .then(async (validatedData) => {
            if (validatedData !== null && otp === realOTP) {
              setError(false);
              console.log(otp)
              await Axios.post(`${linkUsed()}/register`, { name, email, phone }).then(
                (res) => {
                    console.log("Done push to Database");
                }
              );
            }
          });
      }
  
    return (

      <>
        {
        enableKeyMap 
        ? (
          history.push('/key-map')
        ) 
        : null
        }

        {alert
        ?
        <HStack zIndex="5" pos="absolute" w="100%" top={0}>
            <Alert status="error" w="100%">
              <AlertIcon />
              <AlertDescription>Please key in the correct OTP.</AlertDescription>
            </Alert>
          </HStack>
        : null
        }
  
      <Center w="100vw" h="100vh" pos="absolute" pointerEvents="initial">
      <VStack bgColor={"white"} w="23%" h="55%" borderRadius="10px" spacing="62" p={5}>
        <Text fontSize="0.8rem">*Please check your email to obtain the OTP code</Text>
        <Text fontSize="1.5rem" align="center" color="black">
          VERIFY OTP
        </Text>
  
        <HStack p="3">
          <PinInput
            onComplete={(e) => {
              setCurrentOTP(e);
              console.log(e)
              console.log("Hello")
              console.log(realOTP)
              if (realOTP === e) {
                setIsOtpCorrect(true);
              }
              else{
                setIsOtpCorrect(false);
              }
            }}
            size="lg"
          >
            <PinInputField borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}/>
            <PinInputField borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}/>
            <PinInputField borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}/>
            <PinInputField borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}/>
          </PinInput>
        </HStack>
  
        <Stack w="100%" align="center">
          <Button
            fontSize="1.2rem"
            backgroundColor={"#423028"}
            cursor="pointer"
            pointerEvents="initial"
            _hover={{ background: "#ff9d5c"}}
            color="white"
            position="absolute"
            onClick={() => {
              if (isOtpCorrect === true) {
                setKeyMap(true);
              } 
              else {
                setAlert(true);
              }}}

            w="180px"
            h="50px"
          >
            Submit
          </Button>
        </Stack>
      </VStack>
  
              </Center>
            </>
    );
  }
  