import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/theme';
import Typo from '@/components/Typo';

const Conversation = () => {
    return (
        <ScreenWrapper>
            <Typo color={colors.white}>Conversation</Typo>
        </ScreenWrapper>
    )
}

export default Conversation

const styles = StyleSheet.create({})