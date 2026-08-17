import { TemplateMetadata } from '../../types';

export const template: TemplateMetadata = {
  id: 'local-table',
  name: 'Local Table',
  category: 'Restaurant / Cafe',
  description: 'A warm, inviting template for restaurants, cafes, and food establishments. Conveys a sense of place, craft, and hospitality.',
  style: ['warm', 'inviting', 'rustic-modern', 'storytelling'],
  designCharacteristics: ['warm tones', 'organic shapes', 'handcrafted feel', 'food-focused imagery', 'earthy palette'],
  sections: ['hero', 'menu', 'story', 'location', 'reservation'],
  theme: {
    background: '#FBF8F3',
    foreground: '#2C2420',
    accent: '#C45D3E',
    muted: '#9C8B7A',
  },
  defaultContent: {
    site: {
      brandName: 'Local Table',
      tagline: 'Seasonal. Honest. Community.',
      description: 'A farm-to-table restaurant celebrating regional ingredients, thoughtful preparation, and the simple joy of gathering around a well-set table.',
      ctaPrimary: 'Reserve a Table',
      ctaSecondary: 'View Menu',
    },
    sections: {
      hero: {
        title: 'Where every dish tells the story of the land it came from.',
        subtitle: 'Local Table is a seasonal restaurant rooted in the belief that the best meals begin in the soil, not the kitchen.',
        mediaType: 'image',
      },
      menu: {
        title: 'Our Menu',
        subtitle: 'Seasonal dishes crafted from ingredients sourced within 50 miles of our kitchen.',
        categories: [
          {
            id: 'cat-1',
            name: 'Starters',
            items: [
              { id: 'item-1', name: 'Heirloom Tomato Gazpacho', description: 'Chilled summer soup with crème fraîche, basil oil, and sourdough croutons', price: '14' },
              { id: 'item-2', name: 'Burrata & Stone Fruit', description: 'Creamy burrata, grilled peaches, arugula, aged balsamic, and candied walnuts', price: '17' },
              { id: 'item-3', name: 'Mushroom Tartine', description: 'Roasted wild mushrooms on house-baked levain with whipped ricotta and thyme', price: '15' },
              { id: 'item-4', name: 'Beet Carpaccio', description: 'Thinly sliced roasted beets, goat cheese mousse, pistachio, and citrus vinaigrette', price: '13' },
            ],
          },
          {
            id: 'cat-2',
            name: 'Mains',
            items: [
              { id: 'item-5', name: 'Pan-Seared Trout', description: 'Local rainbow trout, brown butter, fingerling potatoes, and sautéed kale', price: '32' },
              { id: 'item-6', name: 'Braised Short Rib', description: 'Twelve-hour braised beef, celery root purée, roasted root vegetables, red wine jus', price: '38' },
              { id: 'item-7', name: 'Wild Mushroom Risotto', description: 'Arborio rice, foraged chanterelles, truffle oil, aged Parmigiano-Reggiano', price: '26' },
              { id: 'item-8', name: 'Herb-Roasted Chicken', description: 'Half chicken, roasted garlic, seasonal greens, and house-made herb bread', price: '29' },
            ],
          },
          {
            id: 'cat-3',
            name: 'Desserts',
            items: [
              { id: 'item-9', name: 'Panna Cotta', description: 'Vanilla bean custard, macerated berries, and shortbread crumble', price: '12' },
              { id: 'item-10', name: 'Dark Chocolate Torte', description: 'Flourless chocolate cake, salted caramel, and espresso crème', price: '14' },
              { id: 'item-11', name: 'Apple Galette', description: 'Rustic pastry, honeycrisp apples, brown sugar, and vanilla bean ice cream', price: '13' },
            ],
          },
        ],
      },
      story: {
        title: 'Our Story',
        description: 'Local Table opened in 2019 with a simple mission: serve honest food made from ingredients we trust. Chef-owner Maria Delgado spent a decade cooking in fine dining kitchens before returning to her rural roots, determined to build a restaurant that honored the farmers, foragers, and producers of the Hudson Valley region.',
        paragraphs: [
          'Every dish on our menu begins with a conversation — with our farmers at dawn, with our foragers after rain, with our cheesemaker in the aging room. We don\'t design menus around trends; we design them around what the land offers us each week.',
          'Our kitchen is deliberately small. Our sourcing network is deliberately tight. We believe these constraints produce not limitation, but creativity — and food that genuinely tastes like where it comes from.',
        ],
        chef: {
          name: 'Maria Delgado',
          title: 'Chef & Owner',
          bio: 'Trained at the Culinary Institute of America, staged at Blue Hill at Stone Barns and Noma, returned to the Hudson Valley to cook close to home.',
        },
      },
      location: {
        title: 'Find Us',
        address: '87 Main Street, Hudson, NY 12534',
        neighborhood: 'Historic Hudson Downtown',
        hours: [
          { days: 'Monday', time: 'Closed' },
          { days: 'Tuesday – Thursday', time: '5:00 PM – 10:00 PM' },
          { days: 'Friday – Saturday', time: '5:00 PM – 11:00 PM' },
          { days: 'Sunday', time: '10:00 AM – 3:00 PM (Brunch)' },
        ],
        parking: 'Street parking available on Main and Warren Streets. Lot parking behind the building after 5 PM.',
        phone: '+1 (518) 555-0178',
      },
      reservation: {
        title: 'Reserve a Table',
        subtitle: 'We accept reservations for parties of 1–8. Walk-ins welcome at the bar.',
        phone: '+1 (518) 555-0178',
        email: 'reservations@localtable.com',
        bookingUrl: 'https://resy.com/local-table',
        notes: 'For parties larger than 8, please contact us directly for private dining options.',
      },
    },
  },
};

export const defaultContent = template.defaultContent;
