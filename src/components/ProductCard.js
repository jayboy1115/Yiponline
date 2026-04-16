import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS } from '../theme/colors';

const ProductCard = ({ product, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.photo }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.02)']}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          <TouchableOpacity 
            onPress={() => onDelete(product.id)} 
            style={styles.deleteButton}
            activeOpacity={0.6}
          >
            <View style={styles.deleteIconContainer}>
              <Trash2 size={16} color={COLORS.error} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${parseFloat(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    padding: SPACING.sm,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.xs,
    letterSpacing: -0.3,
  },
  footer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: -2,
  },
  deleteButton: {
    padding: 4,
  },
  deleteIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff1f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
