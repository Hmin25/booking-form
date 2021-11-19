import {
    HStack,
    Button,
    VStack,
    Box,
    Text,
    Input,
    Checkbox,
    Stack,
    Alert,
    CloseButton,
    AlertIcon,
    Center,
    InputLeftAddon,
    InputGroup
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { useHistory } from "react-router-dom";
  import { schemaBookNow } from "../utils/checkBookNowValid";
  import { linkUsed } from "../utils/link";
  import Axios from "axios";
  import OTPForm from "./OTPForm";
  import InputFormMobile from "./InputMobile";
  
  export default function BookNowForm() {
    const history = useHistory();
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [agreedTerms, setAgreedTerms] = useState(false);
    const [agreedInfoCollect, setAgreedInfoCollect] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [filled, setIsFilled] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [enableOtpForm, setEnableOtpForm] = useState(false);
  
    async function confirmFormComplete() {
      await schemaBookNow
        .validate({
          fullName: name,
          email: email,
          phone: phone,
          agreedInfoCollect : agreedInfoCollect,
          agreedTerms: agreedTerms,
        })
        .catch((err) => {
          setError(true);
          setMessage(err.errors[0]);
          return null;
        })
        .then(async (validatedData) => {
          if (validatedData !== null) {
            setIsFilled(true);
            setError(false);
            let currentUserData ={
              name, email, phone, type:"book"
          }
            await Axios.post(`${linkUsed()}/getOtp`,currentUserData ).then(
              (res) => {
                if (res && res.data && res.data.otp) {
                  console.log(res.data.otp);
                  setOtpValue(res.data.otp.toString());
                }
              }
            );
            setEnableOtpForm(true);
          }
        });
    }
  
    return (
      // <Stack bgColor="green" align="right" h="100%" w="30%" paddingLeft={["75%", "76%", "76%", "90%"]} paddingBottom={["18%", "20%", "20%", "18%"]}>
      <>
        {enableOtpForm ? (
          
          <OTPForm realOTP={otpValue} name={name} email={email} phone={phone} />
        ) : (
  
          <Center>
          <VStack
            pointerEvents="initial"
            bgColor="white"
            borderRadius="10px"
            position="absolute"
            align="left"
            w="35%"
            h="85%"
            spacing="10%"
            p={5}
            display="flex"
          >
            <Box>
              <Text align="center" fontSize="1.5rem">Isola KLCC</Text>
              <Text align="center" fontSize="1.2rem">Book Now</Text>
              <Stack h="2%"></Stack>
              <Text color="black" fontSize="1.0rem">NAME</Text>
              <Input
                onChange={(e) => setName(e.target.value)}
                size="md"
                w="100%"
                placeholder="eg: Michelle"
                errorBorderColor="red"
                borderRadius="5px"
                borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}
              ></Input>
            </Box>
            <Box>
              <Text color="black" fontSize="1.0rem">EMAIL</Text>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                size="md"
                w="100%"
                placeholder="eg: abcd@gmail.com"
                errorBorderColor="red"
                borderRadius="5px"
                borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}
              ></Input>
            </Box>
            <Box align="left">
              <Text color="black" fontSize="1.0rem">MOBILE</Text>
              <InputFormMobile title='mobile' inputPlaceholder="Eg. 1234567" setProp={setPhone}/>
              {/* <InputGroup>
              <InputLeftAddon children="+60" />
              <Input
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                size="md"
                w="100%"
                placeholder="eg: +6011xxxxxxx"
                errorBorderColor="red"
                borderRadius="5px"
                borderColor="#423028"
                _hover={{borderColor:"#ff9d5c"}}
              ></Input></InputGroup> */}
            </Box>
            <VStack paddingTop="0" align="left">
            <Checkbox isRequired={true} onChange={(e) => setAgreedInfoCollect(e.target.checked)} borderColor="#423028" _hover={{borderColor:"#ff9d5c"}}>
                <Text
                  color="black"
                  fontSize={["0.4rem", "0.4rem", "0.6rem", "0.9rem"]}
                >
                  I hereby understand, acknowledge and expressly give consent to Isola KLCC, its group
                  of companies and their business partners to collect and process my personal data for
                  their records so as to enable them to keep me informed of any updates / information with
                  regard to Isola KLCC's event and any other future event, products, services and marketing
                  information, provided that the use of my personal data will not breach any applicable data
                  protection legislation.
                </Text>
                </Checkbox>
              <Checkbox isRequired={true} onChange={(e) => setAgreedTerms(e.target.checked)} borderColor="#423028" _hover={{borderColor:"#ff9d5c"}}>
                <Text
                  color="black"
                  fontSize={["0.4rem", "0.4rem", "0.6rem", "0.9rem"]}
                >
                  I have read and agreed with privacy policy and PDPA Consent Clause.
                </Text>
                {/* <Text
                  color="black"
                  fontSize={["0.4rem", "0.4rem", "0.5rem", "0.6rem"]}
                >
                  {" "}
                  and PDPA Consent Clause.
                </Text> */}
              </Checkbox>
            </VStack>
  
            <HStack h="15px">
              <Button
                h="42px"
                w="93%"
                fontSize="1.2rem"
                backgroundColor={"#423028"}
                _hover={{ background: "#b79b6e"}}
                color="white"
                position="absolute"
                cursor="pointer"
                pointerEvents="initial"
                onClick={() => {
                  confirmFormComplete(); //open when go real
                  // setEnableOtpForm(true);
                }}
              >
                Submit
              </Button>
            </HStack>

  
            {error ? (
              <Alert pos="absolute" bottom="20" w="80%" status="warning">
                <AlertIcon />
                {message}
                <CloseButton
                  onClick={() => setError(false)}
                  position="absolute"
                  right="8px"
                  top="8px"
                />
              </Alert>
            ) : null}
          </VStack>
          </Center>
        )}
      </>
    );
  }
  