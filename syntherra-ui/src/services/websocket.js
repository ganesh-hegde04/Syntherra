import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWorldSocket = (
    onWorldUpdate,
    onEventUpdate
) => {

    stompClient = new Client({

        brokerURL:
            `${import.meta.env.VITE_API_URL.replace(/^http/, "ws")}/ws`,

        reconnectDelay: 5000,

        onConnect: () => {

            

            stompClient.subscribe(
                "/topic/world",
                (message) => {

                    onWorldUpdate(
                        JSON.parse(
                            message.body
                        )
                    );
                }
            );

            stompClient.subscribe(
                "/topic/events",
                (message) => {

                    onEventUpdate(
                        JSON.parse(
                            message.body
                        )
                    );
                }
            );
        }
    });

    stompClient.activate();
};

export const disconnectWorldSocket =
    () => {

        if (stompClient) {

            stompClient.deactivate();
        }
    };