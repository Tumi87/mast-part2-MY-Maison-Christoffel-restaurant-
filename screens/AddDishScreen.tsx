import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useMenu } from '../context/MenuContext';
import DishForm from './DishForm';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDish'>;

export default function AddDishScreen({ navigation }: Props) {
  const { addDish } = useMenu();

  return (
    <DishForm
      title="ADD NEW DISH"
      submitLabel="Save Menu Item"
      onSubmit={(values) => {
        addDish(values);
        navigation.navigate('ChefMenu');
      }}
      onCancel={() => navigation.goBack()}
    />
  );
}