import React from 'react'
import {
    FaWindows,
    FaPlaystation,
    FaXbox,
    FaApple,
    FaLinux,
    FaAndroid
} from 'react-icons/fa'
import { MdPhoneIphone } from 'react-icons/md';
import { SiNintendo } from 'react-icons/si';
import { BsGlobe } from 'react-icons/bs'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { IconType } from "react-icons";
import { Platform } from '../hooks/useGame'


interface Props {
    platforms: Platform[]
}

const PlatformIconList = ({ platforms = [] }: Props) => {
  const iconMap: { [key: string]: IconType } = { 
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux, 
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe
  }
    return (
        <HStack marginY={2}>
            {platforms.map((platforms) => (
                <Icon key={platforms.id} as={iconMap[platforms.slug]} color='gray.500' />
            ))}

        </HStack>
    )
}

export default PlatformIconList