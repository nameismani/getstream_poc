"use client";
import {
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    User,
    StreamTheme,
    ParticipantView,
    SpeakerLayout,
    CallControls,
    StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import "../../styling/SpeakerLayout-layout.scss"

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useState } from "react";
import StreamChatMainContainer from "@/components/chat/StreamChatMainContainer";

const apiKey = "mmhfdzb5evj2";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1BhZG1fX0FtaWRhbGEiLCJ1c2VyX2lkIjoiUGFkbV9fQW1pZGFsYSIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzUzNTEzOTM5LCJleHAiOjE3NTQxMTg3Mzl9.vKQ7X0pOwpewdP6Jw-NjviDgDl19Yem0VlGrpWkqQQU";
const userId = "Padm__Amidala";
const callId = "uRt5tZ31mqOa";

// set up the user object
const user: User = {
    id: userId,
    name: "Oliver",
    image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
await call.join({ create: true });

export default function App() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <MyUILayout />
            </StreamCall>
        </StreamVideo>
    );
}

export const MyUILayout = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
    const [isChatOpen, setIsChatOpen] = useState(false)

    if (callingState !== CallingState.JOINED) {
        return <div>Loading...</div>;
    }

    return (
        <StreamTheme>
            <div className="bg-[#101213] p-3">
                Stream video calling
            </div>
            <div className="max-h-[calc(100vh-124px)] min-h-[calc(100vh-124px)] flex relative gap-5 p-3">
                <div className='flex w-full'>
                    <div className="flex-1 flex items-center justify-center">
                        <SpeakerLayout participantsBarPosition="bottom" />
                    </div>
                    <div
                        className={`
                        transition-all duration-500 
                        ${isChatOpen ? "w-[350px] opacity-100" : "w-0 opacity-0"} 
                        overflow-hidden
                    `}
                    >
                        {isChatOpen && <div className='py-4 px-6 h-full bg-[#101213] rounded-l-3xl '><StreamChatMainContainer setIsChatOpen={setIsChatOpen} /></div>}
                    </div>
                </div>
            </div>

            <div className="flex bg-[#101213] p-1 items-center">
                <div className="flex-1">
                    <CallControls />
                </div>
                {/* Toggle Button */}

                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className='px-4 py-0.5 bg-blue-500 text-white rounded h-fit'
                >
                    {isChatOpen ? "Close Chat" : "Open Chat"}
                </button>

            </div>

        </StreamTheme>
    );
};

// export const MyUILayout = () => {
//   const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
//     useCallStateHooks();

//   const callingState = useCallCallingState();
//   const localParticipant = useLocalParticipant();
//   const remoteParticipants = useRemoteParticipants();

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <MyParticipantList participants={remoteParticipants} />
//       <MyFloatingLocalParticipant participant={localParticipant} />
//     </StreamTheme>
//   );
// };

const MyParticipantList = (props: {
    participants: StreamVideoParticipant[];
}) => {
    const { participants } = props;
    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            {participants.map((participant) => (
                <ParticipantView
                    participant={participant}
                    key={participant.sessionId}
                />
            ))}
        </div>
    );
};
export const MyFloatingLocalParticipant = (props: {
    participant?: StreamVideoParticipant;
}) => {
    const { participant } = props;
    if (!participant) {
        return <p>Error: No local participant</p>;
    }

    return (
        <div
            style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                width: "240px",
                height: "135px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
                borderRadius: "12px",
            }}
        >
            <ParticipantView participant={participant} />
        </div>
    );
};