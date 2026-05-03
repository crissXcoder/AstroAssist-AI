import { useState, useEffect } from 'react';
import { GeoService, Province, Canton, District } from '@/shared/api/geo.service';

export const useGeo = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cantons, setCantons] = useState<Canton[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCantons, setLoadingCantons] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  useEffect(() => {
    const loadProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const data = await GeoService.getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Error loading provinces:', error);
      } finally {
        setLoadingProvinces(false);
      }
    };
    loadProvinces();
  }, []);

  const loadCantons = async (provinceId: string) => {
    if (!provinceId) {
      setCantons([]);
      setDistricts([]);
      return;
    }
    setLoadingCantons(true);
    try {
      const data = await GeoService.getCantons(provinceId);
      setCantons(data);
      setDistricts([]);
    } catch (error) {
      console.error('Error loading cantons:', error);
    } finally {
      setLoadingCantons(false);
    }
  };

  const loadDistricts = async (provinceId: string, cantonId: string) => {
    if (!provinceId || !cantonId) {
      setDistricts([]);
      return;
    }
    setLoadingDistricts(true);
    try {
      const data = await GeoService.getDistricts(provinceId, cantonId);
      setDistricts(data);
    } catch (error) {
      console.error('Error loading districts:', error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  return {
    provinces,
    cantons,
    districts,
    loadingProvinces,
    loadingCantons,
    loadingDistricts,
    loadCantons,
    loadDistricts
  };
};
