import { StyleSheet, Text, View, Image } from "react-native";
import React from 'react'
import { MessageProps } from "@/types";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Avatar from "./Avatar";
import Typo from "./Typo";
import moment from "moment";   // ✅ FIXED: missing import

const MessageItem = ({
    item, isDirect
}: {item: MessageProps, isDirect: boolean}) => {

    const {user: currentUser} = useAuth();
    const isMe = currentUser?.id == item?.sender?.id;

    const formattedDate = moment(item.createdAt).isSame(moment(), "day")?
    moment(item.createdAt).format("h:mm A"):
    moment(item.createdAt).format("MMM D, h:mm A");

    return (
        <View
            style={[
                styles.messageContainer,
                isMe ? styles.myMessage : styles.theirMessage,
            ]}
        >
            {!isMe && !isDirect && (
                <Avatar size={30} uri={item?.sender?.avatar} style={styles.theirMessage} />
            )}

            <View 
                style={[
                    styles.messageBubble,
                    isMe ? styles.myBubble : styles.theirMessage,
                ]}
            >

                {!isMe && !isDirect && (
                    <Typo color={colors.neutral900} fontWeight={"600"} size={13}>
                        {item.sender.name}
                    </Typo>
                )}

                {item.attachement && (  /* ✅ FIXED: correct property name */
                    <Image
                        source={{ uri: item.attachement }}  /* ✅ FIXED: correct RN format */
                        style={styles.attachment}
                    />
                )}

                {item.content && <Typo size={15}>{item.content}</Typo>}

                <Typo
                    style={{ alignSelf: "flex-end"}}
                    size={11}
                    fontWeight={"500"}
                    color={colors.neutral600}
                >
                    {formattedDate}
                </Typo>

            </View>
        </View>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    messageContainer:{
        flexDirection:"row",
        gap: spacingX._7,
        maxWidth: "80%",
    },
    myMessage:{
        alignSelf: "flex-end",
    },
    theirMessage:{
        alignSelf: "flex-start"
    },
    messageAvatar:{
        alignSelf: "flex-end",
    },
    attachment:{
        height: verticalScale(180),
        width: verticalScale(180),
        borderRadius: radius._10,
    },
    messageBubble:{
        padding: spacingX._10,
        borderRadius: radius._15,
        gap: spacingY._5,
    },
    myBubble:{
        backgroundColor: colors.myBubble,
    },
});
