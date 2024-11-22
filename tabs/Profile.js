import React from "react";
import Card from "../styling/Card";
import * as T from '../styling/fonts';
import {ActionLink, Button, Row, SmlButton} from '../styling/Components';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation(); 

    return(
        <View>
            <Card>
                <T.heroSmall>Manage Account</T.heroSmall>
                <ActionLink onPress={() => navigation.navigate('New Announcement')}>New Annoucement</ActionLink>   
            </Card>
            <Card>
                <T.heroSmall>Manage Your Annoucements</T.heroSmall>
                <ActionLink onPress={() => navigation.navigate('New Announcement')}>New Annoucement</ActionLink>
            </Card>
        </View>
    )
        
}