import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, View, Text, Platform }  from "react-native";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const ProfileModal = () => {
    return (
        <ScreenWrapper isModal={true}>
            <View style={styles.container}>
                <Header
                    title={"Update Profile"}
                    leftIcon={
                        Platform.OS == "android" && <BackButton color={colors.black} />
                    }
                    style={{ marginVertical: spacingY._15}}
                    />

                    {/* form */}

                    <ScrollView contentContainerStyle={styles.form}>
                        <View style={styles.avatarContainer}>
                            <Avatar />
                        </View>
                    </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default ProfileModal;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacingY._20,
    },
    footer:{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral200,
        marginBottom: spacingY._10,
        borderTopWidth: 1,
    },
    form:{
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer:{
        position: "absolute",
        alignSelf: "center"
    },
    avatar:{
        alignSelf:"center",
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500,
    },
    editIcon:{
        position: "absolute",
        bottom: spacingY._5,
        right: spacingX._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: {width:0, height: 0},
        shadowOpacity: 0.25,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer:{
        gap: spacingY._7,
    },
});