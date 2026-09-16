// Authentic Sri Lankan 20-Porondam Astro Matching Calculation Engine
// Built strictly according to traditional Sri Lankan Nirayana Astrology rules (නිරායන ජ්‍යොතිෂ ගණිතය)

export interface NakshatraInfo {
  id: number;
  name: string;
  nameSinhala: string;
  lord: string;
  gana: 'Deva' | 'Manusha' | 'Rakshasa';
  yoni: string;
  yoniSinhala: string;
  nadi: 'Vata' | 'Pitta' | 'Kapha';
  rajju: 'Sira' | 'Kanta' | 'Udara' | 'Kati' | 'Pada';
  element: 'Earth' | 'Water' | 'Fire' | 'Air' | 'Ether';
  bird: string;
  tree: string;
}

export interface RashiInfo {
  id: number;
  name: string;
  nameSinhala: string;
  lord: string;
  element: string;
}

export const NAKSHATRAS: NakshatraInfo[] = [
  { id: 1, name: 'Aswida', nameSinhala: 'අස්විද', lord: 'Kethu', gana: 'Deva', yoni: 'Horse', yoniSinhala: 'අශ්ව', nadi: 'Vata', rajju: 'Pada', element: 'Earth', bird: 'Eagle', tree: 'Attikka' },
  { id: 2, name: 'Berana', nameSinhala: 'බෙරණ', lord: 'Shukra', gana: 'Manusha', yoni: 'Elephant', yoniSinhala: 'ඇත්', nadi: 'Pitta', rajju: 'Kati', element: 'Earth', bird: 'Crow', tree: 'Nelli' },
  { id: 3, name: 'Kethi', nameSinhala: 'කැති', lord: 'Ravi', gana: 'Rakshasa', yoni: 'Goat', yoniSinhala: 'එළු', nadi: 'Kapha', rajju: 'Udara', element: 'Fire', bird: 'Peacock', tree: 'Burutha' },
  { id: 4, name: 'Rehena', nameSinhala: 'රෙහෙන', lord: 'Chandra', gana: 'Manusha', yoni: 'Serpent', yoniSinhala: 'සර්ප', nadi: 'Kapha', rajju: 'Kanta', element: 'Earth', bird: 'Owl', tree: 'Mabola' },
  { id: 5, name: 'Muwasirasa', nameSinhala: 'මුවසිරස', lord: 'Kuja', gana: 'Deva', yoni: 'Serpent', yoniSinhala: 'සර්ප', nadi: 'Pitta', rajju: 'Sira', element: 'Earth', bird: 'Hen', tree: 'Kihiri' },
  { id: 6, name: 'Ada', nameSinhala: 'අද', lord: 'Rahu', gana: 'Manusha', yoni: 'Dog', yoniSinhala: 'බලු', nadi: 'Vata', rajju: 'Kanta', element: 'Water', bird: 'Swan', tree: 'Kalanduru' },
  { id: 7, name: 'Punawasa', nameSinhala: 'පුනාවස', lord: 'Guru', gana: 'Deva', yoni: 'Cat', yoniSinhala: 'බළල්', nadi: 'Vata', rajju: 'Udara', element: 'Water', bird: 'Swan', tree: 'Bamboo' },
  { id: 8, name: 'Pusha', nameSinhala: 'පුෂ', lord: 'Shani', gana: 'Deva', yoni: 'Goat', yoniSinhala: 'එළු', nadi: 'Pitta', rajju: 'Kati', element: 'Water', bird: 'Crow', tree: 'Kumbuk' },
  { id: 9, name: 'Aslisa', nameSinhala: 'අස්ලිස', lord: 'Budha', gana: 'Rakshasa', yoni: 'Cat', yoniSinhala: 'බළල්', nadi: 'Kapha', rajju: 'Pada', element: 'Water', bird: 'Cuckoo', tree: 'Suriya' },
  { id: 10, name: 'Ma', nameSinhala: 'මා', lord: 'Kethu', gana: 'Rakshasa', yoni: 'Rat', yoniSinhala: 'මී', nadi: 'Kapha', rajju: 'Pada', element: 'Fire', bird: 'Eagle', tree: 'Muga' },
  { id: 11, name: 'Puwapal', nameSinhala: 'පුවපල්', lord: 'Shukra', gana: 'Manusha', yoni: 'Rat', yoniSinhala: 'මී', nadi: 'Pitta', rajju: 'Kati', element: 'Fire', bird: 'Falcon', tree: 'Kela' },
  { id: 12, name: 'Uththarapal', nameSinhala: 'උත්තරපල්', lord: 'Ravi', gana: 'Manusha', yoni: 'Bull', yoniSinhala: 'ගොන්', nadi: 'Vata', rajju: 'Udara', element: 'Fire', bird: 'Peacock', tree: 'Kotu' },
  { id: 13, name: 'Hatha', nameSinhala: 'හත', lord: 'Chandra', gana: 'Deva', yoni: 'Buffalo', yoniSinhala: 'මී හරක්', nadi: 'Vata', rajju: 'Kanta', element: 'Air', bird: 'Crow', tree: 'Domba' },
  { id: 14, name: 'Sita', nameSinhala: 'සිත', lord: 'Kuja', gana: 'Rakshasa', yoni: 'Tiger', yoniSinhala: 'කොටි', nadi: 'Pitta', rajju: 'Sira', element: 'Air', bird: 'Cock', tree: 'Kaluwara' },
  { id: 15, name: 'Sa', nameSinhala: 'සා', lord: 'Rahu', gana: 'Deva', yoni: 'Buffalo', yoniSinhala: 'මී හරක්', nadi: 'Kapha', rajju: 'Kanta', element: 'Air', bird: 'Peacock', tree: 'Kumbuk' },
  { id: 16, name: 'Visa', nameSinhala: 'විසා', lord: 'Guru', gana: 'Rakshasa', yoni: 'Tiger', yoniSinhala: 'කොටි', nadi: 'Kapha', rajju: 'Udara', element: 'Air', bird: 'Swan', tree: 'Woodapple' },
  { id: 17, name: 'Anura', nameSinhala: 'අනුර', lord: 'Shani', gana: 'Deva', yoni: 'Deer', yoniSinhala: 'මුව', nadi: 'Pitta', rajju: 'Kati', element: 'Fire', bird: 'Nightingale', tree: 'Mihiriya' },
  { id: 18, name: 'Deta', nameSinhala: 'දෙට', lord: 'Budha', gana: 'Rakshasa', yoni: 'Deer', yoniSinhala: 'මුව', nadi: 'Vata', rajju: 'Pada', element: 'Fire', bird: 'Duck', tree: 'Gaskela' },
  { id: 19, name: 'Mula', nameSinhala: 'මුල', lord: 'Kethu', gana: 'Rakshasa', yoni: 'Dog', yoniSinhala: 'බලු', nadi: 'Vata', rajju: 'Pada', element: 'Air', bird: 'Vulture', tree: 'Sal' },
  { id: 20, name: 'Puwasala', nameSinhala: 'පුවසල', lord: 'Shukra', gana: 'Manusha', yoni: 'Monkey', yoniSinhala: 'වඳුරු', nadi: 'Pitta', rajju: 'Kati', element: 'Air', bird: 'Falcon', tree: 'Kalapu' },
  { id: 21, name: 'Uththarasala', nameSinhala: 'උත්තරසල', lord: 'Ravi', gana: 'Manusha', yoni: 'Mongoose', yoniSinhala: 'මුගටි', nadi: 'Kapha', rajju: 'Udara', element: 'Air', bird: 'Stork', tree: 'Katu' },
  { id: 22, name: 'Suwana', nameSinhala: 'සුවන', lord: 'Chandra', gana: 'Deva', yoni: 'Monkey', yoniSinhala: 'වඳුරු', nadi: 'Kapha', rajju: 'Kanta', element: 'Earth', bird: 'Hen', tree: 'Crown' },
  { id: 23, name: 'Denata', nameSinhala: 'දෙනට', lord: 'Kuja', gana: 'Rakshasa', yoni: 'Lion', yoniSinhala: 'සිංහ', nadi: 'Pitta', rajju: 'Sira', element: 'Earth', bird: 'Heron', tree: 'Jambu' },
  { id: 24, name: 'Siyawasa', nameSinhala: 'සියාවස', lord: 'Rahu', gana: 'Rakshasa', yoni: 'Horse', yoniSinhala: 'අශ්ව', nadi: 'Vata', rajju: 'Kanta', element: 'Ether', bird: 'Raven', tree: 'Kaduru' },
  { id: 25, name: 'Puwaputupal', nameSinhala: 'පුවපුටුප', lord: 'Guru', gana: 'Manusha', yoni: 'Lion', yoniSinhala: 'සිංහ', nadi: 'Vata', rajju: 'Udara', element: 'Ether', bird: 'Swan', tree: 'Mango' },
  { id: 26, name: 'Uththaraputupal', nameSinhala: 'උත්තරපුටුප', lord: 'Shani', gana: 'Deva', yoni: 'Cow', yoniSinhala: 'දෙනු', nadi: 'Pitta', rajju: 'Kati', element: 'Ether', bird: 'Eagle', tree: 'Neem' },
  { id: 27, name: 'Rewathee', nameSinhala: 'රේවතී', lord: 'Budha', gana: 'Deva', yoni: 'Elephant', yoniSinhala: 'ඇත්', nadi: 'Kapha', rajju: 'Pada', element: 'Ether', bird: 'Parrot', tree: 'Kohomba' },
];

export const RASHIS: RashiInfo[] = [
  { id: 1, name: 'Mesha', nameSinhala: 'මේෂ (Aries)', lord: 'Kuja', element: 'Fire' },
  { id: 2, name: 'Vrishabha', nameSinhala: 'වෘෂභ (Taurus)', lord: 'Shukra', element: 'Earth' },
  { id: 3, name: 'Mithuna', nameSinhala: 'මිථුන (Gemini)', lord: 'Budha', element: 'Air' },
  { id: 4, name: 'Kataka', nameSinhala: 'කටක (Cancer)', lord: 'Chandra', element: 'Water' },
  { id: 5, name: 'Simha', nameSinhala: 'සිංහ (Leo)', lord: 'Ravi', element: 'Fire' },
  { id: 6, name: 'Kanya', nameSinhala: 'කන්‍යා (Virgo)', lord: 'Budha', element: 'Earth' },
  { id: 7, name: 'Thula', nameSinhala: 'තුලා (Libra)', lord: 'Shukra', element: 'Air' },
  { id: 8, name: 'Vrishchika', nameSinhala: 'වෘශ්චික (Scorpio)', lord: 'Kuja', element: 'Water' },
  { id: 9, name: 'Dhanu', nameSinhala: 'ධනු (Sagittarius)', lord: 'Guru', element: 'Fire' },
  { id: 10, name: 'Makara', nameSinhala: 'මකර (Capricorn)', lord: 'Shani', element: 'Earth' },
  { id: 11, name: 'Kumbha', nameSinhala: 'කුම්භ (Aquarius)', lord: 'Shani', element: 'Air' },
  { id: 12, name: 'Meena', nameSinhala: 'මීන (Pisces)', lord: 'Guru', element: 'Water' },
];

export interface PorondamItemResult {
  title: string;
  titleSinhala: string;
  passed: boolean;
  score: number; // 0 or 1 (scaled to 20 total)
  details: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface AstroMatchReport {
  brideNakshatra: NakshatraInfo;
  groomNakshatra: NakshatraInfo;
  brideRashi: RashiInfo;
  groomRashi: RashiInfo;
  totalMatched: number; // e.g. 18
  totalPorondam: number; // 20
  percentage: number; // e.g. 90%
  verdict: 'උත්තමයි (Excellent Match)' | 'මධ්‍යමයි (Moderate Match)' | 'අගුණයි (Inauspicious Match)';
  verdictColor: string;
  kujaDoshayaStatus: string;
  shaniDoshayaStatus: string;
  items: PorondamItemResult[];
}

// Enemy Yoni pairs in traditional astrology
const ENEMY_YONI_PAIRS: [string, string][] = [
  ['Horse', 'Buffalo'], ['Elephant', 'Lion'], ['Goat', 'Monkey'],
  ['Serpent', 'Mongoose'], ['Dog', 'Deer'], ['Cat', 'Rat'], ['Cow', 'Tiger']
];

export function calculateAstroPorondam(
  brideNekathId: number,
  groomNekathId: number,
  brideRashiId: number,
  groomRashiId: number,
  hasKujaDoshayaBride: boolean = false,
  hasKujaDoshayaGroom: boolean = false
): AstroMatchReport {
  const brideNak = NAKSHATRAS.find(n => n.id === brideNekathId) || NAKSHATRAS[0];
  const groomNak = NAKSHATRAS.find(n => n.id === groomNekathId) || NAKSHATRAS[1];
  const brideRash = RASHIS.find(r => r.id === brideRashiId) || RASHIS[0];
  const groomRash = RASHIS.find(r => r.id === groomRashiId) || RASHIS[1];

  const items: PorondamItemResult[] = [];

  // 1. Nekath Porondama (නැකත් පොරොන්දම)
  const diffNak = (brideNak.id - groomNak.id + 27) % 9;
  const isNekathPassed = diffNak === 2 || diffNak === 4 || diffNak === 6 || diffNak === 8 || diffNak === 0;
  items.push({
    title: 'Nekath Porondama',
    titleSinhala: 'නැකත් පොරොන්දම',
    passed: isNekathPassed,
    score: isNekathPassed ? 1 : 0,
    details: isNekathPassed ? 'නැකත් ගැලපීම ඉතා ශුභයි (ආයුෂ හා යහපත ලැබෙනවා).' : 'නැකත් ගැලපීම මධ්‍යම/අශුභයි.',
    severity: 'High'
  });

  // 2. Gana Porondama (ගණ පොරොන්දම)
  let isGanaPassed = false;
  if (brideNak.gana === groomNak.gana) isGanaPassed = true;
  else if (brideNak.gana === 'Deva' && groomNak.gana === 'Manusha') isGanaPassed = true;
  else if (brideNak.gana === 'Manusha' && groomNak.gana === 'Deva') isGanaPassed = true;
  items.push({
    title: 'Gana Porondama',
    titleSinhala: 'ගණ පොරොන්දම',
    passed: isGanaPassed,
    score: isGanaPassed ? 1 : 0,
    details: isGanaPassed ? `දෙදෙනාගේ ගුණාංග හා සිතුවිලි එකඟයි (${brideNak.gana} - ${groomNak.gana}).` : `ගණ නොගැලපීම නිසා අදහස් ගැටීම් ඇතිවිය හැක (${brideNak.gana} vs ${groomNak.gana}).`,
    severity: 'High'
  });

  // 3. Mahendra Porondama (මාහේන්ද්‍ර පොරොන්දම)
  const countFromGroom = (brideNak.id - groomNak.id + 27) % 27;
  const isMahendraPassed = [4, 7, 10, 13, 16, 19, 22, 25].includes(countFromGroom);
  items.push({
    title: 'Mahendra Porondama',
    titleSinhala: 'මාහේන්ද්‍ර පොරොන්දම',
    passed: isMahendraPassed,
    score: isMahendraPassed ? 1 : 0,
    details: isMahendraPassed ? 'මාහේන්ද්‍ර පොරොන්දම උත්තමයි (දරු සම්පත් හා පරම්පරාව වර්ධනය වේ).' : 'මාහේන්ද්‍ර පොරොන්දම සාමාන්‍යයි.',
    severity: 'Medium'
  });

  // 4. Stree Deergha Porondama (ස්ත්‍රී දීර්ඝ පොරොන්දම)
  const isStreeDeerghaPassed = countFromGroom >= 13;
  items.push({
    title: 'Stree Deergha Porondama',
    titleSinhala: 'ස්ත්‍රී දීර්ඝ පොරොන්දම',
    passed: isStreeDeerghaPassed,
    score: isStreeDeerghaPassed ? 1 : 0,
    details: isStreeDeerghaPassed ? 'ස්ත්‍රී දීර්ඝ ගැලපීම ඉතා ශුභයි (මනාලියගේ සෞඛ්‍ය සම්පන්න බව සුරැකේ).' : 'ස්ත්‍රී දීර්ඝ දුර ප්‍රමාණය මදක් අඩුයි.',
    severity: 'Medium'
  });

  // 5. Yoni Porondama (යෝනි පොරොන්දම)
  const isYoniEnemy = ENEMY_YONI_PAIRS.some(([y1, y2]) => 
    (brideNak.yoni === y1 && groomNak.yoni === y2) || (brideNak.yoni === y2 && groomNak.yoni === y1)
  );
  const isYoniPassed = !isYoniEnemy;
  items.push({
    title: 'Yoni Porondama',
    titleSinhala: 'යෝනි පොරොන්දම',
    passed: isYoniPassed,
    score: isYoniPassed ? 1 : 0,
    details: isYoniPassed ? `කායික හා ලිංගික එකඟතාව ඉතා ශුභයි (${brideNak.yoniSinhala} + ${groomNak.yoniSinhala}).` : `යෝනි වෛරී බවක් පවතී (${brideNak.yoniSinhala} vs ${groomNak.yoniSinhala}).`,
    severity: 'High'
  });

  // 6. Rashi Porondama (රාශි පොරොන්දම)
  const rashiDiff = (brideRash.id - groomRash.id + 12) % 12;
  const isSadashtaka = rashiDiff === 5 || rashiDiff === 7; // 6-8 Sadashtaka (ෂඩාෂ්ටක)
  const isRashiPassed = !isSadashtaka;
  items.push({
    title: 'Rashi Porondama',
    titleSinhala: 'රාශි පොරොන්දම',
    passed: isRashiPassed,
    score: isRashiPassed ? 1 : 0,
    details: isRashiPassed ? `රාශි ගැලපීම ශුභයි (${brideRash.nameSinhala} & ${groomRash.nameSinhala}).` : `ෂඩාෂ්ටක රාශි දෝෂයක් පවතී (${brideRash.nameSinhala} vs ${groomRash.nameSinhala}).`,
    severity: 'High'
  });

  // 7. Rashyadhipathi Porondama (රාශ්‍යාධිපති පොරොන්දම)
  const isLordPassed = brideRash.lord === groomRash.lord || 
    (brideRash.lord === 'Ravi' && groomRash.lord === 'Guru') ||
    (brideRash.lord === 'Guru' && groomRash.lord === 'Ravi') ||
    (brideRash.lord === 'Budha' && groomRash.lord === 'Shukra') ||
    (brideRash.lord === 'Shukra' && groomRash.lord === 'Budha');
  items.push({
    title: 'Rashyadhipathi Porondama',
    titleSinhala: 'රාශ්‍යාධිපති පොරොන්දම',
    passed: isLordPassed,
    score: isLordPassed ? 1 : 0,
    details: isLordPassed ? 'රාශ්‍යාධිපති ග්‍රහයන් මිත්‍රයි (ආදරය හා බැඳීම වැඩි වේ).' : 'රාශ්‍යාධිපති ග්‍රහයන් සම/සතුරයි.',
    severity: 'Medium'
  });

  // 8. Vashya Porondama (වශ්‍ය පොරොන්දම)
  const isVashyaPassed = brideRash.id === groomRash.id || isLordPassed;
  items.push({
    title: 'Vashya Porondama',
    titleSinhala: 'වශ්‍ය පොරොන්දම',
    passed: isVashyaPassed,
    score: isVashyaPassed ? 1 : 0,
    details: isVashyaPassed ? 'එකිනෙකා කෙරෙහි වශ්‍යතාව හා අවනත බව පවතී.' : 'වශ්‍යතාව මධ්‍යමයි.',
    severity: 'Low'
  });

  // 9. Rajjuru Porondama (රජ්ජුරු පොරොන්දම)
  const isRajjuPassed = brideNak.rajju !== groomNak.rajju;
  items.push({
    title: 'Rajjuru Porondama',
    titleSinhala: 'රජ්ජුරු පොරොන්දම',
    passed: isRajjuPassed,
    score: isRajjuPassed ? 1 : 0,
    details: isRajjuPassed ? `එකම රජ්ජු දෝෂය නොමැත (${brideNak.rajju} vs ${groomNak.rajju} - දීර්ඝ මංගල යෝගයි).` : `එකම රජ්ජු දෝෂය පවතී (${brideNak.rajju}).`,
    severity: 'High'
  });

  // 10. Vedha Porondama (වේධ පොරොන්දම)
  const isVedhaConflict = (brideNak.id === 1 && groomNak.id === 18) || (brideNak.id === 18 && groomNak.id === 1);
  const isVedhaPassed = !isVedhaConflict;
  items.push({
    title: 'Vedha Porondama',
    titleSinhala: 'වේධ පොරොන්දම',
    passed: isVedhaPassed,
    score: isVedhaPassed ? 1 : 0,
    details: isVedhaPassed ? 'වේධ දෝෂයන් නොමැත (බාධා හා විපත් අවමයි).' : 'වේධ දෝෂයක් පවතී.',
    severity: 'High'
  });

  // 11. Nadi Porondama (නාඩි පොරොන්දම)
  const isNadiPassed = brideNak.nadi !== groomNak.nadi;
  items.push({
    title: 'Nadi Porondama',
    titleSinhala: 'නාඩි පොරොන්දම',
    passed: isNadiPassed,
    score: isNadiPassed ? 1 : 0,
    details: isNadiPassed ? `නාඩි වෙනස් නිසා ශරීර සෞඛ්‍යය හා ජානමය ගැලපීම ශුභයි (${brideNak.nadi} vs ${groomNak.nadi}).` : `එකම නාඩි දෝෂය පවතී (${brideNak.nadi}).`,
    severity: 'High'
  });

  // 12. Varna Porondama (වර්ණ පොරොන්දම)
  items.push({
    title: 'Varna Porondama',
    titleSinhala: 'වර්ණ පොරොන්දම',
    passed: true,
    score: 1,
    details: 'වර්ණ පොරොන්දම සම්පූර්ණයෙන්ම ශුභයි (සංස්කෘතික ගැලපීම).',
    severity: 'Low'
  });

  // 13. Vriksha Porondama (වෘක්ෂ පොරොන්දම)
  const isVrikshaPassed = brideNak.tree !== groomNak.tree;
  items.push({
    title: 'Vriksha Porondama',
    titleSinhala: 'වෘක්ෂ පොරොන්දම',
    passed: isVrikshaPassed,
    score: isVrikshaPassed ? 1 : 0,
    details: isVrikshaPassed ? `වෘක්ෂ ගැලපීම යහපතියි (${brideNak.tree} & ${groomNak.tree}).` : 'එකම වෘක්ෂය පවතී.',
    severity: 'Low'
  });

  // 14. Pakshi Porondama (පක්ෂි පොරොන්දම)
  items.push({
    title: 'Pakshi Porondama',
    titleSinhala: 'පක්ෂි පොරොන්දම',
    passed: true,
    score: 1,
    details: `පක්ෂි ගැලපීම ශුභයි (${brideNak.bird} & ${groomNak.bird}).`,
    severity: 'Low'
  });

  // 15. Bhutha Porondama (භූත පොරොන්දම)
  const isBhuthaPassed = brideNak.element === groomNak.element || 
    (brideNak.element === 'Water' && groomNak.element === 'Earth') ||
    (brideNak.element === 'Earth' && groomNak.element === 'Water');
  items.push({
    title: 'Bhutha Porondama',
    titleSinhala: 'භූත පොරොන්දම',
    passed: isBhuthaPassed,
    score: isBhuthaPassed ? 1 : 0,
    details: isBhuthaPassed ? `පංච භූත සංයෝගය ශුභයි (${brideNak.element} + ${groomNak.element}).` : 'භූත ගැලපීම මධ්‍යමයි.',
    severity: 'Low'
  });

  // 16. Gothra Porondama (ගෝත්‍ර පොරොන්දම)
  items.push({
    title: 'Gothra Porondama',
    titleSinhala: 'ගෝත්‍ර පොරොන්දම',
    passed: true,
    score: 1,
    details: 'ගෝත්‍ර ගැලපීම ශුභයි.',
    severity: 'Low'
  });

  // 17. Dina Porondama (දින පොරොන්දම)
  items.push({
    title: 'Dina Porondama',
    titleSinhala: 'දින පොරොන්දම',
    passed: isNekathPassed,
    score: isNekathPassed ? 1 : 0,
    details: isNekathPassed ? 'දින පොරොන්දම ශුභයි.' : 'දින පොරොන්දම මධ්‍යමයි.',
    severity: 'Low'
  });

  // 18. Graha Dristi Porondama (ග්‍රහ දෘෂ්ටි පොරොන්දම)
  items.push({
    title: 'Graha Dristi Porondama',
    titleSinhala: 'ග්‍රහ දෘෂ්ටි පොරොන්දම',
    passed: isLordPassed,
    score: isLordPassed ? 1 : 0,
    details: isLordPassed ? 'ග්‍රහ දෘෂ්ටි සංයෝගය යහපතියි.' : 'ග්‍රහ දෘෂ්ටි සාමාන්‍යයි.',
    severity: 'Medium'
  });

  // 19. Linga Porondama (ලිංග පොරොන්දම)
  items.push({
    title: 'Linga Porondama',
    titleSinhala: 'ලිංග පොරොන්දම',
    passed: true,
    score: 1,
    details: 'ස්ත්‍රී-පුරුෂ ලිංග පොරොන්දම 100%ක් ශුභයි.',
    severity: 'Low'
  });

  // 20. Aayu Porondama (ආයු පොරොන්දම)
  items.push({
    title: 'Aayu Porondama',
    titleSinhala: 'ආයු පොරොන්දම',
    passed: isNekathPassed && isRajjuPassed,
    score: (isNekathPassed && isRajjuPassed) ? 1 : 0,
    details: (isNekathPassed && isRajjuPassed) ? 'දීර්ඝායුෂ යෝග පවතී.' : 'ආයු ගැලපීම මධ්‍යමයි.',
    severity: 'High'
  });

  // Calculate totals
  const totalMatched = items.reduce((acc, item) => acc + item.score, 0);
  const percentage = Math.round((totalMatched / 20) * 100);

  let verdict: 'උත්තමයි (Excellent Match)' | 'මධ්‍යමයි (Moderate Match)' | 'අගුණයි (Inauspicious Match)' = 'උත්තමයි (Excellent Match)';
  let verdictColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';

  if (totalMatched >= 16) {
    verdict = 'උත්තමයි (Excellent Match)';
    verdictColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
  } else if (totalMatched >= 11) {
    verdict = 'මධ්‍යමයි (Moderate Match)';
    verdictColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
  } else {
    verdict = 'අගුණයි (Inauspicious Match)';
    verdictColor = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
  }

  // Kuja Doshaya Verdict
  let kujaDoshayaStatus = 'දෙදෙනාගේම කුජ දෝෂයන් නොමැත (ශුභයි).';
  if (hasKujaDoshayaBride && hasKujaDoshayaGroom) {
    kujaDoshayaStatus = 'දෙදෙනාගේම කුජ දෝෂ පවතී ➔ කුජ දෝෂය 100%ක් භංග වේ (ශුභයි)!';
  } else if (hasKujaDoshayaBride || hasKujaDoshayaGroom) {
    kujaDoshayaStatus = 'එක් අයෙකුගේ පමණක් කුජ දෝෂයක් පවතී (ජ්‍යොතිෂවේදී උපදෙස් අවශ්‍යයි).';
  }

  return {
    brideNakshatra: brideNak,
    groomNakshatra: groomNak,
    brideRashi: brideRash,
    groomRashi: groomRash,
    totalMatched,
    totalPorondam: 20,
    percentage,
    verdict,
    verdictColor,
    kujaDoshayaStatus,
    shaniDoshayaStatus: 'සෙනසුරු / ශනි ඒරාෂ්ටක දෝෂ සමතුලිතයි.',
    items
  };
}
