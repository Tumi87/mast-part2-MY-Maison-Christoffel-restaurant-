import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, fonts } from '../theme/colors';
import { Course, COURSES, Dish } from '../types';

interface DishFormProps {
  title: string;
  initialValues?: Partial<Omit<Dish, 'id'>>;
  submitLabel: string;
  onSubmit: (values: Omit<Dish, 'id'>) => void;
  onCancel: () => void;
}

export default function DishForm({
  title,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: DishFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [price, setPrice] = useState(initialValues?.price ? String(initialValues.price) : '');
  const [course, setCourse] = useState<Course>(initialValues?.course ?? 'Starter');
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const parsedPrice = parseFloat(price);

    if (!trimmedName || !trimmedDescription || !price || isNaN(parsedPrice)) {
      setError('Please complete all fields.');
      return;
    }

    setError('');
    onSubmit({
      name: trimmedName,
      description: trimmedDescription,
      price: parsedPrice,
      course,
      image: initialValues?.image,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.label}>DISH NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Karoo Lamb Cutlets"
        />

        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the culinary notes, preparation & ingredients..."
          multiline
          numberOfLines={4}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>PRICE (ZAR)</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>COURSE</Text>
            <View style={styles.courseSelector}>
              {COURSES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.courseOption, course === c && styles.courseOptionActive]}
                  onPress={() => setCourse(c)}
                >
                  <Text
                    style={[
                      styles.courseOptionText,
                      course === c && styles.courseOptionTextActive,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{submitLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 13, letterSpacing: 2, fontWeight: '700', color: colors.text, marginBottom: 20 },
  label: { fontSize: 12, letterSpacing: 1, color: colors.textMuted, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
    color: colors.text,
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  courseSelector: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, overflow: 'hidden' },
  courseOption: { paddingVertical: 12, paddingHorizontal: 10 },
  courseOptionActive: { backgroundColor: colors.primary },
  courseOptionText: { color: colors.text, fontSize: 13 },
  courseOptionTextActive: { color: colors.white, fontWeight: '700' },
  error: { color: colors.accent, marginTop: 4, marginBottom: 10, fontSize: 13 },
  saveButton: { backgroundColor: colors.primary, borderRadius: 28, paddingVertical: 16, alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  cancelButton: { borderWidth: 1, borderColor: colors.border, borderRadius: 28, paddingVertical: 16, alignItems: 'center', marginTop: 12, marginBottom: 30 },
  cancelButtonText: { color: colors.text, fontWeight: '600', fontSize: 16 },
});