import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';
import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {

const navigation = useNavigation();

useEffect(()=>{
    setTimeout(()=> navigation.navigate('Home'),2500)
})



    return (
        <View style={tw`flex-1 justify-center items-center space-y-10 bg-amber-500`}>
            {/* logo image with rings */}
            <View style={tw`bg-white/20 rounded-full p-8 `}>
                <View style={tw`bg-white/20 rounded-full p-4`}>
                    <Image source={require('../image/welcome.png')}
                        style={{ width: hp(30), height: hp(30),borderRadius:100 }}
                    />
                </View>
            </View>

{/* title and punch line */}
<View style={tw`flex items-center mt-8`}>
    <Text style={tw`font-bold text-white  text-6xl`}>
              Foody
    </Text>
    <Text style={tw`font-medium text-white tracking-widest text-lg`}>
        Food is always right
    </Text>
</View>

        </View>
    )
}