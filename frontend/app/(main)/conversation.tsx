import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import Typo from '@/components/Typo';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
import Avatar from '@/components/Avatar';
import { scale, verticalScale } from '@/utils/styling';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import * as Icons from "phosphor-react-native";
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import MessageItem from '@/components/MessageItem';
import Input from '@/components/Input';
import * as ImagePicker from "expo-image-picker"
import Loading from '@/components/Loading';
import { uploadFileToCloudinary } from '@/services/imageService';

const Conversation = () => {

    const {user: currentUser} = useAuth();

    const {
        id: conversationId,
        name,
        participants: stringifiedParticipants,
        avatar,
        type
    } = useLocalSearchParams();

    const [message, setMessage] = useState('');

    const [selectedFile, setSelectedFile] = useState<{ uri:string } | null>(null);

    const [loading, setLoading] = useState(false);

    const dummyMessages = [
      {
        id: "msg_1",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "Hey! How's your day going?",
        createdAt: "10:20 AM",
        isMe: false,
      },
      {
        id: "msg_2",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "Pretty good! Just started working on the chat feature.",
        createdAt: "10:22 AM",
        isMe: true,
      },
      {
        id: "msg_3",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "Nice! How’s the progress so far?",
        createdAt: "10:23 AM",
        isMe: false,
      },
      {
        id: "msg_4",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "It's coming together. UI part mostly done.",
        createdAt: "10:25 AM",
        isMe: true,
      },
      {
        id: "msg_5",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "Awesome! Let me know when I can test it.",
        createdAt: "10:26 AM",
        isMe: false,
      },
      {
        id: "msg_6",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "Sure! I’ll push an update soon.",
        createdAt: "10:27 AM",
        isMe: true,
      },
      {
        id: "msg_7",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "By the way, are you adding typing indicators?",
        createdAt: "10:28 AM",
        isMe: false,
      },
      {
        id: "msg_8",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "Yep! That’s on the list.",
        createdAt: "10:29 AM",
        isMe: true,
      },
      {
        id: "msg_9",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "Perfect. It’ll make the chat feel more real.",
        createdAt: "10:30 AM",
        isMe: false,
      },
      {
        id: "msg_10",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "Exactly! Trying to make it smooth.",
        createdAt: "10:31 AM",
        isMe: true,
      },
      {
        id: "msg_11",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "Have you tested on both Android and iOS?",
        createdAt: "10:32 AM",
        isMe: false,
      },
      {
        id: "msg_12",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "Only Android so far. iOS later today.",
        createdAt: "10:33 AM",
        isMe: true,
      },
      {
        id: "msg_13",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "Cool! Let me know if you need help testing.",
        createdAt: "10:34 AM",
        isMe: false,
      },
      {
        id: "msg_14",
        sender: { id: "User_1", name: "John Doe", avatar: null },
        content: "Will do! Really appreciate it.",
        createdAt: "10:35 AM",
        isMe: true,
      },
      {
        id: "msg_15",
        sender: { id: "User_2", name: "Jane Smith", avatar: null },
        content: "No problem! Excited to see the final result.",
        createdAt: "10:36 AM",
        isMe: false,
      },
    ];

    const onPickFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setSelectedFile(result.assets[0]);
        }
    };

    const onSend = async () =>{
        if(!message.trim() && !selectedFile) return;

        if(!currentUser) return;

        setLoading(true);

        try{

            let attachment = null;
            if(selectedFile){
                const uploadResult = await uploadFileToCloudinary(
                    selectedFile.uri,
                    "message-attachments"
                );

                if(uploadResult.success){
                    attachment=uploadResult.data;
                }else{
                    setLoading(false);
                    Alert.alert("Error", "Could not send the image! ");
                }
            }

            console.log("attachment: ", attachment);

        }catch(error){
            console.log("Error sending message:  ", error);
            Alert.alert("Error", "Failed to send message");
        }finally{
            setLoading(false);
        }
    }

    const participants = stringifiedParticipants
        ? JSON.parse(stringifiedParticipants as string)
        : [];

    let conversationAvatar = avatar;

    let isDirect = type == 'direct';
    const otherParticipant = isDirect ? participants.find((p:any)=>p.id != currentUser?.id) : null;

    if (isDirect && otherParticipant)
        conversationAvatar = otherParticipant.avatar;

    let conversationName = isDirect && otherParticipant ? otherParticipant.name : name;

    return (
        <ScreenWrapper showPattern={true} bgOpacity={0.5}>
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}>

                {/* header */}
                <Header
                style={styles.header}
                leftIcon={
                    <View style={styles.hearderLeft}>
                        <BackButton />
                        <Avatar
                        size={40}
                        uri={conversationAvatar as string}
                        isGroup={type == "group"}
                        />
                        <Typo color={colors.white} fontWeight={"500"} size={22}>
                            {conversationName}
                        </Typo>
                    </View>
                }
                rightIcon={
                    <TouchableOpacity style={{ marginBottom: verticalScale(7)}}>
                        <Icons.DotsThreeOutlineVertical
                            weight="fill"
                            color={colors.white}
                        />
                    </TouchableOpacity>
                }
                />

                {/* messages */}
                <View style={styles.content}>
                    <FlatList
                    data={dummyMessages}
                    inverted={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messagesContent}
                    renderItem={({item})=>(
                        <MessageItem item={item} isDirect={isDirect} />
                    )}
                    keyExtractor={(item)=> item.id}
                    />

                    {/* footer */}
                    <View style={styles.footer}>
                        <Input
                            value={message}
                            onChangeText={setMessage}
                            containerStyle={{
                                paddingLeft: spacingX._10,
                                paddingRight: scale(65),
                                borderWidth: 0
                            }}
                            placeholder="Type message"
                            icon={
                                <TouchableOpacity style={styles.inputIcon} onPress={onPickFile}>
                                    <Icons.Plus
                                        color={colors.black}
                                        weight="bold"
                                        size={verticalScale(22)}
                                    />

                                    {selectedFile && selectedFile.uri && (
                                        <Image
                                            source={{ uri: selectedFile.uri }}
                                            style={styles.selectedFile}
                                        />
                                    )}
                                </TouchableOpacity>
                            }
                        />

                        <View style={styles.inputRightIcon}>
                            <TouchableOpacity style={styles.inputIcon} onPress={onSend}>
                                {
                                    loading ? (
                                        <Loading size="small" color={colors.black} />
                                    ):(
                                        <Icons.PaperPlaneTilt
                                    color={colors.black}
                                    weight="fill"
                                    size={verticalScale(22)}
                                    />
                                    )
                                }
                                
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default Conversation

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        paddingHorizontal: spacingX._15,
        paddingTop: spacingY._10,
        paddingBottom: spacingY._15
    },
    hearderLeft:{
        flexDirection: "row",
        alignItems:"center",
        gap: spacingX._12,
    },
    inputRightIcon:{
        position: "absolute",
        right: scale(10),
        top: verticalScale(15),
        paddingLeft:spacingX._12,
        borderLeftWidth: 1.5,
        borderLeftColor: colors.neutral300
    },
    selectedFile:{
        position: "absolute",
        height: verticalScale(38),
        width: verticalScale(38),
        borderRadius: radius.full,
        alignSelf: "center"
    },
    content:{
        flex:1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: "continuous",
        overflow: "hidden",
        paddingHorizontal: spacingX._15,
    },
    inputIcon:{
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        padding: 8,
    },
    footer:{
        paddingTop: spacingY._7,
        paddingBottom: verticalScale(22)
    },
    messagesContainer:{
        flex:1,
    },
    messagesContent:{
        paddingTop: spacingY._20,
        paddingBottom: spacingY._10,
        gap: spacingY._12,  
    },
    plusIcon:{
        backgroundColor:colors.primary,
        borderRadius: radius.full,
        padding: 8,
    },

});
