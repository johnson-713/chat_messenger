"use client";
import { useEffect, useState } from "react";
import type { Channel as StreamChannel } from "stream-chat";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

// your Stream app information
const apiKey = "jxedwwgcdk2a";
const userId = "johnson1";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9obnNvbjEifQ.k01Lw7lhxjC4l8aSvGU5_4gtDMQR5ddbPsGbeEH-7so";

export default function Home() {
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: { id: userId },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", "custom_channel_id", {
      image: "https://getstream.io/random_png/?name=react",
      name: "Talk about React",
      members: [userId],
    });

    channel
      .watch()
      .then(() => {
        setChannel(channel);
      })
      .catch((err) => {
        console.error("Error watching channel:", err);
      });
  }, [client]);

  console.log("channel", channel?.state?.messageSets?.[0]?.messages);

  if (!client) return <div>Setting up client & connection...</div>;
  return (
    <div className="">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput audioRecordingEnabled />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
