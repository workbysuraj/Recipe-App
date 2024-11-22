import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Catogeries from './Catogeries';
import axios from 'axios';
import Recipe from './Recipe';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  // Function to handle category change
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  // Fetch categories only on initial load
  useEffect(() => {
    getCategories();
  }, []);  // Empty dependency array to run once

  // Fetch recipes whenever the active category changes
  useEffect(() => {
    getRecipies(activeCategory);
  }, [activeCategory]);  // Dependency on activeCategory to trigger the effect when it changes

  // Fetch categories from API
  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('Error fetching categories:', err);
    }
  };



  // Fetch recipes from API based on category
  const getRecipies = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('Error fetching recipes:', err);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(7), // Make paddingBottom responsive
        }}
        style={[tw`space-y-6 pt-8`]}
      >
        {/* Header Section with Logo and Bell Icon */}
        <View style={[tw`mx-4 flex-row justify-between items-center mb-2`]}>
          {/* Logo */}
          <Image
            source={require('../image/welcome.png')}
            style={{
              height: hp(5), // Responsive height for the logo
              width: hp(5),  // Responsive width for the logo
            }}
          />
          {/* Bell Icon */}
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greeting */}
        <View style={[tw`mx-4 space-y-2 mb-2`]}>
          <Text style={[tw`text-neutral-600`, { fontSize: hp(1.7) }]}>Hello, Suraj!</Text>
          <View>
            <Text style={[tw`font-semibold text-neutral-600`, { fontSize: hp(3.8) }]}>
              Make your own food,
            </Text>
          </View>
          <Text style={[tw`font-semibold text-neutral-600`, { fontSize: hp(3.8) }]}>
            stay at <Text style={[tw`text-amber-400`]}>home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`]}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={[tw`flex-1 text-base mb-1 pl-3 tracking-wider`, { fontSize: hp(1.7) }]}
          />
          <View style={[tw`bg-white rounded-full p-3`]}>
            <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <View>
          <Catogeries categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
        </View>

        {/* Recipes */}
        <View>
          <Recipe meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
}
