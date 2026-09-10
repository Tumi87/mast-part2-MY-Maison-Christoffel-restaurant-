import React from 'react';
import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useMenu } from '../context/MenuContext';
import DishForm from './DishForm';

type Props = NativeStackScreenProps<RootStackParamList, 'EditDish'>;

export default function EditDishScreen({ route, navigation }: Props) {
  const { dishId } = route.params;
  const { getDishById, updateDish } = useMenu();
  const dish = getDishById(dishId);

  if (!dish) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dish not found.</Text>
      </View>
    );
  }

  return (
    <DishForm
      title="EDIT DISH"
      submitLabel="Save Menu Item"
      initialValues={dish}
      onSubmit={(values) => {
        updateDish(dish.id, values);
        navigation.navigate('ItemDetail', { dishId: dish.id });
      }}
      onCancel={() => navigation.goBack()}
    />
  );
}