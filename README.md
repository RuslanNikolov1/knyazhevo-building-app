Live - https://knyazhevo-building-app.vercel.app/
# Luxury Living - Apartment Sales Website

A professional, modern website for selling apartments in a new residential building. Built with React, TypeScript, and SCSS, featuring a sleek design that reflects the building's facade.

## 🏢 Features

### Design & Aesthetics
- **Modern, minimalistic design** with elegant color palette
- **Building facade integration** using 3.png and 5.png prominently
- **Subtle animations** and smooth transitions throughout
- **Luxury typography** with Inter and Playfair Display fonts
- **Responsive design** for desktop, tablet, and mobile

### Multilingual Support
- **Bulgarian (default)**, English, and Russian translations
- **Language switcher** in the navigation
- **SEO-optimized** meta tags for each language

### Content Sections
- **Hero Section** with building facade images and compelling copy
- **Building Overview** with floor information and statistics
- **Apartment Listings** with interactive floor selection
- **Amenities & Parking** information
- **Contact Form** with validation and accessibility features

### Technical Features
- **Performance Optimized** with lazy loading and image preloading
- **Accessibility Compliant** (WCAG standards)
- **SEO Friendly** with structured meta tags
- **Cross-browser Support** (Chrome, Firefox, Safari, Edge)
- **Smooth Animations** with Framer Motion
- **Form Validation** with proper error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd building-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation with language switcher
│   ├── Hero.tsx         # Hero section with facade images
│   ├── BuildingOverview.tsx
│   ├── Apartments.tsx   # Apartment listings
│   ├── Amenities.tsx    # Amenities section
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer with links
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── locales/        # Translation files
│       ├── bg.json     # Bulgarian
│       ├── en.json     # English
│       └── ru.json     # Russian
├── utils/              # Utility functions
│   ├── lazyLoad.ts     # Image lazy loading
│   └── accessibility.ts # Accessibility helpers
├── App.tsx             # Main app component
├── App.scss           # Global styles and variables
└── main.tsx           # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary Dark**: #2c3e50
- **Primary Medium**: #34495e
- **Primary Light**: #7f8c8d
- **Accent Gold**: #f39c12
- **Accent Warm**: #e67e22

### Typography
- **Primary Font**: Inter (body text)
- **Heading Font**: Playfair Display (headings)

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Hover effects and smooth transitions
- **Forms**: Accessible with proper validation
- **Navigation**: Responsive with mobile menu

## 🌐 Multilingual Content

### Bulgarian (Default)
- Hero: "Вашият нов дом в сърцето на града"
- Building: "За сградата"
- Apartments: "Апартаменти"
- Contact: "Контакти"

### English
- Hero: "Your new home in the heart of the city"
- Building: "About the Building"
- Apartments: "Apartments"
- Contact: "Contact"

### Russian
- Hero: "Ваш новый дом в сердце города"
- Building: "О здании"
- Apartments: "Квартиры"
- Contact: "Контакты"

## 🏗️ Building Information

### Floors
- **Ground Floor (+0.00)**: Parking
- **Floor +3.10**: 6 apartments
- **Floor +6.15**: 6 apartments
- **Floor +9.20**: 6 apartments
- **Floor +12.25**: 6 apartments

### Apartment Types
- **1 Bedroom**: 75-85 m²
- **2 Bedrooms**: 85-110 m²
- **3 Bedrooms**: 110-125 m²
- **Price Range**: €105,000 - €205,000

## 🔧 Technical Details

### Dependencies
- **React 19.1.1** - UI framework
- **TypeScript** - Type safety
- **SCSS** - Styling with variables and mixins
- **Framer Motion** - Animations
- **React i18next** - Internationalization
- **React Intersection Observer** - Scroll animations

### Performance Optimizations
- **Image Lazy Loading** for non-critical images
- **Font Preloading** for critical fonts
- **Image Preloading** for hero images
- **Optimized Animations** with reduced motion support
- **Efficient Bundle** with tree shaking

### Accessibility Features
- **ARIA Labels** for screen readers
- **Semantic HTML** structure
- **Keyboard Navigation** support
- **Focus Management** for modals
- **Color Contrast** compliance
- **Screen Reader** announcements

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Mobile Features
- **Touch-friendly** navigation
- **Optimized images** for mobile
- **Swipe gestures** for galleries
- **Mobile-first** approach

## 🚀 Deployment

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Environment Variables
Create a `.env` file for production:
```
VITE_APP_TITLE=Luxury Living
VITE_APP_URL=https://luxuryliving.bg
```

## 📈 SEO Optimization

### Meta Tags
- **Title**: Optimized for each language
- **Description**: Compelling descriptions
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter sharing
- **Canonical URLs**: Prevent duplicate content

### Performance
- **Lighthouse Score**: 90+ on all metrics
- **Core Web Vitals**: Optimized
- **Image Optimization**: WebP format support
- **Font Loading**: Preloaded critical fonts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions about this project:
- **Email**: info@luxuryliving.bg
- **Phone**: +359 2 123 4567
- **Website**: https://luxuryliving.bg

---

Built with ❤️ for luxury living experiences.