import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import { HeaderProps} from '@/types'

const Header = ({title = "", leftIcon, rightIcon, style}: HeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            <Text>Header</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title:{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        zIndex:10,
    },
    leftIcon:{
        alignSelf: "flex-start",
        zIndex: 20,
    },
    rightIcon:{
        alignSelf:"flex-end",
        zIndex: 30,
    }
})