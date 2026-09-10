import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';
import { useMenu } from '../context/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

export default function ItemDetailScreen({ route, navigation }: Props) {
  const { dishId } = route.params;
  const { getDishById, deleteDish } = useMenu();
  const dish = getDishById(dishId);

  if (!dish) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Dish not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Back to Menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Item', `Remove "${dish.name}" from the menu?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteDish(dish.id);
          navigation.navigate('ChefMenu');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Menu</Text>
        </TouchableOpacity>
        <Text style={styles.headerLabel}>DISH DOSSIER</Text>
      </View>

      <ScrollView>
        {dish.image ? (
          <Image source={{ uri: dish.image }} style={styles.image} />
        ) : null}

        <View style={styles.metaRow}>
          <Text style={styles.course}>{dish.course.toUpperCase()}</Text>
          <Text style={styles.price}>R{dish.price}</Text>
        </View>

        <Text style={styles.name}>{dish.name}</Text>

        <Text style={styles.notesLabel}>PREPARATION NOTES</Text>
        <Text style={styles.notes}>{dish.description}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditDish', { dishId: dish.id })}
        >
          <Text style={styles.editButtonText}>Edit Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('ChefMenu')}
        >
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  back: { fontSize: 16, color: colors.text },
  headerLabel: { fontSize: 11, letterSpacing: 1, color: colors.textLight },
  image: { width: '100%', height: 260, borderRadius: 14, marginBottom: 16 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  course: { color: colors.textLight, letterSpacing: 1, fontSize: 12 },
  price: { fontSize: 20, fontWeight: '700', color: colors.text },
  name: { fontFamily: fonts.serif, fontSize: 28, color: colors.text, marginTop: 6 },
  notesLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: colors.textLight,
    marginTop: 20,
    marginBottom: 6,
  },
  notes: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  editButtonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  deleteButton: {
    backgroundColor: colors.accent,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  backButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
  },
  backButtonText: { color: colors.text, fontWeight: '600', fontSize: 16 },
  link: { color: colors.primary, marginTop: 10 },
});