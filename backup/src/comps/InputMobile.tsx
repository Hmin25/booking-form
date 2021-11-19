import {Box, Text,Input, InputGroup, InputLeftElement, Select, VStack, Stack} from '@chakra-ui/react'
import { AsYouType } from "libphonenumber-js";
import { getCountryTelCode, COUNTRIES } from "./countries";
import React,{useState, useEffect} from 'react'


interface inputProps {
    inputTitle: string
    setProp: any
    inputPlaceholder?: string;
    title: string;
}

export default function InputFormMobile({setProp}: inputProps) {
    const [number, setNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("MYS");
    const [countryCode, setCountryCode] = useState("+60");

    const countryOptions = COUNTRIES.map(({ name, iso }:any) => (
      {
        label: name,
        value: iso
      }
      ))

      const options = countryOptions.filter(({ label, value }:any) => {

        if (value !==  "MYS") {
          return({
              label,
              value
            })
        }
      })
  
      const onCountryChange = (e: { target: { value: any; }; }) => {
        let value = e.target.value;
        let code = getCountryTelCode(value);
        let parsedNumber = new AsYouType().input(`${code}${number}`);
        setCountryCode(code);
        setSelectedCountry(value);
        setProp(parsedNumber);
      };

      useEffect(() => {
        getCountryTelCode(selectedCountry)
        setCountryCode(getCountryTelCode(selectedCountry))
      }, [selectedCountry])

      const onPhoneNumberChange = (e: { target: { value: any; }; }) => {
        let value = e.target.value;
        let parsedNumber = new AsYouType().input(`${countryCode}${value}`);
        setNumber(value);
        setProp(parsedNumber);

      };

    return (
      <VStack pl="26%"  w={["100%", "100%", "65%", "75%"]}>
        <Stack d="flex" alignItems="center"   direction={['column', 'column', 'row', 'row']}>
            {/* <Text   w={["100%", "100%", "25vw", "25vw"]} fontWeight="semibold" textAlign="left" >{inputTitle}<span style={{color:"red"}}>*</span></Text> */}

            <InputGroup>
            <InputLeftElement ml="-1" w="3.5rem">
        <Select
          zIndex={1}
          value={selectedCountry}
          position="absolute"
          opacity="0"
          ml="10"
          mt="2"
          height="100%"
          onChange={onCountryChange}
        >
          <option key={0} value="MYS">Malaysia</option>
          {options.map((option: { value: string | number | readonly string[] | undefined; label: boolean  | null | undefined }, index:number) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </Select >
        <Stack cursor="pointer"d="flex" alignItems="center" >
          {selectedCountry ? (
            <Box >
              <Text fontSize="0.95rem" mt="2" textAlign="center" justifyContent="center" alignItems="center">{countryCode}</Text>
            </Box>
          ) : (
            <Text fontSize="0.95rem" mt="2">+60</Text>
          )}
        </Stack>
      </InputLeftElement>
      <Input
      pl="4rem"
        type="number"
        value={number}
        pattern="[0-9]"
        placeholder="eg. 12-345-6789"
        borderColor="black" h="2.6rem"
        w={["33vw", "33vw", "33vw", "33vw"]}
        onChange={onPhoneNumberChange}
        _hover={{borderColor:"#ff9d5c"}}
      />
    </InputGroup>
        </Stack>
        </VStack>
    )
}
