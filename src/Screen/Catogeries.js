import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'
import tw from 'twrnc';
import { categoryData } from '../data';
export default function Component({categories,activeCategory,handleChangeCategory}) {
  return (
    <View>
     <ScrollView 
     horizontal
     showsHorizontalScrollIndicator={false}
     style={[tw`space-x-4 `]}
     contentContainerStyle={{paddingHorizontal:15}}
     >
{
  categories.map((cat,index)=>{
    let isActive = cat.strCategory==activeCategory;
    let activeButtonClass = isActive?'bg-amber-400':'bg-black/10';
    return(
      <TouchableOpacity key={index} style={[tw`flex items-center m-1 `]}
         onPress={()=>handleChangeCategory(cat.strCategory)}
      >
<View style={[tw`rounded-full p-2`, tw`${activeButtonClass}`]}>
  <Image source={{uri:cat.strCategoryThumb}} style={[tw`rounded-full`,{width:hp(6),height:hp(6)}]} />
</View>
<Text>{cat.strCategory}</Text>
      </TouchableOpacity>
    )
  })
}
     </ScrollView>
    </View>
  )
}