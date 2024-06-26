import { Button, HStack, Image, Text } from "@chakra-ui/react";
import Logo from "../assets/Logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
  username: string;
}
const NavBar = ({ onSearch, username }: Props) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("username");
    navigate("/"); // navigate to landing page
  };

  return (
    <HStack padding="10px">
      <Image src={Logo} width={24} />
      <Text>{username && `Welcome, ${username}`}</Text>
      <Button
        marginRight={3}
        colorScheme="blue"
        variant="outline"
        onClick={handleLogOut}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        Logout
      </Button>
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
