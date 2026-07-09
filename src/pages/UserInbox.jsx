import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import socketIO from "socket.io-client";
import { server } from '../server';
import Header from '../components/Layouts/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import styles from '../styles/styles';
import { format } from 'timeago.js';


const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT || "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
    const { user, loading } = useSelector((state) => state.user);
    const { id } = useParams();
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userData, setUserData] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [images, setImages] = useState();
    const [activeStatus, setActiveStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        socketId.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                images: data.images,
                createdAt: Date.now(),
            })
        });

        return () => socketId.off("getMessage");
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        const getConversation = async () => {
            if (!user?._id) return;

            try {
                const response = await axios.get(
                    `${server}/conversation/get-user-conversation/${user._id}`,
                    { withCredentials: true }
                );
                const userConversations = response.data.conversations || [];
                setConversations(userConversations);

                if (id) {
                    const selectedConversation = userConversations.find((item) => item._id === id);
                    if (selectedConversation) {
                        setCurrentChat(selectedConversation);
                        setOpen(true);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getConversation();
    }, [user?._id, id])


    useEffect(() => {
        if (user) {
            const sellerId = user._id;
            socketId.emit("addUser", sellerId);
            socketId.on("getUser", (users) => {
                setOnlineUsers(users);
            });
        }
        return () => socketId.off("getUser");
    }, [user])


    const onlineCheck = (chat) => {
        const chatMember = chat?.members?.find((member) => member !== user?._id);
        const online = onlineUsers?.find((user) => user.userId === chatMember);

        return online ? true : false;
    }

    //get messages

    useEffect(() => {
        const getMessage = async () => {
            if (!currentChat?._id) return;

            try {
                const response = await axios.get(
                    `${server}/message/get-all-messages/${currentChat?._id}`
                );
                setMessages(response.data.messages);
            } catch (error) {
                console.log(error);
            }
        };
        getMessage();
    }, [currentChat]);

    const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
            lastMessage: newMessage,
            lastMessageId: user._id,
        });
        await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
            lastMessage: newMessage,
            lastMessageId: user._id,
        }, { withCredentials: true })
            .then((res) => {
                setNewMessage("");
            })
            .catch((error) => {
                console.log(error)
            })

    }


    //creating a new message
    const sendMessageHandler = async (e) => {
        e.preventDefault();
        const message = {
            sender: user?._id,
            text: newMessage,
            conversationId: currentChat._id,
        }
        const receiverId = currentChat.members.find((member) => member !== user?._id);
        socketId.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            text: newMessage,
        })

        try {
            if (newMessage !== "") {
                await axios
                    .post(`${server}/message/create-new-message`, message, { withCredentials: true })
                    .then((res) => {
                        setMessages([...messages, res.data.message]);
                        updateLastMessage();
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleImageUpload = async (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImages(reader.result);
                imageSendingHandler(reader.result);
            }
        }

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const imageSendingHandler = async (e) => {
        const receiverId = currentChat.members.find((member) => member !== user?._id);
        socketId.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            images,
        })
        try {
            await axios.post(`${server}/message/create-new-message`, {
                sender: user?._id,
                images: e,
                text: newMessage,
                conversationId: currentChat._id,
            }, { withCredentials: true })
                .then((res) => {
                    setImages();
                    setMessages([...messages, res.data.message]);
                    updateLastMessageForImage();
                })
        } catch (error) {
            console.log(error);
        }
    }

    const updateLastMessageForImage = async () => {
        await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
            lastMessage: "Photo",
            lastMessageId: user._id,
        }, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (

        <div className='w-full'>
            {
                !open && (
                    <>
                        <Header activeHeading={1} />
                        <h1 className="text-center text-[30px] py-3 font-Poppins">
                            All Messages
                        </h1>
                        {
                            conversations &&
                            conversations.map((item, index) => (
                                <MessageList
                                    data={item}
                                    key={index}
                                    index={index}
                                    setOpen={setOpen}
                                    setCurrentChat={setCurrentChat}
                                    me={user?._id}
                                    setUserData={setUserData}
                                    userData={userData}
                                    online={onlineCheck(item)}
                                    setActiveStatus={setActiveStatus}
                                    loading={loading}
                                />
                            ))
                        }

                    </>
                )
            }

            {
                open && (
                    <SellerInbox
                        setOpen={setOpen}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        sendMessageHandler={sendMessageHandler}
                        messages={messages}
                        sellerId={user._id}
                        userData={userData}
                        activeStatus={activeStatus}
                        scrollRef={scrollRef}
                        handleImageUpload={handleImageUpload}
                        imageSendingHandler={imageSendingHandler}
                    />
                )
            }

        </div>
    )
}

export default UserInbox

const MessageList = ({
    data,
    index,
    setOpen,
    setCurrentChat,
    me,
    setUserData,
    userData,
    online,
    setActiveStatus,
    loading
}) => {
    const [active, setActive] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const handleClick = async () => {
        navigate(`/inbox/${data._id}`);
        setOpen(true);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
    }

    useEffect(() => {
        setActiveStatus(online);
        const userId = data.members.find((user) => user !== me);
        const getUser = async () => {
            try {
                const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
                setUser(res.data.shop);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }
        getUser();
    }, [data, me, online, setActiveStatus])

    return (
        <div className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"
            }  cursor-pointer`} onClick={() => {
                setActive(index);
                handleClick();
            }} >
            <div className="relative">
                <img src={`${user?.avatar?.url}`} className="w-[50px] h-[50px] rounded-full" />
                {
                    online ? (
                        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
                    ) : (
                        <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
                    )
                }
            </div>
            <div className="pl-3">
                <h1 className="text-[18px]">{user?.name}</h1>
                <p className="text-[16px] text-[#000c]">
                    {!loading && data?.lastMessageId !== userData?._id
                        ? "You:"
                        : userData?.name.split(" ")[0] + ": "}{" "}
                    {data?.lastMessage}
                </p>
            </div>



        </div>
    )
};


const SellerInbox = ({
    setOpen,
    newMessage,
    setNewMessage,
    sendMessageHandler,
    messages,
    sellerId,
    userData,
    activeStatus,
    scrollRef,
    handleImageUpload,
    imageSendingHandler,
}) => {
    return (
    <div className="w-[full] min-h-full flex flex-col justify-between p-5">
        {/* message Header */}
        <div className="w-full flex p-3 items-center justify-between bg-slate-200">
            <div className="flex">
                <img src={`${userData?.avatar?.url}`}
                    alt=""
                    className="w-[60px] h-[60px] rounded-full" />

                <div className="pl-3">
                    <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
                    <h1>{activeStatus ? "Active Now" : ""}</h1>
                </div>
            </div>
            <AiOutlineArrowRight size={20}
                className="cursor-pointer"
                onClick={() => setOpen(false)} />
        </div>

        {/* messages */}

        <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
            {messages && messages.map((item, index) => (
                <div className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"
                    }`} ref={scrollRef} key={index}>
                    {item.sender !== sellerId && (
                        <img
                            src={`${userData?.avatar?.url}`}
                            className="w-[40px] h-[40px] rounded-full mr-3"
                            alt=""
                        />
                    )}
                    {item.images && (
                        <img
                            src={`${item.images?.url}`}
                            className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                        />
                    )}
                    {item.text !== "" && (
                        <div>
                            <div
                                className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                                    } text-[#fff] h-min`}
                            >
                                <p>{item.text}</p>
                            </div>

                            <p className="text-[12px] text-[#000000d3] pt-1">
                                {format(item.createdAt)}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* send message input */}
        <form aria-required={true}
            className="p-3 relative w-full flex justify-between items-center"
            onSubmit={sendMessageHandler}>
            <div className="w-[30px]">
                <input
                    type="file"
                    name=""
                    id="image"
                    className="hidden"
                    onChange={handleImageUpload}
                />
                <label htmlFor="image">
                    <TfiGallery className="cursor-pointer" size={20} />
                </label>

            </div>
            <div className="w-full">
                <input type="text" required
                    placeholder="Enter your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={`${styles.input}`} />
                <input type="submit" value="Send" className="hidden" id="send" />
                <label htmlFor="send">
                    <AiOutlineSend
                        size={20}
                        className="absolute right-4 top-5 cursor-pointer"
                    />
                </label>
            </div>
        </form>



    </div>
    );

}

