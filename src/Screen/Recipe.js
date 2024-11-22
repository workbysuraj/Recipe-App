import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import MasonryList from '@react-native-seoul/masonry-list'
import { categoryData } from '../data/index';
import Loading from './Loading';
import Navigation from '../Navigation';
import { useNavigation } from '@react-navigation/native';

export default function Recipe({meals}) {
    const navigation = useNavigation();
    return (

        
        <View style={[tw`mx-4 space-y-3`]}>
            <Text style={[tw`font-semibold`, { fontSize: hp(3) }]}>Recipe</Text>
            <View>
                {
                    meals.length==0?(
                          <Loading size='large'/>
                    ):(
                        <MasonryList
                        data={meals}
                        keyExtractor={(item) => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item ,i}) => <RecipeCard item={item} index={i} navigation={navigation}/>}
                        // refreshing={isLoadingNext}
                        // onRefresh={() => refetch({ first: ITEM_CNT })}
                        onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                    />
                    )
               
                }
                
            </View>
        </View>
    )
}

const RecipeCard =({item,index,navigation})=>{
let isEven = index%2==0;

    return(
        <View>
            <Pressable
            style={[tw`flex justify-center mb-4 space-y-1 `,{width:'100%',paddingLeft:isEven? 0:8,paddingRight:isEven? 8:0 }]}
            onPress={()=>navigation.navigate('RecipeDetail',{...item})}
            >
<Image source={{uri:item.strMealThumb}}
style={[tw`bg-black/5`,{width:'100%',height: index%3==0? hp(25):hp(35), borderRadius:35}]}
/>
<Text
style={[tw`font-semibold ml-2 text-neutral-600`,{fontSize:hp(1.8)}]}
>{item.strMeal.length>20? item.strMeal.slice(0,20)+'...':item.strMeal}</Text>
            </Pressable>
        </View>
    )
}








