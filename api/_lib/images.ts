const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

interface NicheImageSet {
  hero: string[];
  services: string[];
  about: string[];
  team: string[];
  general: string[];
}

const NICHE_IMAGES: Record<string, NicheImageSet> = {
  'coffee shop': {
    hero: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&q=80',
    ],
  },
  'architecture studio': {
    hero: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
    ],
  },
  'gym': {
    hero: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop&q=80',
    ],
  },
  'restaurant': {
    hero: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1577219491135-ce39873a4f9f?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1583394293214-28ez69cee2a8?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526738682237-0f7c2a3c6de0?w=600&h=400&fit=crop&q=80',
    ],
  },
  'ai startup': {
    hero: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1531746790095-e5995f60f3b3?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=400&fit=crop&q=80',
    ],
  },
  'interior design': {
    hero: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1616137466211-f736a1f2b4a0?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop&q=80',
    ],
  },
  'fashion brand': {
    hero: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
    ],
  },
  'photography studio': {
    hero: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505739998589-00fc7916d733?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop&q=80',
    ],
  },
  'law firm': {
    hero: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
    ],
  },
  'medical': {
    hero: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop&q=80',
    ],
  },
  'default': {
    hero: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=800&fit=crop&q=80',
    ],
    services: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
    ],
    about: ['https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop&q=80'],
    team: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    ],
    general: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
    ],
  },
};

function pick(arr: string[], index: number): string {
  return arr[index % arr.length];
}

export async function fetchNicheImages(
  niche: string,
  description: string,
  sectionKeys: string[]
): Promise<Record<string, string>> {
  const nicheKey = findNicheKey(niche);
  const images = NICHE_IMAGES[nicheKey] || NICHE_IMAGES['coffee shop'];
  const result: Record<string, string> = {};

  // Hero image
  result['hero'] = pick(images.hero, 0);

  // Per-item images for list sections
  // service-0..3
  for (let i = 0; i < 4; i++) {
    result[`service-${i}`] = pick(images.services, i);
  }
  // work-0..3 (portfolio/projects)
  for (let i = 0; i < 4; i++) {
    result[`work-${i}`] = pick(images.services, i);
  }
  // product-0..3 (commerce)
  for (let i = 0; i < 4; i++) {
    result[`product-${i}`] = pick(images.services, i);
  }
  // trainer-0..2 / team-0..2
  for (let i = 0; i < 3; i++) {
    result[`trainer-${i}`] = pick(images.team, i);
    result[`team-${i}`] = pick(images.team, i);
  }
  // about
  result['about'] = pick(images.about, 0);
  // story (local-table uses this)
  result['story'] = pick(images.services, 0);
  // contact
  result['contact'] = pick(images.general, 0);
  // location
  result['location'] = pick(images.general, 1);
  // general fallbacks
  for (let i = 0; i < 4; i++) {
    result[`general-${i}`] = pick(images.general, i);
  }

  // If Unsplash API key available, try to fetch better images
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const query = encodeURIComponent(`${niche} ${description.slice(0, 80)}`);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=10&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
      );
      if (res.ok) {
        const data = (await res.json()) as { results: { urls: { regular: string } }[] };
        const results = data.results || [];
        if (results[0]) result['hero'] = results[0].urls.regular;
        if (results[1]) result['about'] = results[1].urls.regular;
        for (let i = 0; i < Math.min(results.length - 2, 8); i++) {
          const key = i < 4 ? `service-${i}` : `work-${i - 4}`;
          if (results[i + 2]) result[key] = results[i + 2].urls.regular;
        }
      }
    } catch {
      // Ignore Unsplash API errors, use curated images
    }
  }

  return result;
}

function findNicheKey(niche: string): string {
  const lower = niche.toLowerCase();
  const nicheKeywords: Record<string, string[]> = {
    'coffee shop': ['coffee', 'cafe', 'espresso', 'roast', 'brew'],
    'architecture studio': ['architecture', 'architect', 'building', 'structural'],
    'gym': ['gym', 'fitness', 'strength', 'training', 'workout'],
    'restaurant': ['restaurant', 'dining', 'food', 'cuisine', 'chef'],
    'ai startup': ['ai', 'startup', 'machine learning', 'ml', 'tech', 'saas'],
    'interior design': ['interior', 'decor', 'furnishing', 'design studio'],
    'fashion brand': ['fashion', 'clothing', 'apparel', 'wear', 'boutique'],
    'photography studio': ['photo', 'photography', 'camera', 'portrait', 'shoot'],
    'law firm': ['law', 'legal', 'attorney', 'lawyer', 'litigation', 'advocate'],
    'medical': ['medical', 'health', 'clinic', 'doctor', 'hospital', 'dental'],
  };

  for (const [key, keywords] of Object.entries(nicheKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) return key;
  }
  return 'default';
}
