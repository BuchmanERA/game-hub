import { HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import { useAuth } from '../hooks/useAuth';

 export interface Props {
  onSearch: (searchText: string) => void;
  userName: string;
}

const NavBar = ({ onSearch }: Props) => {
  const { user } = useAuth();
  return (
    <HStack padding='10px'>
      <Image src={logo} boxSize='60px' />
      {/* Display the welcome message with the user's name */}
      <Text>Welcome, {user?.username}</Text>
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
