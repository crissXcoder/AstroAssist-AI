import { useState, useMemo, useCallback } from "react";
import type { CatalogFilters, ScoredProduct, CuratedSetup } from "@/types/catalog";
import type { ProductCategory, RecommendedLevel, ObservationType, SkyCondition, Portability } from "@/types/catalog";
import { getFilteredProducts, getRelevantSetups } from "@/utils/recommendationEngine";

const DEFAULT_FILTERS: CatalogFilters = {
  level: null,
  goal: null,
  sky: null,
  portability: null,
  category: null,
  search: "",
};

export interface UseCatalogFiltersReturn {
  filters: CatalogFilters;
  filteredProducts: ScoredProduct[];
  relevantSetups: CuratedSetup[];
  isFiltered: boolean;
  setLevel: (value: RecommendedLevel | null) => void;
  setGoal: (value: ObservationType | null) => void;
  setSky: (value: SkyCondition | null) => void;
  setPortability: (value: Portability | null) => void;
  setCategory: (value: ProductCategory | null) => void;
  setSearch: (value: string) => void;
  clearFilter: (key: keyof CatalogFilters) => void;
  clearAll: () => void;
}

export function useCatalogFilters(): UseCatalogFiltersReturn {
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);

  const filteredProducts = useMemo(() => getFilteredProducts(filters), [filters]);
  const relevantSetups = useMemo(() => getRelevantSetups(filters), [filters]);

  const isFiltered = useMemo(
    () =>
      filters.level !== null ||
      filters.goal !== null ||
      filters.sky !== null ||
      filters.portability !== null ||
      filters.category !== null ||
      filters.search !== "",
    [filters]
  );

  const setLevel = useCallback((value: RecommendedLevel | null) => {
    setFilters((prev) => ({ ...prev, level: value }));
  }, []);

  const setGoal = useCallback((value: ObservationType | null) => {
    setFilters((prev) => ({ ...prev, goal: value }));
  }, []);

  const setSky = useCallback((value: SkyCondition | null) => {
    setFilters((prev) => ({ ...prev, sky: value }));
  }, []);

  const setPortability = useCallback((value: Portability | null) => {
    setFilters((prev) => ({ ...prev, portability: value }));
  }, []);

  const setCategory = useCallback((value: ProductCategory | null) => {
    setFilters((prev) => ({ ...prev, category: value }));
  }, []);

  const setSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const clearFilter = useCallback((key: keyof CatalogFilters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "search" ? "" : null,
    }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    filteredProducts,
    relevantSetups,
    isFiltered,
    setLevel,
    setGoal,
    setSky,
    setPortability,
    setCategory,
    setSearch,
    clearFilter,
    clearAll,
  };
}
