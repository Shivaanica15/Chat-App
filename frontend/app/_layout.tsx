import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";
import { AuthProvider } from '@/contexts/authContext';

const StackLayout = () => {
    return <Stack screenOptions={{headerShown: false}}/>;
}

const Rootlayout = () => {
    return (
        <AuthProvider>
            <StackLayout/>
        </AuthProvider>
    )
}

export default Rootlayout;

const styles = StyleSheet.create({});

