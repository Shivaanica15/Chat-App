import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, spacingY } from '@/constants/theme';
import Typo from '@/components/Typo';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
import Avatar from '@/components/Avatar';
import { verticalScale } from '@/utils/styling';

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
        <ScreenWrapper>
            <Typo color={colors.white}>Conversation</Typo>
        </ScreenWrapper>
    )
}

export default Conversation

const styles = StyleSheet.create({
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
