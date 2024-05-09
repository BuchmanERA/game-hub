import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    QueryCommand,
    AttributeValue,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import bcrypt from "bcryptjs";

export interface User {
    userId: string;
    username: string;
    password: string;
}

const REGION = "us-east-1";
const dbClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: "AKIASZNBCOKICIY3RMMT",
        secretAccessKey: "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",
    },
});
const TABLE_NAME = "gamehub-user-data";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    async function registerUser(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const params = {
            TableName: TABLE_NAME,
            Item: {
                userId: { S: uuidv4() },
                username: { S: username },
                password: { S: hashedPassword },
            },
        };

        try {
            const data = await dbClient.send(new PutItemCommand(params));
            console.log("User registered successfully:", data);
        } catch (err) {
            console.error("Error registering user:", err);
        }
    }

    async function getUserIdFromUsername(username: string) {
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": { S: username },
            },
        };

        const data = await dbClient.send(new ScanCommand(params));
        if (data.Items && data.Items.length > 0) {
            return data.Items[0].userId.S;
        } else {
            throw new Error("User not found");
        }
    }

    async function authenticateUser(username: string, password: string) {
        const userId = await getUserIdFromUsername(username);

        const params = {
            TableName: TABLE_NAME,
            Key: {
                userId: { S: userId } as AttributeValue,
            },
        };

        try {
            const data = await dbClient.send(new GetItemCommand(params));

            if (data.Item) {
                const hashedPassword = data.Item.password.S;
                if (!hashedPassword) {
                    throw new Error("Hashed password not found");
                }
                const passwordMatches = await bcrypt.compare(password, hashedPassword);
                if (!passwordMatches) {
                    throw new Error("Invalid password");
                }
                const userId = data.Item.userId.S;
                const username = data.Item.username.S;
                const storedPassword = data.Item.password.S;
                if (!userId || !username || !storedPassword) {
                    throw new Error("User data not found");
                }
                setUser({
                    userId,
                    username,
                    password: storedPassword,
                });
            } else {
                throw new Error("User not found");
            }
        } catch (err) {
            console.error("Error authenticating user:", err);
            throw err;
        }
    }

    return {
        user,
        userName: user?.username || "", // Provide userName from user object
        registerUser,
        authenticateUser,
    };
}
