import { Topic, Badge, TeacherStudentSummary } from '../types';

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 'photosynthesis',
    title: 'Photosynthesis',
    category: 'Biology',
    difficulty: 'Beginner',
    mastery: 72,
    description: 'How plants transform sunshine, air, and water into sweet glucose energy and the oxygen we breathe.',
    age5Prompt: 'Pretend Bolt is a 5-year-old robot who thinks plants go grocery shopping at night. Explain how plants actually make their own food!',
    starterPrompt: 'Plants don’t eat sandwiches like us. They use sunlight, carbon dioxide from the air, and water from the soil to make sugar.',
    boltGreeting: "Hi teacher! *waves metal hand* I found a houseplant on the windowsill. Do I need to feed it pizza, or does it drink sunbeam juice? How does it make food?",
    hints: [
      "Hint 1: Name the 3 key ingredients the plant collects (from the sky, the sun, and the ground).",
      "Hint 2: Explain what chlorophyll is and why leaves are green solar panels.",
      "Hint 3: Mention the two outputs: what does the plant keep (sugar/glucose) and what does it gift to us (oxygen)?"
    ],
    quickPrompts: [
      "Explain the 3 ingredients: sunlight, water, and carbon dioxide",
      "Explain what chlorophyll does inside the green leaf cells",
      "Explain where the oxygen comes from and why plants release it",
      "Explain how plants store glucose for nighttime energy"
    ],
    concepts: [
      {
        id: 'photo_inputs',
        name: 'The 3 Raw Ingredients',
        shortDesc: 'Sunlight (energy), Water (H2O), and Carbon Dioxide (CO2)',
        requiredKeywords: ['sun', 'light', 'water', 'carbon', 'co2', 'air', 'soil', 'roots'],
        misconception: 'Believing plants absorb "food" directly from dirt or soil fertilizer rather than making it from air and light.',
        revision: {
          intuition: 'Dirt provides minerals, but 95% of a plant’s dry weight comes from thin air! Plants literally assemble wood and leaves out of carbon dioxide gas.',
          analogy: 'Imagine baking bread: soil is the salt in the dough, but air and water are the flour and liquid, and sunlight is the baking oven.',
          keyTakeaway: 'Inputs = 6 CO₂ + 6 H₂O + Solar Energy.',
          quickTestQuestion: 'If a giant tree gains 200 pounds, where did most of that mass come from? (Hint: Not the ground!)'
        }
      },
      {
        id: 'photo_chlorophyll',
        name: 'Chlorophyll & Solar Absorption',
        shortDesc: 'Green pigment that captures light photons in chloroplasts',
        requiredKeywords: ['chlorophyll', 'pigment', 'green', 'absorb', 'chloroplast', 'trap', 'solar'],
        misconception: 'Thinking chlorophyll IS the plant’s food or that leaves turn green because they reflect green light while absorbing blue and red.',
        revision: {
          intuition: 'Chlorophyll is a light antenna. It absorbs red and blue wavelengths to excite electrons, and bounces away green light (which is why our eyes see green!).',
          analogy: 'Like a solar panel on a rooftop that powers a blender.',
          keyTakeaway: 'Chlorophyll does not feed the plant; it harvests photon energy to split water.',
          quickTestQuestion: 'Why would a plant struggle to photosynthesize under a pure green light bulb?'
        }
      },
      {
        id: 'photo_photolysis',
        name: 'Water Splitting & Oxygen Release',
        shortDesc: 'Light splits H2O molecules, releasing oxygen as a byproduct',
        requiredKeywords: ['split', 'oxygen', 'o2', 'hydrogen', 'byproduct', 'release', 'breathe', 'waste'],
        misconception: 'Believing the oxygen released comes from the carbon dioxide (CO2) molecule instead of water (H2O).',
        revision: {
          intuition: 'Plants crack water apart to steal its hydrogen electrons. The leftover oxygen is tossed out as "waste"—which animals desperately need!',
          analogy: 'Unwrapping a candy bar and throwing away the shiny wrapper. To the plant, oxygen is just the wrapper.',
          keyTakeaway: 'Oxygen gas comes entirely from cracked water (H2O) molecules, not CO2.',
          quickTestQuestion: 'Where does the oxygen bubble you see coming off underwater pondweeds come from: water or CO2?'
        }
      },
      {
        id: 'photo_glucose',
        name: 'Glucose & Energy Storage',
        shortDesc: 'Carbon fixation produces sugar (C6H12O6) for growth and cellular energy',
        requiredKeywords: ['glucose', 'sugar', 'energy', 'store', 'growth', 'food', 'starch'],
        misconception: 'Thinking plants only use photosynthesis to help humans breathe, forgetting plants need the sugar for themselves to survive the night.',
        revision: {
          intuition: 'Plants make glucose for their own survival. At night, they burn this sugar through cellular respiration just like we do.',
          analogy: 'Packing energy snack bars into a backpack for a winter hike.',
          keyTakeaway: 'Outputs = Glucose (food for plant) + Oxygen (byproduct for us).',
          quickTestQuestion: 'What does a plant do for energy during a 14-hour dark winter night?'
        }
      }
    ],
    scriptedTurns: [
      {
        triggerKeywords: ['water', 'sun', 'carbon', 'air'],
        boltResponse: "Wait wait! *eyes widen curiously* So leaves suck in air and drink water through their roots? But why does the sun matter? Is the plant just sunbathing, or does light actually DO something to the water?",
        expression: 'curious',
        understandingDelta: 18,
        unlockedConceptIds: ['photo_inputs']
      },
      {
        triggerKeywords: ['chlorophyll', 'green', 'absorb'],
        boltResponse: "Aha! *head tilts with an antenna wiggle* Chlorophyll! Is that like green food coloring or a magic solar sponge? How does it catch the sunlight without burning up?",
        expression: 'thinking',
        understandingDelta: 20,
        unlockedConceptIds: ['photo_chlorophyll']
      },
      {
        triggerKeywords: ['split', 'oxygen', 'h2o', 'hydrogen'],
        boltResponse: "WHOA! *star eyes sparkle* My CPU is spinning! You're telling me the plant actually CRACKS water molecules in half with light beams?! And the oxygen we breathe is basically the plant’s leftover trash?! Mind = blown!",
        expression: 'mind-blown',
        understandingDelta: 24,
        unlockedConceptIds: ['photo_photolysis']
      },
      {
        triggerKeywords: ['glucose', 'sugar', 'food', 'energy', 'starch'],
        boltResponse: "So it makes sweet sugar! *happy bouncing cheer* Now I get it! The plant cooks its own candy using air, water, and sun rays, stores it in its stems, and gives us fresh air as a thank-you gift! Teacher, my battery is glowing at 100%!",
        expression: 'happy',
        understandingDelta: 25,
        unlockedConceptIds: ['photo_glucose']
      }
    ]
  },
  {
    id: 'newton-laws',
    title: "Newton's Laws of Motion",
    category: 'Physics',
    difficulty: 'Intermediate',
    mastery: 58,
    description: 'Inertia, F=ma, and equal & opposite reactions: the 3 foundational rules governing every moving object in the cosmos.',
    age5Prompt: 'Explain Newton’s laws as if Bolt is 5 years old and playing with toy bumper cars and slippery ice slides.',
    starterPrompt: 'Newton discovered three rules: things are lazy and want to keep doing what they are doing, pushing harder makes things zoom faster, and every push pushes back.',
    boltGreeting: "Beep boop! *drops a metal wrench on the floor* Teacher, why didn't that wrench float in circles? And if I push against my charging dock, why does my seat slide backwards instead?",
    hints: [
      "Hint 1: Explain the 1st Law (Inertia) — why a hockey puck on ice keeps gliding until friction stops it.",
      "Hint 2: Explain the 2nd Law (Force = mass × acceleration) — why pushing a shopping cart is easier than pushing a bulldozer.",
      "Hint 3: Explain the 3rd Law (Action-Reaction) — how rocket thrusters or skateboard jumps work."
    ],
    quickPrompts: [
      "Explain the 1st Law of Inertia with an astronaut in space",
      "Explain why pushing an elephant requires more force than pushing a toy car (F=ma)",
      "Explain the 3rd Law: action and reaction on a skateboard",
      "Explain why we wear seatbelts in a car that brakes suddenly"
    ],
    concepts: [
      {
        id: 'newton_inertia',
        name: '1st Law: Inertia & Resting State',
        shortDesc: 'Objects resist changes to their velocity unless acted on by a net external force',
        requiredKeywords: ['inertia', 'rest', 'motion', 'friction', 'constant', 'net force', 'resist', 'seatbelt'],
        misconception: 'Believing objects naturally slow down on their own (forgetting invisible friction and air resistance).',
        revision: {
          intuition: 'Things don’t need a continuous force to keep moving! In deep space, an apple thrown once will zoom forever at the exact same speed.',
          analogy: 'Imagine a cosmic bowling ball floating in deep vacuum: nothing slows it down because there is no air or floor.',
          keyTakeaway: 'Constant velocity requires ZERO net force; changing velocity requires an unbalanced force.',
          quickTestQuestion: 'When a bus slams on its brakes, why do standing passengers stumble forward?'
        }
      },
      {
        id: 'newton_fma',
        name: '2nd Law: Force, Mass & Acceleration',
        shortDesc: 'F = m · a (acceleration is proportional to net force and inversely proportional to mass)',
        requiredKeywords: ['force', 'mass', 'acceleration', 'f=ma', 'heavy', 'speed up', 'proportional'],
        misconception: 'Thinking heavier objects fall faster in a vacuum or confusing mass with weight.',
        revision: {
          intuition: 'Heavier stuff is harder to nudge. If you want a 10× heavier rock to speed up at the same rate, you have to push 10× harder.',
          analogy: 'Kicking a ping-pong ball vs kicking a concrete cinder block with the exact same kick force.',
          keyTakeaway: 'Acceleration = Net Force ÷ Mass.',
          quickTestQuestion: 'If you push two toy carts with identical force, but cart B has a brick inside, which accelerates faster?'
        }
      },
      {
        id: 'newton_action_reaction',
        name: '3rd Law: Action & Equal Reaction',
        shortDesc: 'Forces always come in matched, opposite pairs acting on different bodies',
        requiredKeywords: ['action', 'reaction', 'equal', 'opposite', 'pair', 'push back', 'rocket', 'recoil'],
        misconception: 'Thinking action and reaction forces cancel each other out (they act on DIFFERENT objects!).',
        revision: {
          intuition: 'You can never push something without it pushing right back on your hand with identical strength.',
          analogy: 'Stepping off a small canoe onto a dock: you push the boat backward to launch your body forward.',
          keyTakeaway: 'Force on A by B = - Force on B by A.',
          quickTestQuestion: 'When a rocket blasts gas downward, what pushes the rocket upward into outer space where there is no air?'
        }
      }
    ],
    scriptedTurns: [
      {
        triggerKeywords: ['inertia', 'keep moving', 'rest', 'friction', 'slide'],
        boltResponse: "Wait! *eyes tilt sideways* You mean if I threw a baseball in outer space where there is no air, it wouldn't get tired and stop? It would literally fly forever until it hits an asteroid?!",
        expression: 'curious',
        understandingDelta: 22,
        unlockedConceptIds: ['newton_inertia']
      },
      {
        triggerKeywords: ['mass', 'force', 'acceleration', 'heavy', 'f=ma'],
        boltResponse: "Ohhh! So the heavier my metal chassis is, the stronger motor I need to accelerate! Double the mass means I need double the push! *gears hum happily*",
        expression: 'thinking',
        understandingDelta: 24,
        unlockedConceptIds: ['newton_fma']
      },
      {
        triggerKeywords: ['equal', 'opposite', 'reaction', 'push back', 'rocket'],
        boltResponse: "WHOA! *star eyes flash* So when my thruster blasts exhaust gas out the back, the gas pushes ME forward with the exact same power?! It’s like high-fiving the universe and bouncing away!",
        expression: 'mind-blown',
        understandingDelta: 25,
        unlockedConceptIds: ['newton_action_reaction']
      }
    ]
  },
  {
    id: 'how-the-internet-works',
    title: 'How the Internet Works',
    category: 'Technology',
    difficulty: 'Intermediate',
    mastery: 45,
    description: 'Demystifying packets, IP addresses, routers, DNS, and undersea fiber cables that link billions of devices in milliseconds.',
    age5Prompt: 'Explain the internet to Bolt as if every photo you send is chopped into puzzle pieces and delivered by pigeons with street addresses.',
    starterPrompt: 'The internet is a giant web of connected computers talking through wires. When you send a picture, it gets sliced into tiny packets with digital address labels.',
    boltGreeting: "Hey teacher! *holds up a smartphone* When I tap 'send cat video', does an invisible wire reach up to the clouds, or is there a tiny messenger gnome running through the floor? How does data travel?",
    hints: [
      "Hint 1: Explain IP addresses like phone numbers or street addresses for computers.",
      "Hint 2: Explain packet switching — why big files are broken into tiny chunks instead of sent in one big chunk.",
      "Hint 3: Explain DNS (the domain name system) like the internet's contacts directory."
    ],
    quickPrompts: [
      "Explain IP addresses and why every device needs a number",
      "Explain packets and how files are sliced into numbered envelopes",
      "Explain DNS: how 'youtube.com' turns into computer coordinates",
      "Explain how routers guide data through fiberoptic glass cables"
    ],
    concepts: [
      {
        id: 'net_ip_addresses',
        name: 'IP Addresses & Addressing',
        shortDesc: 'Every connected device has a unique numerical identifier',
        requiredKeywords: ['ip', 'address', 'number', 'unique', 'identify', 'destination', 'device'],
        misconception: 'Thinking URLs like "google.com" are the actual hardware addresses of web servers.',
        revision: {
          intuition: 'Just like houses have postal street addresses, every computer on Earth has an IP address so data knows where to land.',
          analogy: 'Your home phone number: anyone on Earth can dial your specific handset.',
          keyTakeaway: 'IP addresses route packets to the exact machine worldwide.',
          quickTestQuestion: 'What would happen if two laptops shared the exact same public IP address on the open web?'
        }
      },
      {
        id: 'net_packets',
        name: 'Packet Slicing & Assembly',
        shortDesc: 'Files are segmented into discrete packets with header metadata and reassembled',
        requiredKeywords: ['packet', 'slice', 'chunk', 'reassemble', 'header', 'order', 'piece'],
        misconception: 'Believing videos stream as one giant continuous file that blocks other users on the wire.',
        revision: {
          intuition: 'If you sent a 1GB movie in one piece, one hiccup would ruin the whole transfer. By slicing it into 1,000s of numbered packets, lost pieces can be resent instantly!',
          analogy: 'Mailing a 1,000-piece jigsaw puzzle in 1,000 small envelopes with sequence numbers.',
          keyTakeaway: 'Packets travel independent routes and reassemble at the target.',
          quickTestQuestion: 'Why does your video still play if packet #42 arrives slightly late?'
        }
      },
      {
        id: 'net_routers_dns',
        name: 'DNS & Router Forwarding',
        shortDesc: 'DNS resolves human names to IPs; routers hop packets across networks',
        requiredKeywords: ['dns', 'router', 'phonebook', 'cable', 'fiber', 'hop', 'translate', 'route'],
        misconception: 'Thinking Wi-Fi connects directly to satellite dishes in space for all regular browsing.',
        revision: {
          intuition: 'DNS is the internet’s contact book. Routers are digital postal sorting centers, forwarding packets along the fastest glass fiber cables.',
          analogy: 'Asking the front desk directory for room number 402, then hallway signs pointing you there.',
          keyTakeaway: 'DNS maps names to numbers; routers choose optimal physical hops.',
          quickTestQuestion: 'Why do deep-sea glass cables carry 99% of international web traffic rather than satellites?'
        }
      }
    ],
    scriptedTurns: [
      {
        triggerKeywords: ['ip', 'address', 'phonebook', 'number'],
        boltResponse: "Wait! So my robot brain has a unique digital street address?! *eyes widen* And when you message me, your computer writes my IP number on the envelope?!",
        expression: 'curious',
        understandingDelta: 22,
        unlockedConceptIds: ['net_ip_addresses']
      },
      {
        triggerKeywords: ['packet', 'slice', 'envelope', 'pieces', 'puzzle'],
        boltResponse: "Whooooaaa! *giggles with whirring antenna* You chop the photo into thousands of tiny puzzle pieces called packets?! What if packet #5 gets lost in traffic?! Does the computer ask for a do-over?",
        expression: 'happy',
        understandingDelta: 24,
        unlockedConceptIds: ['net_packets']
      },
      {
        triggerKeywords: ['dns', 'router', 'cable', 'fiber', 'glass', 'light'],
        boltResponse: "MIND BLOWN! *flashes cosmic starry eyes* Lasers shooting pulses of light through glass threads under the ocean floor, guided by routers at the speed of light?! That sounds like pure sci-fi magic, teacher!",
        expression: 'mind-blown',
        understandingDelta: 26,
        unlockedConceptIds: ['net_routers_dns']
      }
    ]
  },
  {
    id: 'fractions-and-decimals',
    title: 'Fractions & Proportions',
    category: 'Mathematics',
    difficulty: 'Beginner',
    mastery: 88,
    description: 'Mastering numerators, denominators, equivalent parts, and decimal conversions with pizza slices and chocolate bars.',
    age5Prompt: 'Explain fractions to Bolt using a birthday cake that 4 hungry friends want to share equally.',
    starterPrompt: 'A fraction is just a fair way to share something whole. The bottom number tells how many equal slices, and the top tells how many you get.',
    boltGreeting: "Hi teacher! *stares at a pizza box* If I cut this pizza into 8 slices, and I eat 4 slices... do I have more pizza than if I cut it into 2 giant halves and eat 1? My math chips are smoking!",
    hints: [
      "Hint 1: Explain the denominator as the total number of equal slices.",
      "Hint 2: Explain the numerator as the count of slices chosen.",
      "Hint 3: Explain why 4/8 is exactly the same quantity as 1/2."
    ],
    quickPrompts: [
      "Explain numerator vs denominator with a pizza pie",
      "Explain why 1/2 is equal to 4/8 and 50%",
      "Explain what happens when the denominator gets bigger",
      "Explain how to add fractions with common denominators"
    ],
    concepts: [
      {
        id: 'frac_parts',
        name: 'Numerator vs Denominator',
        shortDesc: 'Denominator defines unit partition size; numerator counts units',
        requiredKeywords: ['numerator', 'denominator', 'total', 'slice', 'part', 'whole', 'equal', 'bottom', 'top'],
        misconception: 'Believing larger numbers in the denominator mean bigger pieces (e.g., thinking 1/8 is bigger than 1/4).',
        revision: {
          intuition: 'The bigger the denominator, the MORE cuts you made—so each individual slice gets TINIER!',
          analogy: 'Sharing a pizza with 100 people vs sharing with 2 people. Which slice would you rather have?',
          keyTakeaway: 'Top = Slices in hand. Bottom = Slices in the whole pie.',
          quickTestQuestion: 'Would you rather have 1/3 of a chocolate bar or 1/10 of the same chocolate bar?'
        }
      },
      {
        id: 'frac_equivalence',
        name: 'Equivalence & Proportions',
        shortDesc: 'Scaling numerator and denominator equally preserves relative value',
        requiredKeywords: ['equivalent', 'same', 'half', 'equal', 'convert', 'percent', 'double', 'scale'],
        misconception: 'Adding straight across numerators and denominators (e.g., thinking 1/2 + 1/2 = 2/4).',
        revision: {
          intuition: '4 eighths is just 1 half cut into more pieces. You still have half the pizza on your plate!',
          analogy: 'Two 50-cent coins have the exact same spending power as one single dollar bill.',
          keyTakeaway: 'Multiplying top and bottom by the same number keeps the total amount identical.',
          quickTestQuestion: 'How many 1/6 slices do you need to equal 1/2 of a pie?'
        }
      }
    ],
    scriptedTurns: [
      {
        triggerKeywords: ['denominator', 'bottom', 'slices', 'total', 'cuts'],
        boltResponse: "OH! *claps metal hands* So the bottom number tells me how many cuts I made with the pizza knife! If I cut it 100 times, each slice is like a toothpick!",
        expression: 'happy',
        understandingDelta: 26,
        unlockedConceptIds: ['frac_parts']
      },
      {
        triggerKeywords: ['equivalent', 'same', 'half', 'equal', '4/8', '1/2'],
        boltResponse: "Eureka! *head spins with joy* Eating 4 slices out of 8 is the EXACT SAME tummy fullness as eating 1 slice out of 2! Fractions are just secret disguises for the same amount!",
        expression: 'mind-blown',
        understandingDelta: 26,
        unlockedConceptIds: ['frac_equivalence']
      }
    ]
  },
  {
    id: 'water-cycle',
    title: 'The Water Cycle',
    category: 'Earth Science',
    difficulty: 'Beginner',
    mastery: 82,
    description: 'Evaporation, condensation, precipitation, and collection: the eternal recycling machine that powers Earth’s weather.',
    age5Prompt: 'Explain where raindrops come from and why puddles disappear on sunny afternoons to 5-year-old Bolt.',
    starterPrompt: 'Earth has had the exact same water for billions of years! Water evaporates into invisible steam, bunches into clouds, falls as rain, and returns to rivers.',
    boltGreeting: "Beep! *looks out the window at rain* Teacher, where does all this sky water come from? Is there a giant leaky bathtub up in outer space, or did yesterday's puddle climb up there?",
    hints: [
      "Hint 1: Explain evaporation — how the warm sun turns liquid water into invisible gas (vapor).",
      "Hint 2: Explain condensation — how cold air makes vapor clump together into fluffy clouds.",
      "Hint 3: Explain precipitation and why dinosaur water is what we drink today!"
    ],
    quickPrompts: [
      "Explain evaporation and why puddles vanish in the sun",
      "Explain condensation and how clouds are born from water vapor",
      "Explain precipitation (rain/snow) and collection in rivers",
      "Explain why the water you drink is the same water dinosaurs drank"
    ],
    concepts: [
      {
        id: 'water_evap',
        name: 'Evaporation & Thermal Energy',
        shortDesc: 'Solar heat energizes water molecules into airborne vapor',
        requiredKeywords: ['evaporate', 'evaporation', 'sun', 'heat', 'steam', 'vapor', 'gas', 'rise'],
        misconception: 'Thinking evaporated water disappears from existence or gets destroyed.',
        revision: {
          intuition: 'Water molecules never vanish; they just speed up and spread apart into an invisible gas called water vapor.',
          analogy: 'Popcorn popping and flying into the air, or boiling water in a kettle.',
          keyTakeaway: 'Heat energy drives liquid to gas phase change.',
          quickTestQuestion: 'Why does wet laundry dry faster on a breezy sunny day than on a cold cloudy day?'
        }
      },
      {
        id: 'water_condens',
        name: 'Condensation & Cloud Formation',
        shortDesc: 'Cooling aloft forces vapor to condense onto aerosols into droplets',
        requiredKeywords: ['condensation', 'condense', 'cloud', 'cold', 'cool', 'droplet', 'fog'],
        misconception: 'Believing clouds are made of gas/vapor (clouds are liquid water droplets or ice crystals!).',
        revision: {
          intuition: 'As warm vapor rises high into the freezing sky, it chills and bunches together into trillions of tiny liquid floating droplets.',
          analogy: 'Fogging up a cold bathroom mirror with your warm breath.',
          keyTakeaway: 'Cooling gas condenses into liquid droplets to form clouds.',
          quickTestQuestion: 'Why do cold soda cans get wet on the outside during hot summer days?'
        }
      },
      {
        id: 'water_precip',
        name: 'Precipitation & Global Cycle',
        shortDesc: 'Heavy droplets fall as rain/snow and cycle back through oceans',
        requiredKeywords: ['precipitation', 'rain', 'snow', 'fall', 'heavy', 'cycle', 'river', 'ocean'],
        misconception: 'Thinking new water is constantly manufactured on Earth.',
        revision: {
          intuition: 'Every drop of water on Earth today is about 4.5 billion years old. You are drinking the exact same water molecules that T-Rex once drank!',
          analogy: 'The ultimate cosmic merry-go-round that never runs out of tickets.',
          keyTakeaway: 'Earth is a closed recycling loop powered by solar heat and gravity.',
          quickTestQuestion: 'Where will the rain that falls on your rooftop end up in 6 months?'
        }
      }
    ],
    scriptedTurns: [
      {
        triggerKeywords: ['evaporate', 'sun', 'heat', 'vapor', 'steam'],
        boltResponse: "Whoa! *eyes widen in amazement* So the sunbeams tickle the puddle molecules until they float up like tiny invisible flying dancers?! They don't disappear, they just become gas?!",
        expression: 'curious',
        understandingDelta: 24,
        unlockedConceptIds: ['water_evap']
      },
      {
        triggerKeywords: ['cloud', 'condense', 'cold', 'droplet', 'mirror'],
        boltResponse: "And when they get high and chilly, they huddle together like cold penguins to make a cloud?! *happy head nod* That's like when you breathe on cold glass!",
        expression: 'happy',
        understandingDelta: 24,
        unlockedConceptIds: ['water_condens']
      },
      {
        triggerKeywords: ['rain', 'heavy', 'dinosaur', 'cycle', 'precipitation'],
        boltResponse: "NO WAY! *antenna vibrates with golden sparks* You're telling me I might be drinking water that a T-Rex splashed in 65 million years ago?! My circuits can barely handle how awesome Earth's recycling engine is!",
        expression: 'mind-blown',
        understandingDelta: 26,
        unlockedConceptIds: ['water_precip']
      }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-lesson',
    title: 'First Lesson Taught',
    description: 'Taught Bolt your first complete concept and answered his follow-up question.',
    icon: 'GraduationCap',
    category: 'teaching',
    unlocked: true,
    unlockedAt: 'Yesterday'
  },
  {
    id: 'jargon-slayer',
    title: 'Jargon Slayer',
    description: 'Passed the Age 5 Challenge with 0 confusing academic jargon words.',
    icon: 'Sparkles',
    category: 'mastery',
    unlocked: true,
    unlockedAt: '2 days ago'
  },
  {
    id: 'bolt-favorite',
    title: "Bolt's Favorite Teacher",
    description: 'Achieved 90%+ Understanding Meter in a single teaching session.',
    icon: 'HeartHandshake',
    category: 'mastery',
    unlocked: false
  },
  {
    id: 'gap-hunter',
    title: 'Gap Hunter',
    description: 'Reviewed and revised 3 weak concepts using the Knowledge Gap Report cards.',
    icon: 'Target',
    category: 'teaching',
    unlocked: true,
    unlockedAt: 'Today'
  },
  {
    id: 'curiosity-spark',
    title: 'Curiosity Spark',
    description: 'Triggered Bolt into 5 distinct "Mind-Blown" eureka reactions.',
    icon: 'Zap',
    category: 'mastery',
    unlocked: false
  },
  {
    id: 'streak-master',
    title: 'Daily Teaching Streak',
    description: 'Maintained a 5-day consecutive teaching streak without breaking.',
    icon: 'Flame',
    category: 'streak',
    unlocked: true,
    unlockedAt: 'Active streak: 5 days'
  }
];

export const TEACHER_STUDENTS: TeacherStudentSummary[] = [
  {
    id: 's1',
    name: 'Maya Patel',
    avatar: 'MP',
    currentTopic: 'Photosynthesis',
    mastery: 88,
    status: 'Excelling',
    stuckConcept: 'None (Ready for Cellular Respiration)',
    lastActive: '12m ago'
  },
  {
    id: 's2',
    name: 'Leo Zhang',
    avatar: 'LZ',
    currentTopic: 'Photosynthesis',
    mastery: 42,
    status: 'Struggling',
    stuckConcept: 'Water photolysis vs CO2 oxygen origin (78% confused)',
    lastActive: '34m ago'
  },
  {
    id: 's3',
    name: 'Samira Khan',
    avatar: 'SK',
    currentTopic: "Newton's Laws",
    mastery: 54,
    status: 'Struggling',
    stuckConcept: 'Action/Reaction force pairs vs force cancellation',
    lastActive: '1h ago'
  },
  {
    id: 's4',
    name: 'Ethan Brooks',
    avatar: 'EB',
    currentTopic: 'How the Internet Works',
    mastery: 74,
    status: 'On Track',
    stuckConcept: 'Packet loss recovery (TCP handshake nuance)',
    lastActive: '2h ago'
  },
  {
    id: 's5',
    name: 'Chloe Rivera',
    avatar: 'CR',
    currentTopic: 'Fractions & Decimals',
    mastery: 92,
    status: 'Excelling',
    stuckConcept: 'Mastered all benchmark concepts',
    lastActive: '3h ago'
  },
  {
    id: 's6',
    name: 'Marcus Vance',
    avatar: 'MV',
    currentTopic: 'Water Cycle',
    mastery: 65,
    status: 'On Track',
    stuckConcept: 'Condensation thermal energy release',
    lastActive: 'Yesterday'
  }
];

export const CLASS_CONFUSION_HEATMAP = [
  {
    topic: 'Photosynthesis',
    concept: 'Oxygen origin (Split from H2O, not from CO2)',
    confusionRate: 78,
    avgAttempts: 3.4,
    severity: 'High',
    keyMisconception: '78% of students explain that plants "turn carbon dioxide into oxygen", missing that oxygen comes from splitting water.'
  },
  {
    topic: "Newton's Laws",
    concept: 'Action & Reaction acting on different bodies',
    confusionRate: 64,
    avgAttempts: 2.8,
    severity: 'High',
    keyMisconception: 'Students assume action and reaction forces cancel out to zero net force, failing to see they push separate objects.'
  },
  {
    topic: 'How the Internet Works',
    concept: 'DNS resolution vs physical packet routing',
    confusionRate: 52,
    avgAttempts: 2.2,
    severity: 'Medium',
    keyMisconception: 'Confusing the domain name phonebook with the physical fiber cables.'
  },
  {
    topic: 'Fractions',
    concept: 'Inverse denominator magnitude (1/8 vs 1/4)',
    confusionRate: 36,
    avgAttempts: 1.6,
    severity: 'Low',
    keyMisconception: 'Younger students instinctively think 8 is larger than 4, so 1/8 slice must be bigger.'
  },
  {
    topic: 'Water Cycle',
    concept: 'Clouds as liquid droplets vs invisible water gas',
    confusionRate: 48,
    avgAttempts: 2.0,
    severity: 'Medium',
    keyMisconception: 'Students believe visible fluffy clouds are pure steam/gas rather than billions of condensed liquid droplets.'
  }
];
