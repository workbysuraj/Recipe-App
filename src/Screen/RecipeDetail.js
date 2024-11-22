import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import axios from 'axios';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import WebView from 'react-native-webview'; // For embedding YouTube

export default function RecipeDetail(props) {
  const item = props.route.params; // Accessing route params
  const [mealData, setMealData] = useState(null); // State to store the fetched meal data
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // State for controlling video play

  useEffect(() => {
    if (item && item.idMeal) {
      getMealData(item.idMeal); // Fetch the meal data only if the item exists
    }
  }, [item]);

  // Fetch details of the recipe
  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log('got recipes:', response.data);
      if (response && response.data && response.data.meals) {
        setMealData(response.data.meals[0]); // Set the meal data in state
      }
    } catch (err) {
      console.log('Error fetching recipes:', err);
    }
  };

  // If no meal data is available, show loading
  if (!mealData) {
    return (
      <View style={[tw`flex-1 justify-center items-center`]}>
        <Text style={[tw`text-xl font-semibold`]}>
          Loading details...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[tw`bg-white flex-1`]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Image Section */}
      <View style={[tw`flex-row justify-center`]}>
        <Image
          source={{ uri: mealData.strMealThumb }}
          style={[
            tw`rounded-lg`,
            { width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
          ]}
        />
      </View>

      {/* Meal Name */}
      <View style={[tw`p-4`]}>
        <Text style={[tw`text-2xl font-semibold text-center`, { fontSize: hp(3) }]}>
          {mealData.strMeal}
        </Text>
      </View>

      {/* Meal Details Section (Time, Serving, Calories) */}
      <View style={[tw`px-4 mt-4`]}>
        <Text style={[tw`font-semibold text-neutral-600`, { fontSize: hp(2) }]}>Meal Details:</Text>

        <View style={[tw`flex-row justify-between mt-2`]}>
          {/* Cooking Time */}
          
            <View style={[tw`flex-row items-center`]}>
              <Text style={[tw`text-neutral-600`, { fontSize: hp(1.8) }]}>⏱️ {mealData.strCookTime} min</Text>
            </View>
          

          {/* Serving */}
          
            <View style={[tw`flex-row items-center`]}>
              <Text style={[tw`text-neutral-600`, { fontSize: hp(1.8) }]}>🍽️ {mealData.strServings} servings</Text>
            </View>
         

          {/* Calories */}
          
            <View style={[tw`flex-row items-center`]}>
              <Text style={[tw`text-neutral-600`, { fontSize: hp(1.8) }]}>🔥 {mealData.strCalories} kcal</Text>
            </View>
          
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={[tw`px-4 mt-4`]}>
        <Text style={[tw`font-semibold text-neutral-600`, { fontSize: hp(2) }]}>Ingredients:</Text>
        <View style={[tw`space-y-2`]}>
          {/* Assuming the API returns ingredients in strIngredient1, strIngredient2, etc. */}
          {Object.keys(mealData).map((key) => {
            if (key.includes('strIngredient') && mealData[key]) {
              return (
                <Text key={key} style={[tw`text-neutral-600`, { fontSize: hp(3) }]}>
                  <Text style={[tw`text-yellow-500`,{fontSize:hp(4)}]}>{'\u2022'}</Text> {mealData[key]}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </View>

      {/* Instructions Section */}
      <View style={[tw`px-4 mt-4`]}>
        <Text style={[tw`font-semibold text-neutral-600`, { fontSize: hp(2) }]}>Instructions:</Text>
        <Text style={[tw`text-neutral-600`, { fontSize: hp(1.8) }]}>
          {mealData.strInstructions}
        </Text>
      </View>

      {/* YouTube Video Section */}
      {mealData.strYoutube && !isVideoPlaying && (
        <View style={[tw`mt-4`]}>
          <TouchableOpacity onPress={() => setIsVideoPlaying(true)} style={[tw`bg-amber-400 p-4 rounded-lg`]}>
            <Text style={[tw`text-white text-center`, { fontSize: hp(2) }]}>Play Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {mealData.strYoutube && isVideoPlaying && (
        <View style={[tw`mt-4`]}>
          <WebView
            source={{ uri: mealData.strYoutube }}
            style={[{ width: wp(100), height: hp(30) }]}
          />
        </View>
      )}
    </ScrollView>
  );
}
