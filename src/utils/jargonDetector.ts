export interface JargonMatch {
  word: string;
  replacement: string;
  explanation: string;
  index: number;
}

export interface SimplicityAnalysis {
  simplicityScore: number; // 0 to 100 (100 = perfectly ELI5 simple)
  detectedJargon: JargonMatch[];
  syllableCount: number;
  wordCount: number;
  gradeLevelEstimate: string;
  verdict: 'Too Complicated!' | 'Getting Warmer' | 'Kid-Friendly & Clear!' | 'Feynman Master!';
  feedback: string;
}

// Map of common academic/technical jargon words to simpler 5-year-old equivalents
const JARGON_MAP: Record<string, { replacement: string; explanation: string }> = {
  // Photosynthesis & Biology
  photosynthesis: { replacement: 'sunlight-cooking', explanation: 'Too academic! Say "making food using sunshine"' },
  photolysis: { replacement: 'cracking water with light', explanation: 'Bolt thinks you mean cracking an egg!' },
  chlorophyll: { replacement: 'green sun-sponge', explanation: 'Say "green solar catcher" or "green leaf pigment"' },
  chloroplast: { replacement: 'leaf kitchen', explanation: 'Tiny food factories inside the leaf' },
  glucose: { replacement: 'plant sugar', explanation: 'A tasty sweet syrup the plant makes' },
  endothermic: { replacement: 'heat-absorbing', explanation: 'Drinks up heat like a warm soup' },
  stomata: { replacement: 'leaf breathing-pores', explanation: 'Tiny little mouths on the bottom of leaves' },
  transpiration: { replacement: 'plant sweating', explanation: 'When leaves let out extra water vapor' },
  mitochondria: { replacement: 'cell battery', explanation: 'Tiny power stations inside our bodies' },
  organism: { replacement: 'living creature', explanation: 'Any animal, plant or bug' },
  cellular: { replacement: 'tiny-block', explanation: 'Microscopic building blocks' },
  respiration: { replacement: 'breathing for energy', explanation: 'Turning food into go-go fuel' },

  // Physics & Newton
  inertia: { replacement: 'stubbornness of stuff', explanation: 'Things wanting to stay still or keep sliding' },
  acceleration: { replacement: 'speeding up or turning', explanation: 'Getting faster and faster' },
  momentum: { replacement: 'rolling punch', explanation: 'How hard it is to stop a moving boulder' },
  gravitational: { replacement: 'earth-pulling', explanation: 'The invisible pull that drops apples' },
  velocity: { replacement: 'speed and direction', explanation: 'How fast you zoom towards home' },
  friction: { replacement: 'floor-rubbing grip', explanation: 'The sticky rub that slows sliding socks' },
  proportional: { replacement: 'matching in size', explanation: 'When one thing doubles, the other doubles' },
  equilibrium: { replacement: 'perfect balance', explanation: 'Like a seesaw held level' },
  kinetic: { replacement: 'moving', explanation: 'Motion energy, like a rolling bowling ball' },

  // Internet & Tech
  packets: { replacement: 'little digital postcards', explanation: 'Small pieces of a photo sliced up to mail' },
  routers: { replacement: 'digital traffic cops', explanation: 'Gadgets that point data down the quickest road' },
  protocol: { replacement: 'secret rulebook', explanation: 'The polite rules machines use to talk' },
  ip: { replacement: 'internet street address', explanation: 'Every computer’s unique house number' },
  bandwidth: { replacement: 'pipe thickness', explanation: 'How wide the water slide is for data' },
  latency: { replacement: 'waiting delay', explanation: 'How long you wait for a friend to reply' },
  dns: { replacement: 'internet phonebook', explanation: 'Translates google.com into computer numbers' },
  tcp: { replacement: 'checked-delivery mail', explanation: 'Makes sure no puzzle pieces got dropped' },
  fiberoptic: { replacement: 'laser-glass cables', explanation: 'Bouncing light pulses through thin glass threads' },

  // Math & Fractions
  denominator: { replacement: 'total pizza slices', explanation: 'How many equal pieces the pie is cut into' },
  numerator: { replacement: 'slices you get', explanation: 'The slices on your plate right now' },
  reciprocal: { replacement: 'flipped-upside-down fraction', explanation: 'Turning the fraction on its head' },
  proportions: { replacement: 'fair shares', explanation: 'Keeping recipe ratios equal' },

  // Water cycle
  evaporation: { replacement: 'water turning into steam', explanation: 'Puddles vanishing into thin air' },
  condensation: { replacement: 'steam fogging into drops', explanation: 'Like fog on a bathroom mirror' },
  precipitation: { replacement: 'falling rain or snow', explanation: 'Sky water coming down!' },
};

export function analyzeJargonAndSimplicity(text: string): SimplicityAnalysis {
  if (!text || text.trim().length === 0) {
    return {
      simplicityScore: 100,
      detectedJargon: [],
      syllableCount: 0,
      wordCount: 0,
      gradeLevelEstimate: 'Grade 1',
      verdict: 'Kid-Friendly & Clear!',
      feedback: 'Type your explanation to see how Bolt understands it!',
    };
  }

  // Tokenize words
  const words = text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
  const detected: JargonMatch[] = [];

  words.forEach((word) => {
    // Check direct match or stemmed match
    const lookupKey = Object.keys(JARGON_MAP).find((key) => word === key || word.startsWith(key) || key.startsWith(word));
    if (lookupKey && !detected.some((d) => d.word.toLowerCase() === word)) {
      detected.push({
        word,
        replacement: JARGON_MAP[lookupKey].replacement,
        explanation: JARGON_MAP[lookupKey].explanation,
        index: text.toLowerCase().indexOf(word),
      });
    }
  });

  // Calculate simple readability stats
  let complexWordCount = 0;
  let totalSyllables = 0;

  words.forEach((w) => {
    // Approximate syllables by vowel groups
    const syllables = Math.max(1, (w.match(/[aeiouy]{1,2}/g) || []).length);
    totalSyllables += syllables;
    if (syllables >= 3) {
      complexWordCount++;
    }
  });

  const wordCount = words.length;
  // Penalty for jargon matches and multisyllabic words
  const jargonPenalty = detected.length * 18;
  const multisyllablePenalty = (complexWordCount / Math.max(1, wordCount)) * 40;
  const lengthBonus = wordCount > 8 ? Math.min(15, wordCount) : 0;

  let simplicityScore = Math.round(100 - jargonPenalty - multisyllablePenalty + (detected.length === 0 ? lengthBonus : 0));
  simplicityScore = Math.max(12, Math.min(100, simplicityScore));

  let gradeLevelEstimate = 'Grade 1-2';
  let verdict: SimplicityAnalysis['verdict'] = 'Kid-Friendly & Clear!';
  let feedback = 'Bolt loves this! The analogies are super easy to picture.';

  if (simplicityScore >= 88) {
    gradeLevelEstimate = 'Age 5-7 (Kindergarten)';
    verdict = 'Feynman Master!';
    feedback = 'Superb! You explained it so simply that even a baby robot with 2MB memory gets it.';
  } else if (simplicityScore >= 68) {
    gradeLevelEstimate = 'Grade 3-4 (Elementary)';
    verdict = 'Kid-Friendly & Clear!';
    feedback = 'Great job! Very clear. Try swapping any remaining big words for everyday objects.';
  } else if (simplicityScore >= 45) {
    gradeLevelEstimate = 'Grade 8-9 (Middle School)';
    verdict = 'Getting Warmer';
    feedback = 'Bolt looks puzzled. You used a couple of textbook words. Think: How would you show this with toys or food?';
  } else {
    gradeLevelEstimate = 'College / University';
    verdict = 'Too Complicated!';
    feedback = 'Bolt’s antenna is smoking! This sounds like a textbook. Replace technical terms with simple pictures!';
  }

  return {
    simplicityScore,
    detectedJargon: detected,
    syllableCount: totalSyllables,
    wordCount,
    gradeLevelEstimate,
    verdict,
    feedback,
  };
}
