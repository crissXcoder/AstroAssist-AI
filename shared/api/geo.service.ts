import axios from 'axios';

const GEO_API_URL = process.env.NEXT_PUBLIC_GEOC_API_URL || 'https://api-geo-cr.vercel.app';

export interface Province {
  id: string;
  name: string;
}

export interface Canton {
  id: string;
  name: string;
  provinceId: string;
}

export interface District {
  id: string;
  name: string;
  cantonId: string;
  zipCode?: string;
}

export const GeoService = {
  async getProvinces(): Promise<Province[]> {
    const { data } = await axios.get(`${GEO_API_URL}/provincias`);
    // The API returns { data: [...], ... }
    return data.data.map((p: any) => ({
      id: String(p.idProvincia),
      name: p.descripcion
    }));
  },

  async getCantons(provinceId: string): Promise<Canton[]> {
    if (!provinceId) return [];
    const { data } = await axios.get(`${GEO_API_URL}/provincias/${provinceId}/cantones`);
    return data.data.map((c: any) => ({
      id: String(c.idCanton),
      name: c.descripcion,
      provinceId: String(c.idProvincia)
    }));
  },

  async getDistricts(provinceId: string, cantonId: string): Promise<District[]> {
    if (!provinceId || !cantonId) return [];
    const { data } = await axios.get(`${GEO_API_URL}/cantones/${cantonId}/distritos`);
    return data.data.map((d: any) => ({
      id: String(d.idDistrito),
      name: d.descripcion,
      cantonId: String(d.idCanton)
    }));
  }
};
