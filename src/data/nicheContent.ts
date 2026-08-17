interface NicheSite {
  brandName: string;
  tagline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface NicheData {
  site: NicheSite;
  sections: Record<string, unknown>;
}

type TemplateNicheMap = Record<string, NicheData>;

function t(id: string, obj: Record<string, unknown>): TemplateNicheMap {
  const map: TemplateNicheMap = {};
  map[id] = obj as unknown as NicheData;
  return map;
}

function merge(...maps: TemplateNicheMap[]): TemplateNicheMap {
  const result: TemplateNicheMap = {};
  for (const m of maps) Object.assign(result, m);
  return result;
}

const coffeeShop: TemplateNicheMap = {
  atelier: {
    site: { brandName: 'Roast & Pour', tagline: 'Crafted coffee, everyday ritual.', description: 'Specialty coffee roasters and cafe serving single-origin beans and handmade pastries in a warm, community-focused space.', ctaPrimary: 'Visit Us', ctaSecondary: 'Our Menu' },
    sections: {
      hero: { title: 'Every cup tells a story.', subtitle: 'Roast & Pour sources single-origin beans from small farms across Ethiopia, Colombia, and Guatemala, then roasts them in-house to bring out flavors you won\'t find anywhere else.' },
      services: { title: 'What We Offer', subtitle: 'More than just coffee.', items: [
        { id: 's1', title: 'Specialty Coffee', description: 'Hand-selected single-origin beans roasted weekly. From pour-over to espresso, every cup is made with precision and care.' },
        { id: 's2', title: 'Fresh Pastries', description: 'Baked daily by our in-house pastry team. Croissants, sourdough, seasonal tarts, and gluten-free options.' },
        { id: 's3', title: 'Coffee Workshops', description: 'Learn the art of latte pour-over, cupping, and home brewing in our weekend masterclasses.' },
        { id: 's4', title: 'Wholesale & Office', description: 'Keep your team caffeinated with our freshly roasted beans delivered weekly to your office or restaurant.' },
      ]},
      work: { title: 'Our Spaces', subtitle: 'Designed for conversation and calm.', items: [
        { id: 'w1', title: 'The Main Bar', category: 'Interior', description: 'A 30-seat space with reclaimed wood counters, exposed brick, and natural light flooding through skylights.' },
        { id: 'w2', title: 'The Roastery', category: 'Production', description: 'Our 15kg Probat roaster sits behind glass where guests can watch the roasting process unfold.' },
        { id: 'w3', title: 'The Garden', category: 'Outdoor', description: 'A shaded courtyard with olive trees, string lights, and seating for 20 — perfect for weekend mornings.' },
        { id: 'w4', title: 'Community Events', category: 'Events', description: 'Monthly cuppings, latte art throwdowns, and collaborations with local artists and musicians.' },
      ]},
      about: { title: 'Our Story', description: 'Roast & Pour started in 2019 as a small pop-up in a converted garage. Founder Maya Chen spent three years working on coffee farms in Central America before bringing her knowledge home. Today, we roast 200kg of specialty coffee a week and serve over 300 customers daily.', values: [
        { id: 'v1', title: 'Direct Trade', description: 'We buy directly from farmers at 40% above fair-trade minimums.' },
        { id: 'v2', title: 'Zero Waste', description: 'Our coffee grounds go to local compost, our cups are compostable, and we donate unsold food daily.' },
      ]},
      testimonial: { title: 'What People Say', items: [{ id: 't1', quote: 'The best coffee in the city, hands down. The atmosphere makes you want to stay for hours.', author: 'Priya Sharma', role: 'Food Blogger' }] },
      contact: { title: 'Come Say Hello', subtitle: 'We\'d love to see you.', email: 'hello@roastandpour.co', phone: '+91 80 4567 8901', address: '42 Church Street, Bengaluru 560001' },
    },
  },
  northline: {
    site: { brandName: 'Roast & Pour', tagline: 'Coffee, managed beautifully.', description: 'A modern coffee shop management platform for ordering, inventory, and customer engagement.', ctaPrimary: 'Start Free', ctaSecondary: 'Watch Demo' },
    sections: {
      hero: { title: 'Run your coffee business from one place.', subtitle: 'Roast & Pour\'s management platform handles orders, inventory, loyalty, and analytics — so you can focus on the craft.', badge: 'New: AI-powered demand forecasting' },
      features: { title: 'Everything you need', subtitle: 'Built by coffee people, for coffee people.', items: [
        { id: 'f1', title: 'Smart Ordering', description: 'POS integration with real-time inventory sync and customizable menu management.', icon: 'coffee' },
        { id: 'f2', title: 'Inventory Tracking', description: 'Track bean stock, milk levels, and pastry counts with automatic reorder alerts.', icon: 'package' },
        { id: 'f3', title: 'Loyalty Program', description: 'Points, stamps, and tier-based rewards that keep your regulars coming back.', icon: 'heart' },
        { id: 'f4', title: 'Analytics Dashboard', description: 'See peak hours, top sellers, waste patterns, and revenue trends at a glance.', icon: 'chart' },
        { id: 'f5', title: 'Staff Scheduling', description: 'AI-optimized shift planning based on foot traffic predictions and staff availability.', icon: 'users' },
        { id: 'f6', title: 'Online Store', description: 'Branded online ordering for beans, merch, and subscription boxes.', icon: 'store' },
      ]},
      statistics: { title: 'By the numbers', items: [
        { id: 'st1', value: '2,400+', label: 'Cafes powered' },
        { id: 'st2', value: '18M', label: 'Orders processed' },
        { id: 'st3', value: '99.9%', label: 'Uptime' },
      ]},
      testimonials: { title: 'Loved by cafe owners', items: [
        { id: 'te1', quote: 'We cut waste by 30% in the first month. The inventory alerts alone pay for the subscription.', author: 'Arjun Mehta', role: 'Owner, Blue Tokai Franchise', company: 'Blue Tokai' },
        { id: 'te2', quote: 'Our loyalty program brought back 40% more repeat customers. Game changer.', author: 'Sarah Lin', role: 'Manager, Filter Coffee Co.', company: 'Filter Coffee' },
      ]},
      pricing: { title: 'Simple pricing', tiers: [
        { id: 'p1', name: 'Starter', price: '₹2,999', period: '/month', description: 'For single-location cafes', features: ['POS integration', 'Basic inventory', 'Loyalty program', 'Email support'] },
        { id: 'p2', name: 'Growth', price: '₹5,999', period: '/month', description: 'For growing chains', features: ['Everything in Starter', 'Advanced analytics', 'Staff scheduling', 'Online store', 'Priority support'] },
        { id: 'p3', name: 'Enterprise', price: 'Custom', period: '', description: 'For large operations', features: ['Everything in Growth', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-site training'] },
      ]},
      cta: { title: 'Ready to brew smarter?', subtitle: 'Start your 14-day free trial. No credit card required.' },
    },
  },
  localTable: {
    site: { brandName: 'Roast & Pour', tagline: 'Crafted coffee, everyday ritual.', description: 'Specialty coffee roasters and cafe serving single-origin beans and handmade pastries.', ctaPrimary: 'Reserve a Table', ctaSecondary: 'View Menu' },
    sections: {
      hero: { title: 'Crafted coffee, everyday ritual.', subtitle: 'Single-origin beans. Fresh pastries. A space built for slow mornings and big ideas.' },
      menu: { title: 'Our Menu', categories: [
        { id: 'mc1', name: 'Coffee', items: [{ id: 'mi1', name: 'Espresso', price: '₹180', description: 'Double shot, rich crema' }, { id: 'mi2', name: 'Cortado', price: '₹220', description: 'Equal parts espresso and steamed milk' }, { id: 'mi3', name: 'Pour Over', price: '₹280', description: 'V60 single-origin, rotating selection' }, { id: 'mi4', name: 'Cold Brew', price: '₹250', description: '16-hour steep, smooth finish' }] },
        { id: 'mc2', name: 'Food', items: [{ id: 'mi5', name: 'Avocado Toast', price: '₹350', description: 'Sourdough, chili flakes, microgreens' }, { id: 'mi6', name: 'Granola Bowl', price: '₹300', description: 'House granola, yogurt, seasonal fruit' }, { id: 'mi7', name: 'Croissant', price: '₹180', description: 'Butter, laminated, baked fresh daily' }] },
        { id: 'mc3', name: 'Seasonal', items: [{ id: 'mi8', name: 'Cardamom Latte', price: '₹300', description: 'House-made cardamom syrup, oat milk' }, { id: 'mi9', name: 'Jaggery Cappuccino', price: '₹280', description: 'Unrefined jaggery, double shot' }] },
      ]},
      story: { title: 'Our Story', body: 'Roast & Pour began as a passion project in 2019. Maya Chen spent three years on coffee farms across Central America before bringing her expertise to Bengaluru. We roast every batch in-house on our 15kg Probat, ensuring every cup reflects the care and craft behind specialty coffee.' },
      location: { title: 'Find Us', address: '42 Church Street, Bengaluru 560001', phone: '+91 80 4567 8901', hours: [{ id: 'h1', day: 'Mon — Fri', time: '7:30 AM — 8:00 PM' }, { id: 'h2', day: 'Saturday', time: '8:00 AM — 9:00 PM' }, { id: 'h3', day: 'Sunday', time: '8:00 AM — 6:00 PM' }] },
      reservation: { title: 'Reserve a Seat', subtitle: 'Walk-ins welcome. For groups of 6+, we recommend reserving ahead.', ctaText: 'Reserve Now' },
    },
  },
  forma: {
    site: { brandName: 'Roast & Pour', tagline: 'Crafted coffee, everyday ritual.', description: 'A specialty coffee roastery and cafe designed for the modern coffee connoisseur.', ctaPrimary: 'Visit Us', ctaSecondary: 'Our Beans' },
    sections: {
      hero: { title: 'Where every cup is a considered act.', subtitle: 'From farm to cup, Roast & Pour handles every step of the process with intention.' },
      projects: { title: 'Our Spaces', items: [
        { id: 'p1', title: 'The Main Bar', category: 'Cafe', description: 'A 30-seat flagship space with reclaimed wood, exposed brick, and skylights.' },
        { id: 'p2', title: 'The Roastery', category: 'Production', description: 'A glass-enclosed roasting room with a 15kg Probat and cupping table.' },
        { id: 'p3', title: 'The Garden', category: 'Outdoor', description: 'A shaded courtyard with olive trees and seating for weekend brunch.' },
        { id: 'p4', title: 'Pop-up at Commerce', category: 'Collaboration', description: 'A seasonal pop-up bringing specialty coffee to the fashion district.' },
      ]},
      about: { title: 'About Roast & Pour', description: 'Founded in 2019, Roast & Pour started as a pop-up in a converted garage. Today, we roast 200kg of specialty coffee weekly and serve over 300 customers daily across our two locations in Bengaluru.' },
      services: { title: 'What We Do', items: [
        { id: 's1', title: 'Specialty Roasting', description: 'Single-origin beans roasted in small batches every week.' },
        { id: 's2', title: 'Cafe Experience', description: 'Handcrafted drinks made with precision and care.' },
        { id: 's3', title: 'Wholesale', description: 'Fresh beans delivered to offices, restaurants, and hotels.' },
        { id: 's4', title: 'Workshops', description: 'Weekend masterclasses on brewing, cupping, and latte art.' },
      ]},
      contact: { title: 'Get in Touch', subtitle: 'We\'d love to hear from you.', email: 'hello@roastandpour.co' },
    },
  },
  forge: {
    site: { brandName: 'Roast & Pour', tagline: 'Built different. Brewed better.', description: 'Craft coffee infrastructure — from roastery buildouts to cafe fit-outs.', ctaPrimary: 'Get a Quote', ctaSecondary: 'Our Work' },
    sections: {
      hero: { title: 'WE BUILD THE SPACES WHERE COFFEE COMES TO LIFE.', subtitle: 'Roastery construction. Cafe fit-outs. Commercial kitchen design. We turn vision into operational reality.' },
      services: { title: 'Our Services', items: [
        { id: 's1', title: 'Roastery Build-Out', description: 'Complete roastery construction from ventilation to electrical to drainage.' },
        { id: 's2', title: 'Cafe Fit-Out', description: 'End-to-end cafe construction including bar design, seating, and lighting.' },
        { id: 's3', title: 'Kitchen Design', description: 'Commercial kitchen layouts optimized for workflow and health codes.' },
        { id: 's4', title: 'Renovation', description: 'Refresh and upgrade existing coffee spaces without closing your doors.' },
      ]},
      projects: { title: 'Recent Work', items: [
        { id: 'p1', title: 'Roast & Pour Flagship', category: 'Cafe', description: 'A 2,400 sq ft cafe and roastery in Church Street, Bengaluru.', area: '2,400 sq ft' },
        { id: 'p2', title: 'Blue Tokai Roastery', category: 'Production', description: 'Industrial roastery with custom ventilation and storage.', area: '5,000 sq ft' },
        { id: 'p3', title: 'Third Wave Coffee Bar', category: 'Cafe', description: 'Compact 600 sq ft specialty bar in Koramangala.', area: '600 sq ft' },
      ]},
      statistics: { items: [
        { id: 'st1', value: '120+', label: 'Cafes built' },
        { id: 'st2', value: '8', label: 'Years experience' },
        { id: 'st3', value: '15', label: 'Cities covered' },
      ]},
      team: { title: 'Our Team', subtitle: 'A crew of builders who love coffee.', members: [
        { id: 'tm1', name: 'Rajesh Kumar', role: 'Founder & Lead', description: '20 years in commercial construction, coffee obsessed.' },
      ]},
      contact: { title: 'Start Your Project', subtitle: 'Tell us about your space.', email: 'projects@roastandpour.co' },
    },
  },
  motion: {
    site: { brandName: 'Roast & Pour', tagline: 'Fuel your grind.', description: 'Premium coffee and energy for the fitness community.', ctaPrimary: 'Order Now', ctaSecondary: 'Locations' },
    sections: {
      hero: { title: 'FUEL YOUR GRIND.', subtitle: 'Pre-workout espresso. Post-gym cold brew. Coffee crafted for people who move.' },
      programs: { title: 'Our Blends', items: [
        { id: 'pg1', name: 'Pre-Workout Espresso', description: 'Double shot, high caffeine, bold finish. Designed to fire you up.', duration: 'Single Origin', level: 'Strong' },
        { id: 'pg2', name: 'The Recovery Blend', description: 'Medium roast, chocolate notes, smooth and restorative.', duration: 'Blend', level: 'Medium' },
        { id: 'pg3', name: 'Cold Brew Endurance', description: '16-hour steep, low acidity, all-day energy.', duration: 'Batch Brew', level: 'Smooth' },
        { id: 'pg4', name: 'Oat Power Latte', description: 'Oat milk, double shot, honey. Protein-friendly fuel.', duration: 'Signature', level: 'Balanced' },
      ]},
      trainers: { title: 'Our Roasters', items: [
        { id: 'tr1', name: 'Maya Chen', role: 'Head Roaster', bio: 'Certified Q-grader with 10 years of specialty coffee experience.' },
        { id: 'tr2', name: 'Arjun Patel', role: 'Lead Barista', bio: 'National latte art champion, 2023.' },
        { id: 'tr3', name: 'Sophie Liu', role: 'Green Buyer', bio: 'Travels to origin countries 4 times a year to select beans.' },
      ]},
      testimonials: { title: 'Member Reviews', items: [
        { id: 'te1', quote: 'The pre-workout espresso is the only thing that gets me through morning leg day.', author: 'Vikram S.', role: 'Member since 2023' },
        { id: 'te2', quote: 'Finally, a coffee shop that understands athletes need great coffee too.', author: 'Priya N.', role: 'Member since 2024' },
        { id: 'te3', quote: 'The cold brew is unreal. I drink it year-round.', author: 'Daniel K.', role: 'Member since 2023' },
      ]},
      membership: { title: 'Coffee Subscriptions', tiers: [
        { id: 'm1', name: 'Weekly', price: '₹599', period: '/week', description: 'Fresh beans delivered every Friday', features: ['250g fresh beans', 'Free cafe pickup', '10% off in-store'] },
        { id: 'm2', name: 'Monthly', price: '₹1,999', period: '/month', description: 'Our most popular plan', features: ['1kg fresh beans', 'Free delivery', '20% off in-store', 'Free workshop'] },
        { id: 'm3', name: 'Annual', price: '₹19,999', period: '/year', description: 'Best value for true coffee lovers', features: ['12kg fresh beans', 'Free delivery', '30% off in-store', 'All workshops free', 'Tasting kit'] },
      ]},
      contact: { title: 'Find Us', subtitle: 'Two locations in Bengaluru.', email: 'hello@roastandpour.co' },
    },
  },
  mono: {
    site: { brandName: 'Maya Chen', tagline: 'Coffee. Craft. Detail.', description: 'Coffee professional and sensory designer crafting experiences at the intersection of taste and space.', ctaPrimary: 'Get in Touch', ctaSecondary: 'View Work' },
    sections: {
      hero: { title: 'Maya Chen.\nCoffee & Sensory Design.', subtitle: 'Crafting coffee experiences from seed to space.' },
      about: { title: 'About', body: 'I\'m a certified Q-grader, specialty coffee roaster, and sensory designer based in Bengaluru. With 10+ years working across coffee farms in Central America, roasteries in Melbourne, and cafes in India, I help coffee businesses create distinctive sensory experiences — from bean selection to interior atmosphere.' },
      work: { title: 'Selected Work', items: [
        { id: 'w1', title: 'Roast & Pour Flagship', category: 'Sensory Design', description: 'Complete sensory environment design for a 30-seat specialty cafe.' },
        { id: 'w2', title: 'Origin Ethiopia Collection', category: 'Coffee Curation', description: 'Curated tasting collection featuring 6 single-origin Ethiopian coffees.' },
        { id: 'w3', title: 'Filter Coffee Rebrand', category: 'Brand Identity', description: 'Sensory-led brand identity for a chain of 12 filter coffee bars.' },
        { id: 'w4', title: 'Farm to Cup Documentary', category: 'Content', description: 'Photography and storytelling for a documentary on Indian coffee farming.' },
        { id: 'w5', title: 'Workshop Series: Cupping 101', category: 'Education', description: 'A 6-part sensory education program for baristas and coffee enthusiasts.' },
      ]},
      skills: { title: 'Skills', items: ['Cupping & Q-Grading', 'Roast Profiling', 'Sensory Design', 'Coffee Sourcing', 'Brand Strategy', 'Workshop Facilitation', 'Photography', 'Interior Sensory Mapping'] },
      experience: { title: 'Experience', items: [
        { id: 'e1', title: 'Founder & Sensory Designer', company: 'Roast & Pour', period: '2019 — Present', description: 'Leading specialty coffee operations and sensory design across two locations.' },
        { id: 'e2', title: 'Head Roaster', company: 'Patricia Coffee, Melbourne', period: '2016 — 2019', description: 'Managed roasting operations for one of Melbourne\'s top specialty cafes.' },
        { id: 'e3', title: 'Coffee Buyer', company: 'Terra Coffee Trading', period: '2014 — 2016', description: 'Direct trade sourcing across Ethiopia, Colombia, and Guatemala.' },
      ]},
      contact: { title: 'Contact', email: 'maya@roastandpour.co', phone: '+91 98765 43210' },
    },
  },
  commerce: {
    site: { brandName: 'Roast & Pour', tagline: 'Crafted coffee, delivered.', description: 'Premium specialty coffee beans and brewing equipment delivered to your door.', ctaPrimary: 'Shop Now', ctaSecondary: 'Our Story' },
    sections: {
      hero: { title: 'Coffee that travels as well as it tastes.', subtitle: 'Freshly roasted, carefully packed, and delivered within 48 hours of roasting. From our roastery to your kitchen.', badge: 'New: Subscription boxes now available' },
      products: { title: 'Our Beans', items: [
        { id: 'pr1', name: 'Ethiopia Yirgacheffe', price: '₹650', description: 'Bright, floral, citrus notes. Washed process. 250g.', category: 'Single Origin' },
        { id: 'pr2', name: 'Colombia Huila', price: '₹580', description: 'Caramel, red apple, balanced acidity. 250g.', category: 'Single Origin' },
        { id: 'pr3', name: 'House Blend', price: '₹450', description: 'Chocolate, hazelnut, smooth. Our everyday blend. 250g.', category: 'Blend' },
        { id: 'pr4', name: 'Cold Brew Concentrate', price: '₹380', description: 'Ready-to-dilute concentrate. Makes 1 litre. 16-hour steep.', category: 'Ready to Drink' },
      ]},
      benefits: { title: 'Why Roast & Pour', items: [
        { id: 'b1', title: 'Freshly Roasted', description: 'Every bag is roasted within 48 hours of shipping. Never sitting on shelves.' },
        { id: 'b2', title: 'Direct Trade', description: 'We pay farmers 40% above fair-trade minimums for exceptional lots.' },
        { id: 'b3', title: 'Free Delivery', description: 'Free shipping on orders above ₹500. Delivered in 2-3 days.' },
        { id: 'b4', title: 'Brew Guides', description: 'Every order includes a detailed brewing guide for your chosen beans.' },
      ]},
      testimonials: { title: 'What Our Customers Say', items: [
        { id: 'te1', quote: 'The Ethiopia Yirgacheffe is the best coffee I\'ve ever made at home. The freshness is unreal.', author: 'Ananya R.', role: 'Coffee Enthusiast' },
        { id: 'te2', quote: 'The subscription means I never run out. Fresh beans every Friday like clockwork.', author: 'Karthik M.', role: 'Subscriber since 2023' },
      ]},
      story: { title: 'Our Story', body: 'Roast & Pour was born from a simple frustration: great coffee shouldn\'t be hard to find. We started roasting in a garage in 2019 and now serve over 300 customers daily from our two Bengaluru locations. Our online store brings the same freshness to your doorstep.' },
      cta: { title: 'Your first bag is 20% off', subtitle: 'Use code FRESH20 at checkout. Free delivery on orders above ₹500.' },
    },
  },
};

const archStudio: TemplateNicheMap = {
  atelier: {
    site: { brandName: 'FORM / Studio', tagline: 'Architecture shaped around people.', description: 'Award-winning architecture and interior design studio creating contemporary residential and commercial spaces.', ctaPrimary: 'View Our Work', ctaSecondary: 'Start a Project' },
    sections: {
      hero: { title: 'Architecture begins with listening.', subtitle: 'FORM / Studio creates spaces that honor context, material, and the people who inhabit them.' },
      services: { title: 'Our Expertise', subtitle: 'From concept to completion.', items: [
        { id: 's1', title: 'Residential Design', description: 'Bespoke homes that reflect how you live — from urban apartments to countryside retreats.' },
        { id: 's2', title: 'Commercial Interiors', description: 'Workplaces, retail, and hospitality spaces designed for performance and atmosphere.' },
        { id: 's3', title: 'Master Planning', description: 'Large-scale urban development and campus planning with long-term vision.' },
        { id: 's4', title: 'Interior Architecture', description: 'Renovations and fit-outs that transform existing spaces into something extraordinary.' },
      ]},
      work: { title: 'Selected Projects', subtitle: 'A curated selection of recent work.', items: [
        { id: 'w1', title: 'The Ridge House', category: 'Residential', description: 'A cantilevered residence perched on a wooded hillside, framing panoramic valley views.' },
        { id: 'w2', title: 'Atelier Miro', category: 'Commercial', description: 'A dual-level gallery and studio space carved from a century-old cast-iron building.' },
        { id: 'w3', title: 'Cedar & Stone', category: 'Residential', description: 'A lakeside retreat built from locally sourced cedar and granite.' },
        { id: 'w4', title: 'Noma East', category: 'Hospitality', description: 'Restaurant interiors blending Nordic minimalism with Japanese craft traditions.' },
      ]},
      about: { title: 'About Us', description: 'FORM / Studio was founded in 2016 by architects Riya Mehta and Daniel Park. Based in Bengaluru and New York, we work across scales — from furniture to master plans — with a focus on sustainable materials and contextual design.', values: [
        { id: 'v1', title: 'Context', description: 'Every project starts with deep listening to the site and its people.' },
        { id: 'v2', title: 'Material Honesty', description: 'We let materials speak for themselves — no cladding, no pretense.' },
        { id: 'v3', title: 'Sustainability', description: 'Passive design, local materials, and net-zero targets on every project.' },
      ]},
      testimonial: { title: 'Client Words', items: [{ id: 't1', quote: 'FORM didn\'t just design our home — they understood how we wanted to feel in it. The result is extraordinary.', author: 'Vikram & Meera Sharma', role: 'Homeowners, The Ridge House' }] },
      contact: { title: 'Begin a Conversation', subtitle: 'Every project starts with a conversation.', email: 'hello@formstudio.co', phone: '+91 80 2345 6789', address: '12 Residency Road, Bengaluru 560025' },
    },
  },
  northline: {
    site: { brandName: 'FORM / Studio', tagline: 'Architecture, managed.', description: 'Project management platform designed specifically for architecture and design firms.', ctaPrimary: 'Start Free Trial', ctaSecondary: 'Book a Demo' },
    sections: {
      hero: { title: 'Manage every project from brief to build.', subtitle: 'FORM Platform brings design workflows, client approvals, and construction documentation into one beautiful workspace.', badge: 'New: AI-powered schedule optimization' },
      features: { title: 'Built for design teams', subtitle: 'Tools that understand how architects actually work.', items: [
        { id: 'f1', title: 'Design Timeline', description: 'Gantt charts adapted for design phases — concept, DD, CD, and construction.', icon: 'clock' },
        { id: 'f2', title: 'Client Portal', description: 'Beautiful presentations and approval workflows that make clients feel involved.', icon: 'users' },
        { id: 'f3', title: 'Drawing Management', description: 'Version control for drawings with visual diff and markup tools.', icon: 'layers' },
        { id: 'f4', title: 'Specification Engine', description: 'Living spec books that update automatically as designs evolve.', icon: 'file' },
        { id: 'f5', title: 'Budget Tracking', description: 'Real-time cost estimation tied to design decisions and material selections.', icon: 'dollar' },
        { id: 'f6', title: 'Construction Feed', description: 'Photo logs, RFIs, and submittals synced between site and studio.', icon: 'camera' },
      ]},
      statistics: { title: 'Trusted by leading firms', items: [
        { id: 'st1', value: '850+', label: 'Architecture firms' },
        { id: 'st2', value: '$4.2B', label: 'Projects managed' },
        { id: 'st3', value: '32%', label: 'Faster delivery' },
      ]},
      testimonials: { title: 'What firms say', items: [
        { id: 'te1', quote: 'We cut our documentation time by 40%. The drawing management alone is worth the subscription.', author: 'Riya Mehta', role: 'Principal, FORM / Studio', company: 'FORM / Studio' },
        { id: 'te2', quote: 'Our clients love the portal. It makes them feel part of the process without overwhelming them.', author: 'David Park', role: 'Director, Park Associates', company: 'Park Associates' },
      ]},
      pricing: { title: 'Plans for every studio', tiers: [
        { id: 'p1', name: 'Studio', price: '₹8,999', period: '/month', description: 'For small practices', features: ['Up to 5 projects', 'Client portal', 'Basic scheduling', 'Email support'] },
        { id: 'p2', name: 'Practice', price: '₹24,999', period: '/month', description: 'For growing firms', features: ['Unlimited projects', 'Drawing management', 'Budget tracking', 'Priority support'] },
        { id: 'p3', name: 'Enterprise', price: 'Custom', period: '', description: 'For large firms', features: ['Everything in Practice', 'Custom integrations', 'Dedicated CSM', 'On-site training', 'SLA'] },
      ]},
      cta: { title: 'Start designing your workflow', subtitle: '14-day free trial. No credit card needed.' },
    },
  },
  forma: {
    site: { brandName: 'FORM / Studio', tagline: 'Architecture shaped around people.', description: 'Award-winning architecture studio creating contemporary residential and commercial spaces.', ctaPrimary: 'View Projects', ctaSecondary: 'Start a Project' },
    sections: {
      hero: { title: 'Architecture begins with listening.', subtitle: 'FORM / Studio delivers bespoke design solutions that honor context, material, and craft.' },
      projects: { title: 'Selected Projects', items: [
        { id: 'p1', title: 'The Ridge House', category: 'Residential', description: 'A cantilevered residence perched on a wooded hillside, framing panoramic valley views.', location: 'Hudson Valley, NY' },
        { id: 'p2', title: 'Atelier Miro', category: 'Commercial', description: 'A dual-level gallery and studio space carved from a century-old cast-iron building.', location: 'SoHo, New York' },
        { id: 'p3', title: 'Cedar & Stone Residence', category: 'Residential', description: 'A lakeside retreat built from locally sourced cedar and granite.', location: 'Montauk, NY' },
        { id: 'p4', title: 'Noma East', category: 'Hospitality', description: 'Restaurant interiors blending Nordic minimalism with Japanese craft traditions.', location: 'East Village, NY' },
      ]},
      about: { title: 'About FORM', description: 'Founded in 2016 by Riya Mehta and Daniel Park, FORM / Studio works across scales — from furniture to master plans — with a focus on sustainable materials and contextual design. Based in Bengaluru and New York.' },
      services: { title: 'Expertise', items: [
        { id: 's1', title: 'Residential', description: 'Bespoke homes designed around how you live.' },
        { id: 's2', title: 'Commercial', description: 'Workplaces and retail spaces built for performance.' },
        { id: 's3', title: 'Interiors', description: 'Renovations that transform existing spaces.' },
        { id: 's4', title: 'Consultation', description: 'Design advisory for developers and homeowners.' },
      ]},
      contact: { title: 'Begin a Conversation', subtitle: 'Every project starts with a conversation.', email: 'hello@formstudio.co' },
    },
  },
  localTable: {
    site: { brandName: 'FORM / Kitchen', tagline: 'Where architecture meets appetite.', description: 'A dining experience designed from the ground up — where every material, angle, and surface has been considered.', ctaPrimary: 'Reserve', ctaSecondary: 'Menu' },
    sections: {
      hero: { title: 'Where architecture meets appetite.', subtitle: 'A dining space designed with the same rigor as the food it serves.' },
      menu: { title: 'The Menu', categories: [
        { id: 'mc1', name: 'Small Plates', items: [
          { id: 'mi1', name: 'Heirloom Tomato Tartare', price: '₹450', description: 'With burrata and basil oil' },
          { id: 'mi2', name: 'Charred Octopus', price: '₹580', description: 'With smoked paprika and lemon' },
          { id: 'mi3', name: 'Mushroom Risotto Croquettes', price: '₹420', description: 'With truffle aioli' },
        ]},
        { id: 'mc2', name: 'Mains', items: [
          { id: 'mi4', name: 'Slow-Roasted Lamb Shoulder', price: '₹950', description: 'With root vegetables and rosemary jus' },
          { id: 'mi5', name: 'Pan-Seared Sea Bass', price: '₹880', description: 'With saffron risotto and fennel' },
          { id: 'mi6', name: 'Wild Mushroom Pasta', price: '₹720', description: 'Handmade pappardelle, parmesan' },
        ]},
        { id: 'mc3', name: 'Desserts', items: [
          { id: 'mi7', name: 'Dark Chocolate Fondant', price: '₹450', description: 'With vanilla bean ice cream' },
          { id: 'mi8', name: 'Seasonal Fruit Pavlova', price: '₹420', description: 'With passion fruit curd' },
        ]},
      ]},
      story: { title: 'The Space', body: 'FORM / Kitchen was conceived as an architectural project as much as a culinary one. The 4,000 sq ft space features a 12-meter concrete bar, custom brass light fixtures, and a living wall that changes with the seasons. Every detail — from the angle of the dining chairs to the acoustics of the ceiling — has been designed to enhance the dining experience.' },
      location: { title: 'Visit Us', address: '23 Residency Road, Bengaluru 560025', phone: '+91 80 3456 7890', hours: [
        { id: 'h1', day: 'Mon — Thu', time: '6:00 PM — 11:00 PM' },
        { id: 'h2', day: 'Fri — Sat', time: '6:00 PM — 12:00 AM' },
        { id: 'h3', day: 'Sunday', time: '12:00 PM — 4:00 PM (Brunch)' },
      ]},
      reservation: { title: 'Reserve a Table', subtitle: 'We recommend booking at least 3 days in advance.', ctaText: 'Reserve Now' },
    },
  },
  forge: {
    site: { brandName: 'FORM / Build', tagline: 'Architecture you can touch.', description: 'Design-build studio delivering architecture from concept through construction.', ctaPrimary: 'Get a Quote', ctaSecondary: 'Portfolio' },
    sections: {
      hero: { title: 'WE DON\'T JUST DESIGN BUILDINGS. WE BUILD THEM.', subtitle: 'From concept through construction — architecture delivered with precision and craft.' },
      services: { title: 'Our Services', items: [
        { id: 's1', title: 'Design-Build', description: 'Single-point responsibility from concept to completion. No handoffs, no excuses.' },
        { id: 's2', title: 'Renovations', description: 'Transforming existing structures into contemporary spaces while preserving character.' },
        { id: 's3', title: 'Custom Homes', description: 'Ground-up residential construction with in-house design and project management.' },
        { id: 's4', title: 'Commercial Fit-Out', description: 'Office, retail, and hospitality spaces built to specification and on schedule.' },
      ]},
      projects: { title: 'Completed Projects', items: [
        { id: 'p1', title: 'FORM / Studio HQ', category: 'Commercial', description: 'Our own 3,500 sq ft studio in a converted warehouse.', area: '3,500 sq ft' },
        { id: 'p2', title: 'The Ridge House', category: 'Residential', description: 'A cantilevered hillside residence in the Hudson Valley.', area: '4,200 sq ft' },
        { id: 'p3', title: 'Noma East', category: 'Hospitality', description: 'Restaurant build-out for a Michelin-starred chef.', area: '2,800 sq ft' },
      ]},
      statistics: { items: [
        { id: 'st1', value: '95+', label: 'Projects delivered' },
        { id: 'st2', value: '98%', label: 'On-time rate' },
        { id: 'st3', value: '12', label: 'Design awards' },
      ]},
      team: { title: 'Leadership', subtitle: 'The people behind the projects.', members: [
        { id: 'tm1', name: 'Riya Mehta', role: 'Co-Founder & Design Director', description: 'AIA Gold Medal nominee. 15 years of design-build experience.' },
        { id: 'tm2', name: 'Daniel Park', role: 'Co-Founder & Construction Director', description: 'Former Turner Construction. Licensed general contractor in 3 states.' },
      ]},
      contact: { title: 'Start Your Project', subtitle: 'Tell us about your vision.', email: 'build@formstudio.co' },
    },
  },
  motion: {
    site: { brandName: 'FORM / Gym', tagline: 'Move with intention.', description: 'A movement studio designed for mindful, intentional fitness.', ctaPrimary: 'Join Now', ctaSecondary: 'Classes' },
    sections: {
      hero: { title: 'MOVE WITH INTENTION.', subtitle: 'Architecture meets athletics in a space designed to elevate every rep, stretch, and breath.' },
      programs: { title: 'Programs', items: [
        { id: 'pg1', name: 'Architectural Flow', description: 'A yoga-meets-pilates class focused on alignment and structural strength.', duration: '60 min', level: 'All levels' },
        { id: 'pg2', name: 'Foundation Strength', description: 'Compound movements, progressive overload, built on perfect form.', duration: '45 min', level: 'Intermediate' },
        { id: 'pg3', name: 'Spatial Cardio', description: 'Movement through space — not on a treadmill. Outdoor running, agility, breathwork.', duration: '50 min', level: 'All levels' },
        { id: 'pg4', name: 'Recovery Studio', description: 'Foam rolling, mobility, and guided meditation in our dedicated recovery space.', duration: '40 min', level: 'All levels' },
      ]},
      trainers: { title: 'Coaches', items: [
        { id: 'tr1', name: 'Ananya Desai', role: 'Head Coach', bio: 'Certified strength coach and yoga instructor. 8 years experience.' },
        { id: 'tr2', name: 'Marcus Webb', role: 'Mobility Specialist', bio: 'Physical therapist turned fitness coach. Expert in movement patterns.' },
        { id: 'tr3', name: 'Lina Huang', role: 'Yoga & Breathwork', bio: 'RYT-500. Trained in Mysore and Bali.' },
      ]},
      testimonials: { title: 'Member Stories', items: [
        { id: 'te1', quote: 'The space itself makes you want to work out. It\'s calm but energizing at the same time.', author: 'Neha K.', role: 'Member since 2024' },
        { id: 'te2', quote: 'The Foundation Strength class changed how I think about fitness. It\'s about quality, not quantity.', author: 'Arjun P.', role: 'Member since 2023' },
        { id: 'te3', quote: 'I\'ve tried every gym in the city. FORM is the only one that feels designed for how I want to move.', author: 'Sarah M.', role: 'Member since 2024' },
      ]},
      membership: { title: 'Membership Plans', tiers: [
        { id: 'm1', name: 'Essentials', price: '₹4,999', period: '/month', description: 'Get started', features: ['8 classes/month', 'Recovery studio access', 'Locker facilities'] },
        { id: 'm2', name: 'Unlimited', price: '₹8,999', period: '/month', description: 'Most popular', features: ['Unlimited classes', 'Recovery studio', 'Guest passes (2)', 'Workshops'] },
        { id: 'm3', name: 'Annual', price: '₹79,999', period: '/year', description: 'Best value', features: ['Everything in Unlimited', 'Personal training (4)', 'Nutrition consult', 'Priority booking'] },
      ]},
      contact: { title: 'Visit Us', subtitle: 'Try a free class this week.', email: 'hello@formgym.co' },
    },
  },
  mono: {
    site: { brandName: 'Riya Mehta', tagline: 'Architecture. Detail. Purpose.', description: 'Principal architect specializing in sustainable residential design and material innovation.', ctaPrimary: 'Contact', ctaSecondary: 'Portfolio' },
    sections: {
      hero: { title: 'Riya Mehta.\nPrincipal Architect.', subtitle: 'Designing spaces that honor material, context, and craft.' },
      about: { title: 'About', body: 'I\'m a principal architect and co-founder of FORM / Studio, based between Bengaluru and New York. My practice focuses on sustainable residential architecture and material innovation — designing homes that are as responsible as they are beautiful.' },
      work: { title: 'Selected Projects', items: [
        { id: 'w1', title: 'The Ridge House', category: 'Residential', description: 'A cantilevered hillside residence in the Hudson Valley. AIA Award 2024.' },
        { id: 'w2', title: 'Cedar & Stone', category: 'Residential', description: 'A lakeside retreat built from locally sourced materials. Dwell Feature 2023.' },
        { id: 'w3', title: 'FORM Studio HQ', category: 'Commercial', description: 'A converted warehouse turned into a creative workspace.' },
        { id: 'w4', title: 'The Green House', category: 'Residential', description: 'A net-zero energy home in Whitefield, Bengaluru.' },
        { id: 'w5', title: 'Noma East Interiors', category: 'Hospitality', description: 'Restaurant interiors for a Michelin-starred chef.' },
      ]},
      skills: { title: 'Expertise', items: ['Sustainable Design', 'Material Innovation', 'Residential Architecture', 'Passive House', 'Interior Architecture', 'Master Planning', 'Construction Administration', 'Design Research'] },
      experience: { title: 'Experience', items: [
        { id: 'e1', title: 'Co-Founder & Principal', company: 'FORM / Studio', period: '2016 — Present', description: 'Leading design on residential and commercial projects across two continents.' },
        { id: 'e2', title: 'Senior Architect', company: 'Bjarke Ingels Group (BIG)', period: '2013 — 2016', description: 'Led design on the Google Bay View campus and multiple residential towers.' },
        { id: 'e3', title: 'Architect', company: 'Studio Mumbai', period: '2010 — 2013', description: 'Contributed to award-winning residential and cultural projects.' },
      ]},
      contact: { title: 'Contact', email: 'riya@formstudio.co', phone: '+91 98765 43210' },
    },
  },
  commerce: {
    site: { brandName: 'FORM / Objects', tagline: 'Designed to last.', description: 'A curated collection of architectural objects, furniture, and materials for considered living.', ctaPrimary: 'Shop Collection', ctaSecondary: 'Our Story' },
    sections: {
      hero: { title: 'Objects designed with the same rigor as our buildings.', subtitle: 'From hand-thrown ceramics to custom brass hardware — every FORM Object is designed to be touched, used, and treasured.', badge: 'New: Spring Collection' },
      products: { title: 'Collection', items: [
        { id: 'pr1', name: 'Brass Door Handle', price: '₹3,800', description: 'Solid brass, hand-finished. Develops a natural patina.', category: 'Hardware' },
        { id: 'pr2', name: 'Concrete Planter', price: '₹2,400', description: 'Cast concrete with exposed aggregate. Designed by FORM Studio.', category: 'Objects' },
        { id: 'pr3', name: 'Cedar Shelf System', price: '₹12,500', description: 'Modular shelving in reclaimed cedar and blackened steel.', category: 'Furniture' },
        { id: 'pr4', name: 'Ceramic Vase Set', price: '₹4,200', description: 'Hand-thrown by artisans in Pondicherry. Set of 3.', category: 'Objects' },
      ]},
      benefits: { title: 'Why FORM Objects', items: [
        { id: 'b1', title: 'Architect Designed', description: 'Every piece is designed by our architecture team with the same attention to material and form.' },
        { id: 'b2', title: 'Artisan Made', description: 'Handcrafted by skilled artisans using traditional techniques and premium materials.' },
        { id: 'b3', title: 'Built to Last', description: 'We use materials that age beautifully — brass, cedar, concrete, stone.' },
        { id: 'b4', title: 'Free Delivery', description: 'Complimentary white-glove delivery across India on orders above ₹5,000.' },
      ]},
      testimonials: { title: 'From Our Customers', items: [
        { id: 'te1', quote: 'The brass handles have developed the most beautiful patina. They feel like they belong in our home.', author: 'Meera S.', role: 'Interior Designer' },
        { id: 'te2', quote: 'Finally, objects designed with the same care as the spaces they go into.', author: 'Arjun R.', role: 'Architect' },
      ]},
      story: { title: 'Our Story', body: 'FORM Objects grew naturally from our architecture practice. We kept designing custom hardware, shelving, and fixtures for our projects — and clients kept asking if they could buy them. In 2022, we launched the collection officially, working with artisans across India to bring our designs to life.' },
      cta: { title: 'Visit our studio showroom', subtitle: 'Touch, feel, and experience every piece in person.' },
    },
  },
};

const aiStartup: TemplateNicheMap = {
  atelier: {
    site: { brandName: 'Neural Path', tagline: 'Intelligence, engineered.', description: 'AI infrastructure platform designed for enterprise teams.', ctaPrimary: 'Request Access', ctaSecondary: 'How It Works' },
    sections: {
      hero: { title: 'AI infrastructure that scales.', subtitle: 'Neural Path provides enterprise-grade ML infrastructure — from model training to production deployment.' },
      services: { title: 'Platform Capabilities', subtitle: 'Everything your ML team needs.', items: [{ id: 's1', title: 'Model Training', description: 'Distributed training across GPU clusters with automatic scaling.' }, { id: 's2', title: 'Model Registry', description: 'Version, tag, and deploy models with full lineage tracking.' }, { id: 's3', title: 'Inference API', description: 'One-click deployment with auto-scaling and monitoring.' }, { id: 's4', title: 'Data Pipeline', description: 'ETL workflows, feature stores, and data versioning.' }] },
      work: { title: 'Who We Work With', items: [{ id: 'w1', title: 'FinTech Corp', category: 'Finance', description: 'Reduced model deployment time from 2 weeks to 4 hours.' }, { id: 'w2', title: 'HealthAI Labs', category: 'Healthcare', description: 'Trained 50+ clinical NLP models on our infrastructure.' }, { id: 'w3', title: 'RetailIQ', category: 'Retail', description: 'Recommendation engine serving 10M requests/day.' }, { id: 'w4', title: 'AutoDrive', category: 'Automotive', description: 'Processed 2PB of sensor data through our pipeline.' }] },
      about: { title: 'About Neural Path', description: 'Founded in 2022 by ML engineers from Google Brain and Meta FAIR. We flip the ratio — 80% building models, 20% plumbing.', values: [{ id: 'v1', title: 'Reliability', description: '99.99% uptime SLA.' }, { id: 'v2', title: 'Simplicity', description: 'One platform, one API.' }] },
      testimonial: { title: 'What Teams Say', items: [{ id: 't1', quote: 'Neural Path cut our ML ops costs by 60%.', author: 'Dr. Anand Krishna', role: 'Head of ML, FinTech Corp' }] },
      contact: { title: 'Get Started', subtitle: 'Enterprise plans available.', email: 'sales@neuralpath.ai' },
    },
  },
  northline: {
    site: { brandName: 'Neural Path', tagline: 'Ship AI, not infrastructure.', description: 'The AI platform for teams that deploy machine learning at scale.', ctaPrimary: 'Start Building', ctaSecondary: 'View Docs' },
    sections: {
      hero: { title: 'Ship AI, not infrastructure.', subtitle: 'Neural Path handles training, deployment, and monitoring.', badge: 'SOC 2 Type II Certified' },
      features: { title: 'Platform Features', subtitle: 'Enterprise AI infrastructure, simplified.', items: [{ id: 'f1', title: 'GPU Clusters', description: 'On-demand A100 and H100 clusters with auto-scaling.', icon: 'zap' }, { id: 'f2', title: 'Model Registry', description: 'Version control for ML models with audit trails.', icon: 'box' }, { id: 'f3', title: 'One-Click Deploy', description: 'Deploy with canary releases and rollback.', icon: 'rocket' }, { id: 'f4', title: 'Feature Store', description: 'Centralized feature management.', icon: 'database' }, { id: 'f5', title: 'Monitoring', description: 'Model drift detection and alerts.', icon: 'activity' }, { id: 'f6', title: 'Multi-Cloud', description: 'Run on AWS, GCP, or Azure.', icon: 'cloud' }] },
      statistics: { title: 'Scale you can trust', items: [{ id: 'st1', value: '2,100+', label: 'ML teams' }, { id: 'st2', value: '50M+', label: 'Models deployed' }, { id: 'st3', value: '99.99%', label: 'Uptime SLA' }] },
      testimonials: { title: 'Trusted by ML teams', items: [{ id: 'te1', quote: 'Deployment frequency went from monthly to daily.', author: 'Priya Rajan', role: 'VP Engineering, HealthAI', company: 'HealthAI' }, { id: 'te2', quote: 'GPU cost savings alone paid for the platform 5x over.', author: 'Tom Zhang', role: 'CTO, RetailIQ', company: 'RetailIQ' }] },
      pricing: { title: 'Pay for what you use', tiers: [{ id: 'p1', name: 'Starter', price: '$499', period: '/month', description: 'For small teams', features: ['2 GPU instances', 'Model registry', 'Basic monitoring'] }, { id: 'p2', name: 'Team', price: '$2,499', period: '/month', description: 'For growing teams', features: ['10 GPU instances', 'Feature store', 'Priority support'] }, { id: 'p3', name: 'Enterprise', price: 'Custom', period: '', description: 'For large orgs', features: ['Unlimited GPUs', 'SLA', 'On-prem option'] }] },
      cta: { title: 'Start building today', subtitle: 'Free tier includes 100 GPU hours.' },
    },
  },
  commerce: {
    site: { brandName: 'Neural Path', tagline: 'AI infrastructure, delivered.', description: 'Enterprise AI platform as a managed service.', ctaPrimary: 'Contact Sales', ctaSecondary: 'Documentation' },
    sections: {
      hero: { title: 'Focus on models. We handle everything else.', subtitle: 'Managed AI infrastructure with guaranteed uptime and dedicated support.', badge: 'Enterprise Plan Available' },
      products: { title: 'Platform Products', items: [{ id: 'pr1', name: 'Training Cloud', price: '$2/hr', description: 'A100 and H100 GPU instances.', category: 'Compute' }, { id: 'pr2', name: 'Inference Pro', price: '$0.001/req', description: 'Production inference with auto-scaling.', category: 'Deployment' }, { id: 'pr3', name: 'Data Pipeline', price: '$999/mo', description: 'Managed ETL and feature stores.', category: 'Data' }, { id: 'pr4', name: 'Enterprise Suite', price: 'Custom', description: 'Full platform with SLA and support.', category: 'Platform' }] },
      benefits: { title: 'Why Neural Path', items: [{ id: 'b1', title: 'Guaranteed Uptime', description: '99.99% SLA with automatic failover.' }, { id: 'b2', title: 'Cost Optimization', description: '40% average compute savings.' }, { id: 'b3', title: 'Security First', description: 'SOC 2 Type II, HIPAA ready.' }, { id: 'b4', title: 'Expert Support', description: '24/7 ML engineering support.' }] },
      testimonials: { title: 'What Teams Say', items: [{ id: 'te1', quote: 'Reduced infrastructure costs by $2M annually.', author: 'Dr. Anand Krishna', role: 'Head of ML, Fortune 500' }, { id: 'te2', quote: 'Saved us from hiring 3 additional ML engineers.', author: 'Sarah Kim', role: 'CTO, AI Startup' }] },
      story: { title: 'Our Mission', body: 'Neural Path was founded to solve a simple problem: ML teams spend too much time on infrastructure and not enough on intelligence.' },
      cta: { title: 'Talk to our team', subtitle: 'Get a custom architecture review.' },
    },
  },
};

const gym = {
  atelier: {
    site: { brandName: 'Iron Collective', tagline: 'Stronger every day.', description: 'Premium strength training gym with world-class coaching and a no-ego community.', ctaPrimary: 'Join Now', ctaSecondary: 'Our Programs' },
    sections: {
      hero: { title: 'Your strongest chapter starts here.', subtitle: 'Iron Collective is a performance-driven training facility where serious athletes and beginners train side by side.' },
      services: { title: 'Training Programs', items: [
        { id: 's1', title: 'Strength & Conditioning', description: 'Barbell-focused programming with progressive overload, coached sessions, and personalized periodization.' },
        { id: 's2', title: 'Olympic Lifting', description: 'Dedicated platform area with certified USA Weightlifting coaches for snatch and clean & jerk development.' },
        { id: 's3', title: 'Group Classes', description: 'Small-group sessions (max 12) combining strength, cardio, and mobility for all fitness levels.' },
        { id: 's4', title: 'Personal Training', description: 'One-on-one coaching with nutrition guidance, movement screening, and goal-specific programming.' },
      ]},
      work: { title: 'Our Facility', items: [
        { id: 'w1', title: 'Main Floor', category: 'Training', description: '8,000 sq ft of Rogue equipment, Eleiko platforms, and dedicated lifting areas.' },
        { id: 'w2', title: 'Olympic Platform', category: 'Specialized', description: '6 competition-spec platforms with bumper plates and video analysis.' },
        { id: 'w3', title: 'Recovery Zone', category: 'Wellness', description: 'Cold plunge, sauna, and stretching area for optimal recovery.' },
        { id: 'w4', title: 'Community Space', category: 'Social', description: 'Post-workout lounge with protein bar, supplements, and community boards.' },
      ]},
      about: { title: 'About Iron Collective', description: 'Founded in 2020 by national-level powerlifters Akash Verma and Sarah Thompson. We built Iron Collective because we wanted a gym that took training seriously without taking itself too seriously.', values: [
        { id: 'v1', title: 'No Ego', description: 'Everyone starts somewhere. We meet you where you are.' },
        { id: 'v2', title: 'Results-Driven', description: 'Every program is designed to deliver measurable progress.' },
      ]},
      testimonial: { title: 'Member Stories', items: [{ id: 't1', quote: 'I have trained at 20+ gyms. Iron Collective is the only one that feels like home AND delivers results.', author: 'Vikram Singh', role: 'Member since 2021' }] },
      contact: { title: 'Start Your Journey', subtitle: 'Book a free intro session and see if Iron Collective is right for you.', email: 'join@ironcollective.in', phone: '+91 80 5678 9012', address: '15 Industrial Layout, Indiranagar, Bengaluru 560038' },
    },
  },
  motion: {
    site: { brandName: 'Iron Collective', tagline: 'Stronger every day.', description: 'Premium strength training gym with world-class coaching.', ctaPrimary: 'Join Now', ctaSecondary: 'View Programs' },
    sections: {
      hero: { title: 'YOUR STRONGEST CHAPTER STARTS HERE.', subtitle: 'Elite training. Expert coaching. A community that pushes you further than you\'d go alone.' },
      programs: { title: 'Programs', items: [
        { id: 'pg1', name: 'Iron Foundation', description: 'Barbell basics, compound movements, progressive overload.', duration: '12 weeks', level: 'Beginner' },
        { id: 'pg2', name: 'Power Program', description: 'Squat, bench, deadlift focus with periodized intensity.', duration: '16 weeks', level: 'Advanced' },
        { id: 'pg3', name: 'Athletic Performance', description: 'Speed, power, agility training for competitive athletes.', duration: '8 weeks', level: 'Intermediate' },
        { id: 'pg4', name: 'Transform', description: 'Body recomposition through strength training and nutrition.', duration: '12 weeks', level: 'All levels' },
      ]},
      trainers: { title: 'Coaches', items: [
        { id: 'tr1', name: 'Akash Verma', role: 'Head Coach', bio: 'National powerlifting champion. 15 years coaching.' },
        { id: 'tr2', name: 'Sarah Thompson', role: 'Olympic Lifting Coach', bio: 'USA Weightlifting Level 2 coach.' },
        { id: 'tr3', name: 'Ravi Krishnamurthy', role: 'Mobility & Recovery', bio: 'Sports physiotherapist and movement specialist.' },
      ]},
      testimonials: { title: 'Member Stories', items: [
        { id: 'te1', quote: 'I deadlifted 200kg for the first time after 6 months here.', author: 'Prateek N.', role: 'Member since 2022' },
        { id: 'te2', quote: 'Best gym community in the city.', author: 'Anita S.', role: 'Member since 2023' },
        { id: 'te3', quote: 'Went from struggling with a barbell to competing in my first meet.', author: 'Deepak R.', role: 'Member since 2021' },
      ]},
      membership: { title: 'Membership', tiers: [
        { id: 'm1', name: 'Basic', price: '\u20b93,999', period: '/mo', description: 'Gym floor access', features: ['Full gym access', 'Locker room', 'Monthly assessment'] },
        { id: 'm2', name: 'Performance', price: '\u20b97,999', period: '/mo', description: 'Train with purpose', features: ['Everything in Basic', '4 group classes/week', 'Recovery zone'] },
        { id: 'm3', name: 'Elite', price: '\u20b914,999', period: '/mo', description: 'Total transformation', features: ['Everything in Performance', 'Unlimited classes', '2 PT sessions/week'] },
      ]},
      contact: { title: 'Start Your Journey', subtitle: 'Free first session for all new members.', email: 'join@ironcollective.in' },
    },
  },
};

const restaurant = {
  localTable: {
    site: { brandName: 'The Garden Table', tagline: 'From soil to plate.', description: 'Farm-to-table restaurant celebrating seasonal, local ingredients in a warm contemporary setting.', ctaPrimary: 'Reserve a Table', ctaSecondary: 'View Menu' },
    sections: {
      hero: { title: 'From soil to plate.', subtitle: 'Seasonal ingredients. Honest cooking. A space built for lingering.' },
      menu: { title: 'Seasonal Menu', categories: [
        { id: 'mc1', name: 'Starters', items: [
          { id: 'mi1', name: 'Burrata & Heirloom Tomato', price: '\u20b9520', description: 'With basil oil and aged balsamic' },
          { id: 'mi2', name: 'Wild Mushroom Soup', price: '\u20b9450', description: 'Forest mushroom velout\u00e9 with truffle cream' },
          { id: 'mi3', name: 'Garden Beetroot Carpaccio', price: '\u20b9480', description: 'With goat cheese, walnut, and micro herbs' },
        ]},
        { id: 'mc2', name: 'Mains', items: [
          { id: 'mi4', name: 'Slow-Roasted Lamb Shank', price: '\u20b91,200', description: 'Heritage lamb, root vegetables, rosemary jus' },
          { id: 'mi5', name: 'Pan-Seared Trout', price: '\u20b91,050', description: 'Local river trout, lemon butter, seasonal greens' },
          { id: 'mi6', name: 'Wild Mushroom Risotto', price: '\u20b9880', description: 'Arborio rice, seasonal mushrooms, parmesan' },
        ]},
        { id: 'mc3', name: 'Desserts', items: [
          { id: 'mi7', name: 'Seasonal Fruit Crumble', price: '\u20b9480', description: 'With vanilla custard or ice cream' },
          { id: 'mi8', name: 'Chocolate Fondant', price: '\u20b9520', description: 'Dark Valrhona, salted caramel, vanilla' },
        ]},
      ]},
      story: { title: 'Our Story', body: 'The Garden Table was born from a simple belief: the best meals start in the soil. Chef Priya Sharma partners with 12 local farms within 50km of Bengaluru to source ingredients at their peak.' },
      location: { title: 'Find Us', address: '87 Lavelle Road, Bengaluru 560001', phone: '+91 80 6789 0123', hours: [
        { id: 'h1', day: 'Mon \u2014 Fri', time: '12:00 PM \u2014 3:00 PM, 7:00 PM \u2014 11:00 PM' },
        { id: 'h2', day: 'Sat \u2014 Sun', time: '11:00 AM \u2014 4:00 PM, 7:00 PM \u2014 11:30 PM' },
      ]},
      reservation: { title: 'Reserve Your Table', subtitle: 'We recommend booking at least 2 days in advance.', ctaText: 'Reserve Now' },
    },
  },
};

const interiorDesign = {
  atelier: {
    site: { brandName: 'Haven & Co.', tagline: 'Spaces that feel like home.', description: 'Luxury interior design studio creating residential and hospitality spaces.', ctaPrimary: 'View Projects', ctaSecondary: 'Book a Consultation' },
    sections: {
      hero: { title: 'Every room tells a story.', subtitle: 'Haven & Co. creates interiors that balance beauty and comfort.' },
      services: { title: 'Our Services', items: [
        { id: 's1', title: 'Full Interior Design', description: 'End-to-end design from concept to installation.' },
        { id: 's2', title: 'Space Planning', description: 'Optimizing layout, flow, and function.' },
        { id: 's3', title: 'Furniture Curation', description: 'Bespoke furniture and curated vintage pieces.' },
        { id: 's4', title: 'Styling & Finishing', description: 'Art, textiles, and accessories.' },
      ]},
      work: { title: 'Featured Projects', items: [
        { id: 'w1', title: 'The Malabar Penthouse', category: 'Residential', description: 'A 4,500 sq ft penthouse overlooking the Arabian Sea.' },
        { id: 'w2', title: 'Caf\u00e9 Nomad', category: 'Hospitality', description: 'A bohemian-chic cafe in Indiranagar.' },
        { id: 'w3', title: 'The White House', category: 'Residential', description: 'A minimalist family home in Whitefield.' },
        { id: 'w4', title: 'The Fern Hotel Suite', category: 'Hospitality', description: 'Luxury hotel suite blending Indian craft with comfort.' },
      ]},
      about: { title: 'About Haven & Co.', description: 'Founded by Ananya Reddy in 2017, Haven & Co. has completed over 80 projects. We create spaces that feel authentically yours.', values: [
        { id: 'v1', title: 'Warmth', description: 'Beautiful spaces should feel welcoming.' },
        { id: 'v2', title: 'Craft', description: 'We work with skilled artisans for every project.' },
      ]},
      testimonial: { title: 'Client Words', items: [{ id: 't1', quote: 'Haven transformed our apartment into a home. Every time I walk in the door, I feel at peace.', author: 'Nisha & Raj Kapoor', role: 'Homeowners, Malabar Hill' }] },
      contact: { title: 'Start Your Project', subtitle: 'Book an initial consultation.', email: 'hello@havenandco.in', phone: '+91 80 7890 1234', address: '22 Palace Road, Bengaluru 560052' },
    },
  },
  forma: {
    site: { brandName: 'Haven & Co.', tagline: 'Spaces that feel like home.', description: 'Luxury interior design studio.', ctaPrimary: 'View Projects', ctaSecondary: 'Book Consultation' },
    sections: {
      hero: { title: 'Where comfort meets craft.', subtitle: 'Spaces that are as beautiful as they are livable.' },
      projects: { title: 'Our Work', items: [
        { id: 'p1', title: 'The Malabar Penthouse', category: 'Residential', description: 'Ocean views, designed for family living.', location: 'Mumbai' },
        { id: 'p2', title: 'Caf\u00e9 Nomad', category: 'Hospitality', description: 'Vintage furniture and terrazzo floors.', location: 'Bengaluru' },
        { id: 'p3', title: 'The White House', category: 'Residential', description: 'Natural materials and floor-to-ceiling windows.', location: 'Bengaluru' },
        { id: 'p4', title: 'The Fern Suite', category: 'Hospitality', description: 'Indian craft meets contemporary comfort.', location: 'Jaipur' },
      ]},
      about: { title: 'About Haven', description: 'Founded by Ananya Reddy in 2017. 80+ completed projects.' },
      services: { title: 'Services', items: [
        { id: 's1', title: 'Full Interior Design', description: 'Concept to installation.' },
        { id: 's2', title: 'Space Planning', description: 'Layout and flow optimization.' },
        { id: 's3', title: 'Furniture Curation', description: 'Bespoke and vintage pieces.' },
        { id: 's4', title: 'Styling', description: 'The finishing touches that make a house a home.' },
      ]},
      contact: { title: 'Let\'s Create Together', subtitle: 'Every project starts with a conversation.', email: 'hello@havenandco.in' },
    },
  },
};

const fashion = {
  commerce: {
    site: { brandName: 'Maison Noir', tagline: 'Wear the difference.', description: 'Minimalist luxury fashion \u2014 timeless pieces designed in Bengaluru.', ctaPrimary: 'Shop Collection', ctaSecondary: 'Our Story' },
    sections: {
      hero: { title: 'Timeless design, honest materials.', subtitle: 'Maison Noir creates clothing that transcends seasons.', badge: 'New: AW26 Collection' },
      products: { title: 'New Arrivals', items: [
        { id: 'pr1', name: 'Oversized Wool Coat', price: '\u20b912,900', description: 'Italian wool, fully lined.', category: 'Outerwear' },
        { id: 'pr2', name: 'Merino Turtleneck', price: '\u20b94,900', description: 'Extra-fine merino. Relaxed fit.', category: 'Knitwear' },
        { id: 'pr3', name: 'Wide-Leg Trousers', price: '\u20b96,500', description: 'Japanese cotton twill. High waist.', category: 'Bottoms' },
        { id: 'pr4', name: 'Linen Camp Shirt', price: '\u20b95,200', description: 'Indian handloom linen.', category: 'Shirts' },
      ]},
      benefits: { title: 'The Maison Noir Difference', items: [
        { id: 'b1', title: 'Designed to Last', description: 'Transcend seasons, not follow trends.' },
        { id: 'b2', title: 'Honest Materials', description: 'Italian wool, Japanese cotton, Indian linen.' },
        { id: 'b3', title: 'Ethical Production', description: 'Fair-wage workshops in Bengaluru and Mumbai.' },
        { id: 'b4', title: 'Free Alterations', description: 'Complimentary tailoring forever.' },
      ]},
      testimonials: { title: 'What Customers Say', items: [
        { id: 'te1', quote: 'I have had my Maison Noir coat for 3 years and it looks better than day one.', author: 'Kavya R.', role: 'Loyal Customer' },
        { id: 'te2', quote: 'Finally, a brand that makes clothes worth keeping.', author: 'Arjun M.', role: 'Customer since 2022' },
      ]},
      story: { title: 'Our Story', body: 'Maison Noir was founded in 2019 with a single belief: fashion should be made to last. We design timeless pieces in our Bengaluru studio and produce them in small batches.' },
      cta: { title: 'Visit our studio', subtitle: 'Try on pieces in person at our Lavelle Road studio.' },
    },
  },
  atelier: {
    site: { brandName: 'Maison Noir', tagline: 'Wear the difference.', description: 'Minimalist luxury fashion brand.', ctaPrimary: 'Shop Now', ctaSecondary: 'Our Process' },
    sections: {
      hero: { title: 'Fashion that respects time.', subtitle: 'Clothing designed to be worn for years, not weeks.' },
      services: { title: 'Our Process', items: [
        { id: 's1', title: 'Design', description: 'Every piece starts with a sketch in our studio.' },
        { id: 's2', title: 'Sourcing', description: 'Direct relationships with mills in Italy, Japan, and India.' },
        { id: 's3', title: 'Production', description: 'Small-batch at fair-wage workshops.' },
        { id: 's4', title: 'Care', description: 'Lifetime repairs on every garment.' },
      ]},
      work: { title: 'Collections', items: [
        { id: 'w1', title: 'AW26: Earth', category: 'Outerwear', description: 'Inspired by the Indian landscape.' },
        { id: 'w2', title: 'SS26: Light', category: 'Shirting', description: 'Breathable linens for summer.' },
        { id: 'w3', title: 'Core Collection', category: 'Essentials', description: 'Year-round basics in natural materials.' },
        { id: 'w4', title: 'Archive', category: 'Vintage', description: 'Curated vintage pieces from our collection.' },
      ]},
      about: { title: 'About Maison Noir', description: 'Founded in 2019, the antidote to fast fashion.' },
      testimonial: { title: 'In Their Words', items: [{ id: 't1', quote: 'The only brand where I have never returned a piece.', author: 'Priya Nair', role: 'Fashion Editor, Vogue India' }] },
      contact: { title: 'Visit Us', subtitle: 'By appointment at our Lavelle Road studio.', email: 'hello@maisonnoir.in' },
    },
  },
};

const photoStudio = {
  atelier: {
    site: { brandName: 'Lightframe Co.', tagline: 'Moments, masterfully captured.', description: 'Photography studio specializing in editorial, portrait, and commercial photography.', ctaPrimary: 'Book a Session', ctaSecondary: 'View Portfolio' },
    sections: {
      hero: { title: 'Photography that feels like memory.', subtitle: 'Lightframe Co. captures the moments that matter.' },
      services: { title: 'Photography Services', items: [
        { id: 's1', title: 'Portrait Photography', description: 'Headshots, family portraits, and branding shoots.' },
        { id: 's2', title: 'Editorial & Fashion', description: 'Magazine-quality editorial photography.' },
        { id: 's3', title: 'Commercial & Product', description: 'Product photography and brand campaigns.' },
        { id: 's4', title: 'Event Photography', description: 'Weddings and launches with documentary storytelling.' },
      ]},
      work: { title: 'Portfolio', items: [
        { id: 'w1', title: 'Vogue India Feature', category: 'Editorial', description: '12-page editorial spread.' },
        { id: 'w2', title: 'The Tata Collective', category: 'Commercial', description: 'Sustainable fashion campaign.' },
        { id: 'w3', title: 'Rohan & Meera Wedding', category: 'Event', description: 'Destination wedding in Udaipur.' },
        { id: 'w4', title: 'Makers of India', category: 'Portrait', description: 'Documenting artisans across India.' },
      ]},
      about: { title: 'About Lightframe', description: 'Founded by Arjun Bhat in 2018. Published in Vogue, GQ, AD, and CN Traveller.', values: [
        { id: 'v1', title: 'Authenticity', description: 'Real moments, not forced poses.' },
        { id: 'v2', title: 'Craft', description: 'Every image is carefully composed by hand.' },
      ]},
      testimonial: { title: 'Client Words', items: [{ id: 't1', quote: 'Arjun makes you feel comfortable in front of the camera. The photos feel like us.', author: 'Rohan & Meera', role: 'Wedding Clients' }] },
      contact: { title: 'Book Your Session', subtitle: 'Lets create something beautiful together.', email: 'hello@lightframe.co', phone: '+91 80 9012 3456', address: '33 Brigade Road, Bengaluru 560001' },
    },
  },
  mono: {
    site: { brandName: 'Arjun Bhat', tagline: 'Light. Frame. Moment.', description: 'Photographer and visual storyteller based in Bengaluru.', ctaPrimary: 'Get in Touch', ctaSecondary: 'View Work' },
    sections: {
      hero: { title: 'Arjun Bhat.\nPhotographer.', subtitle: 'Capturing moments with intention and warmth.' },
      about: { title: 'About', body: 'Photographer based in Bengaluru. Published in Vogue India, GQ, Architectural Digest, and Conde Nast Traveller.' },
      work: { title: 'Selected Work', items: [
        { id: 'w1', title: 'Vogue India: Emerging Designers', category: 'Editorial', description: '12-page editorial spread for Vogue India.' },
        { id: 'w2', title: 'Tata Sustainable Fashion', category: 'Commercial', description: 'Brand campaign and lookbook.' },
        { id: 'w3', title: 'Makers of India', category: 'Personal', description: 'Documentary on artisans.' },
        { id: 'w4', title: 'Destination Weddings', category: 'Event', description: 'Intimate wedding storytelling.' },
        { id: 'w5', title: 'AD India', category: 'Editorial', description: 'Interior photography for home of the year.' },
      ]},
      skills: { title: 'Skills', items: ['Portrait Photography', 'Editorial', 'Commercial', 'Events', 'Retouching', 'Art Direction', 'Video', 'Drone'] },
      experience: { title: 'Experience', items: [
        { id: 'e1', title: 'Founder & Lead Photographer', company: 'Lightframe Co.', period: '2018 \u2014 Present', description: 'Boutique studio in Bengaluru.' },
        { id: 'e2', title: 'Staff Photographer', company: 'Vogue India', period: '2016 \u2014 2018', description: 'Editorials, covers, and fashion week.' },
        { id: 'e3', title: 'Assistant Photographer', company: 'Studio Mumbai', period: '2014 \u2014 2016', description: 'Architectural and interior photography.' },
      ]},
      contact: { title: 'Contact', email: 'arjun@lightframe.co', phone: '+91 98765 43210' },
    },
  },
};

export function getNicheContent(templateId: string, nicheKey: string): NicheData | null {
  const key = nicheKey.toLowerCase().trim();

  const allMaps: Record<string, TemplateNicheMap> = {
    'coffee shop': coffeeShop,
    'architecture studio': archStudio,
    'ai startup': aiStartup,
    'gym': gym,
    'restaurant': restaurant,
    'interior design': interiorDesign,
    'fashion brand': fashion,
    'photography studio': photoStudio,
  };

  const nicheMap = allMaps[key];
  if (!nicheMap) return null;

  return nicheMap[templateId] ?? null;
}

export function findBestNicheMatch(userInput: string): string | null {
  const input = userInput.toLowerCase().trim();
  const nicheKeywords: Record<string, string[]> = {
    'coffee shop': ['coffee', 'cafe', 'espresso', 'roast', 'brew', 'barista', 'beans'],
    'architecture studio': ['architecture', 'architect', 'building', 'structural', 'urban'],
    'ai startup': ['ai', 'startup', 'machine learning', 'ml', 'artificial intelligence', 'tech', 'saas', 'software'],
    'gym': ['gym', 'fitness', 'strength', 'training', 'workout', 'exercise', 'crossfit', 'powerlifting'],
    'restaurant': ['restaurant', 'dining', 'food', 'cuisine', 'chef', 'kitchen', 'eat'],
    'interior design': ['interior', 'decor', 'furnishing', 'design studio', 'styling'],
    'fashion brand': ['fashion', 'clothing', 'apparel', 'wear', 'brand', 'boutique', 'style'],
    'photography studio': ['photo', 'photography', 'camera', 'portrait', 'shoot', 'studio'],
  };

  for (const [niche, keywords] of Object.entries(nicheKeywords)) {
    if (keywords.some(kw => input.includes(kw))) return niche;
  }
  return null;
}
