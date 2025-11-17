import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { useAuth } from '@/contexts/authContext';
import Button from '@/components/Button';
import { testSocket } from '@/socket/socketEvents';

const Home = () => {

    const { user, signOut } = useAuth();
    // console.log("user: ", user);

    // useEffect(() => {
    //     testSocket(testSocketCallbackHandler);
    //     testSocket(null);

    //     return ()=>{
    //         testSocket(testSocketCallbackHandler, true);
    //     }
    // }, []);

    // const testSocketCallbackHandler = (data:any) =>{
    //     console.log("got response from testSocket event: ", data)
    // }

    // const handleLogout = async () => {
    //     await signOut();
    // }

    return (
        <ScreenWrapper>
            <Typo>Home</Typo>

            <Button onPress={handleLogout}>
                <Typo>Logout</Typo>
            </Button>
        </ScreenWrapper>
    );
}

export default Home;

const styles = StyleSheet.create({})
