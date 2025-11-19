import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import Avatar from './Avatar'
import Typo from './Typo';
import moment from 'moment';
import { ConversationProps } from '@/types';

const ConversationItem = ({item, showDriver, router}: any) =>{

    
    

    const {user: currentUser} = useAuth();

    // console.log("conversation item: ", item);

    const getLastMessageContent = () => {
        if(!lastMessage) return " Say hi ⭐ ";

        return lastMessage?.attachment ? "Image" : lastMessage.content;
    }

    const lastMessage: ConversationProps = item.lastMessage;
    const isDirect =item.type =='direct';

    let avatar = item.avatar;
    const otherParticipant = isDirect? item.participants.find(p => p._id !=currentUser?.id):null;

    if(isDirect && otherParticipant) avatar = otherParticipant?.avatar;

    const getLastMessageData = () =>{
        if(!lastMessage.createdAt) return null;

        const messageDate = moment(lastMessage.createdAt);

        const today = moment();

        if(messageDate.isSame(today, "day")){
            return messageDate.format("h:mm A");
        }
        if(messageDate.isSame(today, "year")){
            return messageDate.format("MMM D");
        }
        
            return messageDate.format("MMM D, YYYY");
        
    };

    const openConversation = () =>{
        router.push({
            pathname: "/(main)/conversation",
            params: {
                id: item._id,
                name: item.name,
                avatar: item.avatar,
                type: item.type,
                participants: JSON.stringify(item.participants)
            }
        })
    };

    return (
        <View>
    <TouchableOpacity style={styles.ConversationItem}>
        <View>
            <Avatar uri={avatar} size={47} isGroup={item.type == "group"} />
        </View>

        <View style={{ flex: 1 }}>
            <Typo size={17} fontWeight={"600"}>
                {isDirect? otherParticipant?.name : item?.name}
            </Typo>

            {/* 👇 Swapped: last message preview now comes here */}
            <Typo
                size={15}
                color={colors.neutral600}
                textProps={{ numberOfLines: 1 }}
            >
                {getLastMessageContent()}
            </Typo>
        </View>

        {/* 👇 Swapped: date/time now at right side */}
        {item.lastMessage && (
            <Typo size={15}>{getLastMessageData()}</Typo>
        )}
    </TouchableOpacity>

        {showDriver && <View style={styles.divider}/>}

</View>

    );
};

export default ConversationItem

const styles = StyleSheet.create({
    ConversationItem:{
        gap: spacingX._10,
        marginVertical: spacingY._12,
        flexDirection: "row",
        alignItems: "center",
    },
    divider:{
        height: 1,
        width: "95%",
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.07)",
    },
});