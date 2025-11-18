import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

const newConversationModel = () =>{

    const {isGroup} = useLocalSearchParams();
    const isGroupMode = isGroup =="1";
    const router = useRouter();

    const contacts =[
        {
            id: "1",
            name: "Liam Carter",
            avatar: "https://i.pravatar.cc/150?img=11",
        },
        {
            id: "2",
            name: "Emma Davis",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        {
            id: "3",
            name: "Noah Wilson",
            avatar: "https://i.pravatar.cc/150?img=13",
        },
        {
            id: "4",
            name: "Betta",
            avatar: "https://i.pravatar.cc/150?img=14",
        },
        {
            id: "5",
            name: "Gamma",
            avatar: "https://i.pravatar.cc/150?img=15",
        },
        {
            id: "6",
            name: "Hema",
            avatar: "https://i.pravatar.cc/150?img=16",
        },
        {
            id: "7",
            name: "Isa",
            avatar: "https://i.pravatar.cc/150?img=17",
        },
        {
            id: "8",
            name: "Rani",
            avatar: "https://i.pravatar.cc/150?img=18",
        },
        {
            id: "9",
            name: "Raja",
            avatar: "https://i.pravatar.cc/150?img=19",
        },
        {
            id: "10",
            name: "Kamala",
            avatar: "https://i.pravatar.cc/150?img=20",
        },
        
    ]

    return(
        <View>
            <Text>newConversationModel</Text>
        </View>
    )
}

export default newConversationModel

const styles = StyleSheet.create({})