export * from './types';
export { CatalogProductCard as ProductCard } from './components/ProductCard';
export { ProductGrid } from './components/ProductGrid';
export { SmartFilters } from './components/SmartFilters';
export { QuickGuide } from './components/QuickGuide';
export { SetupCard } from './components/SetupCard';
export { SetupsSection } from './components/SetupsSection';
export { catalogData } from './data/catalog-data';

export { productService } from './services/productService';

// Compatibility alias
import type { Product } from './types';
export type CatalogProduct = Product;

