import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import Typo from '@/components/Typo';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
import Avatar from '@/components/Avatar';
import { scale, verticalScale } from '@/utils/styling';

const Conversation = () => {

    const {user: currentUser} = useAuth();

    const {
        id: conversationId,
        name,
        participants: stringifiedParticipants,
        avatar,
        type
    } = useLocalSearchParams();

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
            <Typo color={colors.white}>Conversation</Typo>
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

})
