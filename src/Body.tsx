import {
  Textarea,
  Flex,
  FormLabel,
  FormControl,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Body() {
  const [css, setCSS] = useState("");
  const [propifiedCSS, setPropifiedCSS] = useState<any>([]);
  const toast = useToast();
  const propifyCSS = () => {
    const cssArray = css.split(";");
    let tempCSS = cssArray;
    let finalStr = "";
    cssArray.forEach((item, i) => {
      const parsed = item.replaceAll("\n", "");
      const parsedArr = parsed.split("-");
      for (var n = 1; n < parsedArr.length; n++) {
        parsedArr[n] =
          parsedArr[n].charAt(0).toUpperCase() + parsedArr[n].slice(1);
      }
      finalStr = parsedArr.join("");
      console.log(finalStr);
      if (finalStr.includes(":")) {
        finalStr = finalStr.replace(/:\s*/g, '="');
        finalStr = finalStr + '"';
        finalStr = finalStr.replace(/\s+/g, "");
      }

      tempCSS[i] = finalStr;
    });
    setPropifiedCSS(tempCSS);
  };

  const copyPropifiedCSS = () => {
    const copyText = document.getElementById(
      "propifiedCSS"
    ) as HTMLInputElement;
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1000,
      position: "top",
    });
  };

  console.log(propifiedCSS);

  useEffect(() => {
    propifyCSS();
  }, [css]);

  return (
    <Flex height="100vh" width="100vw" bgColor="gray.700" direction="column">
      <Flex width="100%" justifyContent="center" color="white">
        <Text fontSize="2rem" fontWeight="bold">
          Propify your CSS!
        </Text>
      </Flex>
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        color="white"
        width="100%"
        gap="10px"
      >
        <FormControl width="28em">
          <FormLabel
            display="flex"
            alignItems="center"
            height="40px"
            htmlFor="email"
          >
            CSS
          </FormLabel>
          <Textarea
            onChange={(e) => setCSS(e.target.value)}
            width="28em"
            height="28em"
          />
        </FormControl>
        <FormControl width="28em">
          <FormLabel
            htmlFor="email"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Propified CSS{" "}
            <Button
              colorScheme="green"
              onClick={copyPropifiedCSS}
              color="black"
            >
              Copy
            </Button>
          </FormLabel>
          <Textarea
            id="propifiedCSS"
            value={propifiedCSS.join("\r\n")}
            width="28em"
            height="28em"
          />
        </FormControl>
      </Flex>
    </Flex>
  );
}
