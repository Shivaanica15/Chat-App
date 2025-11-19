import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/theme';
import Typo from '@/components/Typo';
import { useLocalSearchParams } from 'expo-router';

const Conversation = () => {

    const data = useLocalSearchParams();

    console.log("got conversation data: ", data);
    return (
        <ScreenWrapper>
            <Typo color={colors.white}>Conversation</Typo>
        </ScreenWrapper>
    )
}

export default Conversation

const styles = StyleSheet.create({})