import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Package, Info, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { addProduct, removeProduct, resetLimitReached } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import { COLORS, SPACING, RADIUS } from '../theme/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const { items, limitReached } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [items]);

  useEffect(() => {
    if (limitReached) {
      Alert.alert(
        "Product Limit Reached",
        "You have reached the maximum limit of 5 products. Remove an item to add a new one.",
        [{ text: "Got it", onPress: () => dispatch(resetLimitReached()) }]
      );
    }
  }, [limitReached, dispatch]);

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
    Toast.show({
      type: 'success',
      text1: 'Product Added',
      text2: `${product.name} has been added to your showcase.`,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const handleDeleteProduct = (id) => {
    const productToDelete = items.find(item => item.id === id);
    dispatch(removeProduct(id));
    Toast.show({
      type: 'error',
      text1: 'Product Deleted',
      text2: productToDelete ? `${productToDelete.name} has been removed.` : 'Product has been removed.',
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Package size={48} color={COLORS.primary} />
      </View>
      <Text style={styles.emptyText}>Start your collection</Text>
      <Text style={styles.emptySubtext}>Add your first product to showcase it to the world.</Text>
      <TouchableOpacity 
        style={styles.emptyAddButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.emptyAddButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.header, { marginTop: Math.max(insets.top, SPACING.md) + SPACING.sm }]}>
        <View>
          <View style={styles.badge}>
            <Sparkles size={12} color={COLORS.primary} />
            <Text style={styles.badgeText}>Premium Showcase</Text>
          </View>
          <Text style={styles.title}>My Products</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(items.length / 5) * 100}%` }]} />
            <Text style={styles.subtitle}>{items.length} of 5 slots used</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.addButton, items.length >= 5 && styles.disabledButton]}
          onPress={() => setModalVisible(true)}
          disabled={items.length >= 5}
        >
          <LinearGradient
            colors={items.length >= 5 ? [COLORS.border, COLORS.border] : [COLORS.primary, '#4f46e5']}
            style={styles.addButtonGradient}
          >
            <Plus size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.safeArea}>
        {items.length >= 5 && (
          <View style={styles.limitBanner}>
            <Info size={16} color="#b45309" />
            <Text style={styles.limitBannerText}>
              Limit reached. Remove an item to unlock slots.
            </Text>
          </View>
        )}

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} onDelete={handleDeleteProduct} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddProduct}
        currentCount={items.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.md,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '1000',
    color: COLORS.text,
    letterSpacing: -1,
    lineHeight: 32,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginTop: 60,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 24,
  },
  emptyAddButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  emptyAddButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  limitBanner: {
    backgroundColor: '#fffbeb',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  limitBannerText: {
    fontSize: 13,
    color: '#92400e',
    fontWeight: '600',
    marginLeft: SPACING.sm,
    flex: 1,
  },
});

export default HomeScreen;
