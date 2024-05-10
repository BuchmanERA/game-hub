import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};


const LoginForm: React.FC<Props> = ({ isOpen, onClose }) => {
    const { authenticateUser, setUser } = useAuth(); // Add setUser here
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const handleLogin = async () => {
        try {
            const authenticatedUser = await authenticateUser(username, password);
            if (authenticatedUser) {
                setUser(authenticatedUser);
                localStorage.setItem("username", username);
                navigate("/main");
            } else {
                setFailureMessage(
                    "Authentication failed. Please check your username and password.",
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                setFailureMessage("Error authenticating user: " + error.message);
            } else {
                setFailureMessage(
                    "An unknown error occurred while authenticating user.",
                );
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    {failureMessage && <p>{failureMessage}</p>}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                        Login
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoginForm;