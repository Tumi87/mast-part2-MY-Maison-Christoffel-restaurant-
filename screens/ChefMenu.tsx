import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';
import { Course, Dish, COURSES } from '../types';
import { useMenu, getMenuStats } from '../context/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ChefMenu'>;

const FILTERS: Array<Course | 'All'> = ['All', ...COURSES];

export default function ChefMenuScreen({ navigation }: Props) {
  const { dishes } = useMenu();
  const [activeFilter, setActiveFilter] = useState<Course | 'All'>('All');

  const stats = getMenuStats(dishes, activeFilter);

  const renderItem = ({ item }: { item: Dish }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('ItemDetail', { dishId: item.id })}
    >
      <View style={styles.rowText}>
        <View style={styles.rowHeader}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.courseTag}>{item.course.toUpperCase()}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>R{item.price}</Text>
      </View>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumb} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>
      <Text style={styles.subtitle}>SEASONAL GASTRONOMY</Text>

      <View style={styles.filters}>
        {FILTERS.map((filter) => {
          const active = filter === activeFilter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.pill, active && styles.pillActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>
                {filter === 'All' ? 'All Courses' : filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={stats.dishes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 90 }}
      />

      <Text style={styles.footerCount}>Showing {stats.count} exquisite dishes</Text>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddDish')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontFamily: fonts.serif, fontSize: 30, color: colors.text },
  subtitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 16,
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  pillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  pillText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  pillTextActive: { color: colors.white },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rowText: { flex: 1, paddingRight: 12 },
  rowHeader: { flexDirection: 'row', alignItems: 'center' },
  dishName: { fontFamily: fonts.serif, fontSize: 17, color: colors.text },
  courseTag: {
    marginLeft: 8,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.primary,
    fontWeight: '700',
  },
  description: { color: colors.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },
  price: { color: colors.text, fontWeight: '700', marginTop: 6 },
  thumb: { width: 64, height: 64, borderRadius: 10 },
  separator: { height: 1, backgroundColor: colors.border },
  footerCount: {
    position: 'absolute',
    bottom: 26,
    left: 20,
    color: colors.textLight,
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { color: colors.white, fontSize: 26, marginTop: -2 },
});