import { CatalogProduct, catalogData } from "@/lib/catalog-data";

export interface SetupPreferences {
  experience: 'beginner' | 'intermediate' | 'advanced' | null;
  budget: 'low' | 'medium' | 'high' | null;
  goal: 'planets' | 'deepsky' | 'astrophotography' | null;
  environment: 'city' | 'suburban' | 'darksky' | null;
}

export interface RecommendationResultData {
  mainItems: CatalogProduct[];
  accessories: CatalogProduct[];
  reasoningEn: string;
  reasoningEs: string;
}

export function generateRecommendation(prefs: SetupPreferences): RecommendationResultData {
  const mainItems: CatalogProduct[] = [];
  const accessories: CatalogProduct[] = [];
  let reasoningEn = "";
  let reasoningEs = "";

  const findProduct = (id: string) => catalogData.find(p => p.id === id);

  // Default Fallbacks
  const celestron130slt = findProduct('celestron-130slt');
  const eq6r = findProduct('sw-eq6r');
  const edgeHd8 = findProduct('celestron-edge');
  const zwo533mc = findProduct('zwo-533mc');
  const zwoEaf = findProduct('zwo-eaf');
  const optolong = findProduct('optolong-lpro');

  // Logic Tree
  if (prefs.experience === 'beginner' || prefs.budget === 'low') {
    if (celestron130slt) mainItems.push(celestron130slt);
    reasoningEn = "For those starting out or with a strict budget, the Celestron NexStar 130SLT offers computerized tracking and enough aperture to view planets and bright deep-sky objects effortlessly.";
    reasoningEs = "Para quienes recién comienzan o con presupuesto ajustado, el Celestron NexStar 130SLT ofrece seguimiento computarizado y apertura suficiente para ver planetas y objetos brillantes del cielo profundo sin esfuerzo.";
  } else if (prefs.goal === 'astrophotography' && prefs.experience !== 'beginner') {
    if (edgeHd8) mainItems.push(edgeHd8);
    if (eq6r) mainItems.push(eq6r);
    if (zwo533mc) mainItems.push(zwo533mc);
    
    // Add Electronic Focuser for serious imaging
    if (prefs.budget === 'high' && zwoEaf) accessories.push(zwoEaf);
    
    reasoningEn = "Astrophotography requires a rock-solid foundation. The EQ6-R Pro paired with the flat-field EdgeHD and a highly sensitive cooled ZWO camera forms an observatory-class imaging ecosystem.";
    reasoningEs = "La astrofotografía requiere una base sólida. La EQ6-R Pro junto con el EdgeHD de campo plano y la cámara ZWO refrigerada de alta sensibilidad forman un ecosistema de captura clase observatorio.";
  } else {
    // General intermediate / Advanced visual
    if (edgeHd8) mainItems.push(edgeHd8);
    if (eq6r) mainItems.push(eq6r);
    reasoningEn = "The 8-inch EdgeHD on an equatorial mount provides extreme visual clarity for both planetary and deep-sky targets, allowing future transitions to astrophotography.";
    reasoningEs = "El EdgeHD de 8 pulgadas sobre una montura ecuatorial proporciona una claridad visual extrema tanto para objetivos planetarios como de cielo profundo, permitiendo una futura transición a la astrofotografía.";
  }

  // Environment Modifiers (Light Pollution Filter)
  if (prefs.environment === 'city' && optolong) {
    accessories.push(optolong);
    reasoningEn += " Since you are observing from a city skyline, we added the Optolong L-eXtreme filter to pierce through intense light pollution.";
    reasoningEs += " Dado que observarás desde la ciudad, agregamos el filtro Optolong L-eXtreme para perforar la intensa contaminación lumínica.";
  }

  return { mainItems, accessories, reasoningEn, reasoningEs };
}
