import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from "@/components/Header";
import BackButton from '@/components/BackButton';
import Avatar from '@/components/Avatar';
import * as ImagePicker from "expo-image-picker";
import Input from '@/components/Input';
import Typo from '@/components/Typo';
import { useAuth } from '@/contexts/authContext';
import Button from '@/components/Button';
import { verticalScale } from '@/utils/styling';

const newConversationModel = () =>{

    const {isGroup} = useLocalSearchParams();
    const isGroupMode = isGroup =="1";
    const router = useRouter();
    const [groupAvatar, setGroupAvatar] = useState<{uri: string} | null> (null);
    const [groupName, setGroupName] = useState("");
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

    const {user: currentUser} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const onPickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                aspect: [4, 3],
                quality: 0.5,
            });
    
            // console.log(result);
    
            if (!result.canceled) {
                setGroupAvatar(result.assets[0]);
            }
        }; // ← FIXED BRACKET

        const toggleParticipant = (user: any)=>{
            setSelectedParticipants((prev:any)=>{
                if(prev.includes(user.id)){
                    return prev.filter((id: string)=> id != user.id);
                }

                return [...prev, user.id];
            })
        }

        const onSelectUser = (user:any)=>{
            if(!currentUser){
                Alert.alert("Authentication", "Please login to start a conversation");
                return;
            }

            if(isGroupMode){
                toggleParticipant(user);
            }else{
                // todo: start new conversation
            }
        }

        const createGroup = async()=>{

            if(!groupName.trim() || !currentUser || selectedParticipants.length<2) return;

            // todo: create group

        }

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
        <ScreenWrapper isModal={true}>
            <View style={styles.container}>
                <Header
                    title={isGroupMode ? "New Group" : "Select User"}
                    leftIcon={<BackButton color={colors.black} />}
                />

                {

                    isGroupMode && (
                        <View style={styles.groupInfoContainer}>
                            <View style={styles.avatarContainer}>
                                <TouchableOpacity onPress={onPickImage}>
                                    <Avatar
                                    uri={groupAvatar?.uri || null} size={100}
                                    isGroup={true}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.groupNameContainer}>
                                <Input
                                    placeholder="Group Name"
                                    value={groupName}
                                    onChangeText={setGroupName}
                                    />
                            </View>

                        </View>
                    )}

                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contactList}>
                    {
                        contacts.map((user:any, index)=>{

                            const isSelected = selectedParticipants.includes(user.id);

                            return(
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.contactRow, isSelected && styles.selectedContact]}
                                    onPress={()=> onSelectUser(user)}>
                                        <Avatar size={45} uri={user.avatar} />
                                        <Typo fontWeight={"500"}>{user.name}</Typo>

                                        {
                                            isGroupMode && (
                                                <View style={styles.selectionIndicator}>
                                                    <View style={[styles.checkbox, isSelected && styles.checked]}/>
                                                </View>
                                            )
                                        }
                                    </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                {
                    isGroupMode && selectedParticipants.length>=2 &&(
                        <View style={styles.createGroupButton}>
                            <Button
                            onPress={createGroup}
                            disabled={!groupName.trim()}
                            loading={isLoading}>
                                <Typo fontWeight={"bold"} size={17}>
                                    Create Group
                                </Typo>
                            </Button>
                        </View>
                    )
                }

            </View>

        </ScreenWrapper>

    )
}

export default newConversationModel

const styles = StyleSheet.create({
    container:{
        marginHorizontal: spacingX._15,
        flex: 1,
    },
    groupInfoContainer:{
        alignItems:"center",
        marginTop: spacingY._10,
    },
    avatarContainer:{
        marginBottom: spacingX._10,
    },
    groupNameContainer:{
        width:"100%",
    },
    contactRow:{
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._10,
        paddingVertical: spacingY._5,
    },
    selectedContact:{
        backgroundColor: colors.neutral100,
        borderRadius: radius._15,
    },
    contactList:{
        gap: spacingY._12,
        marginTop: spacingY._10,
        paddingTop: spacingY._10,
        paddingBottom: verticalScale(150),
    },
    selectionIndicator:{
        marginLeft:"auto",
        marginRight:spacingX._10,
    },
    checkbox:{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    checked:{
        backgroundColor: colors.primary,
    },
    createGroupButton:{
        position: "absolute",
        bottom: 0,
        left: 0,
        right:0, 
        padding: spacingX._15,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.neutral200,
    },
});