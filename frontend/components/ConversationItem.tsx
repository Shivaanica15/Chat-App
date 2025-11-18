import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { spacingX, spacingY } from '@/constants/theme'

const ConversationItem = () =>{
    return (
        <View>
            <Text> ConversationItems </Text>
        </View>
    )
}

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