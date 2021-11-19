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
import "../styles.css";
import agentIcon from "../asset/agentIcon.png";
import whatsapp from "../asset/whatsapp.png";
import ReactWhatsapp from 'react-whatsapp';
import Axios from "axios";
import { linkUsed } from "../utils/link";


export default function ContactAgent() {

    const [agentName, setAgentName] = React.useState("");
    const [agentEmail, setAgentEmail] = React.useState("");
    const [agentPhone, setAgentPhone] = React.useState("");


    //To get agentCode from URL(pathname), i.e. /vgklcc/123.htm, will get 123
    var urlPath = window.location.pathname;
    let tempArray = urlPath.split('/');
    let tempUrl = tempArray[tempArray.length - 1];

    let periodIndex = tempUrl.indexOf(".");
    let agentCode = tempUrl.substring(0, periodIndex)
    console.log(agentCode);
    

    React.useEffect(() => {
        const agentInfo = async () => {
          let data = {
            linkHtm: agentCode,
          };
    
          await Axios.post(`${linkUsed()}/linkHTM`, data)
            .then((res) => {

              setAgentName(res.data.full_name);
              setAgentEmail(res.data.email);
              setAgentPhone(res.data.phone);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        return agentInfo();
      }, [agentCode]);


    return (
        <Stack w="100vw" h="100vh" overflowY="hidden" align="center">
            <Stack w="500px" h="100%">
            <Box mt="20%" bgColor="white" align="center">
                <Text fontWeight="bold" fontSize="2xl">Contact Us</Text>
                <Text>Please contact your agent via WhatsApp or email for any inquires!</Text>
            </Box>
            <HStack align="center" paddingTop={5} paddingLeft="2%">
                <Image w="65px" h="65px" src={agentIcon}/>
                <VStack align="left" spacing={0}>
                <Text fontWeight="bold" fontSize="xl">{agentName}</Text>
                <Text fontSize="m">{agentEmail}</Text>
                </VStack>
                <HStack paddingLeft="45%" cursor="pointer">
                <ReactWhatsapp number={agentPhone} message="Please lead me to complete my booking." >
                <Image src={whatsapp} w="35px" h="35px" />
                </ReactWhatsapp>
                </HStack>
            </HStack>
            </Stack>
        </Stack>
    );
}
