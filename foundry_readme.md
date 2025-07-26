# The Foundry Landing Page

A modern, high-converting landing page for The Foundry - Northwest Arkansas's premier fitness and lifestyle complex opening in 2026.

## 🏗️ Project Overview

The Foundry is a revolutionary 100,000+ sq ft facility in Rogers/Bentonville featuring elite fitness, recovery, family activities, dining, co-working, and entertainment spaces. This landing page showcases the facility through AI-generated renderings and drives pre-launch membership sign-ups.

## 🎯 Key Features

- **Hero Section**: Dynamic hero with AI facility renderings and compelling CTA
- **Facility Showcase**: Interactive grid displaying 15+ unique amenities
- **Visual Gallery**: AI-rendered facility images with lightbox functionality
- **Membership Tiers**: Pricing and package information
- **Founder's Club**: Exclusive pre-launch sign-up with benefits
- **Social Proof**: Testimonials and community feedback
- **Mobile Responsive**: Optimized for all devices
- **Performance Optimized**: Fast loading with image optimization

## 🛠️ Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid/Flexbox
- **JavaScript**: Interactive components and form handling
- **Deployment**: Vercel (recommended) / Netlify / GitHub Pages
- **Images**: AI-generated facility renderings (WebP optimized)

## 📁 Project Structure

```
the-foundry-landing/
├── index.html                 # Main landing page
├── assets/
│   ├── css/
│   │   ├── styles.css         # Main stylesheet
│   │   └── responsive.css     # Mobile responsiveness
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   ├── animations.js     # Scroll animations
│   │   └── forms.js          # Form handling
│   ├── images/
│   │   ├── ai-renderings/    # AI facility images
│   │   ├── icons/            # Feature icons
│   │   └── logos/            # Brand assets
│   └── fonts/                # Custom typography
├── components/
│   ├── hero.html             # Hero section
│   ├── features.html         # Amenities grid
│   ├── gallery.html          # Image gallery
│   └── cta.html              # Call-to-action sections
├── .gitignore
├── package.json              # Dependencies (if using build tools)
├── vercel.json               # Vercel deployment config
├── netlify.toml              # Netlify deployment config
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Code editor (VS Code with Cursor recommended)
- Node.js (optional, for build tools)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/the-foundry-landing.git
   cd the-foundry-landing
   ```

2. **Add your AI renderings**
   - Place AI-generated facility images in `assets/images/ai-renderings/`
   - Optimize images to WebP format for better performance
   - Create multiple sizes for responsive design

3. **Local development**
   ```bash
   # Simple HTTP server
   python -m http.server 8000
   # Or with Node.js
   npx serve .
   ```

4. **Open in browser**
   Navigate to `http://localhost:8000`

## 🎨 Customization Guide

### Brand Colors
Update CSS custom properties in `assets/css/styles.css`:
```css
:root {
  --primary-color: #FF6B35;    /* Foundry Orange */
  --secondary-color: #1A1A1A;  /* Deep Black */
  --accent-color: #F7931E;     /* Warm Orange */
  --text-light: #FFFFFF;
  --text-dark: #333333;
}
```

### AI Rendering Integration
1. **Hero Section**: Replace `hero-rendering.webp` with your main facility image
2. **Feature Gallery**: Add specific area renderings (gym, pool, cafe, etc.)
3. **Lightbox**: Ensure high-resolution versions for detailed viewing

### Content Updates
- Update facility descriptions in `index.html`
- Modify membership pricing in the pricing section
- Customize founder's club benefits
- Add local testimonials and reviews

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: 320px - 767px

## 🔧 Performance Optimization

### Image Strategy
- **WebP format** with JPEG fallbacks
- **Lazy loading** for below-the-fold images
- **Responsive images** with srcset
- **CDN delivery** via Vercel/Netlify

### Loading Speed
- Minified CSS and JavaScript
- Critical CSS inlined
- Deferred non-critical resources
- Optimized font loading

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository
2. Auto-deploy on every push
3. Custom domain setup
4. Built-in analytics

```bash
# Deploy with Vercel CLI
npm i -g vercel
vercel --prod
```

### Netlify
1. Drag and drop deployment
2. Form handling included
3. A/B testing capabilities
4. Branch previews

### GitHub Pages
1. Enable in repository settings
2. Deploy from main branch
3. Custom domain via CNAME
4. Free hosting for public repos

## 📊 Analytics & Tracking

### Conversion Tracking
- Founder's Club sign-ups
- Email subscriptions
- Brochure downloads
- Contact form submissions

### Recommended Tools
- **Google Analytics 4**: User behavior tracking
- **Hotjar**: Heatmaps and user recordings
- **Vercel Analytics**: Performance metrics
- **Mailchimp**: Email marketing integration

## 🔒 Form Handling

### Lead Capture Options
1. **Netlify Forms**: Built-in form processing
2. **Formspree**: External form service
3. **EmailJS**: Client-side email sending
4. **Custom API**: Node.js backend integration

### Data Privacy
- GDPR-compliant opt-ins
- Clear privacy policy
- Secure data transmission
- Unsubscribe functionality

## 🎯 Conversion Optimization

### Key Metrics to Track
- **Conversion Rate**: Email sign-ups / Total visitors
- **Bounce Rate**: Single-page sessions
- **Time on Page**: Engagement measurement
- **CTA Click Rate**: Button effectiveness

### A/B Testing Ideas
- Hero headline variations
- CTA button colors/text
- Membership pricing display
- Form field requirements

## 🔧 Development with Claude Code

### Recommended Workflow
```bash
# Initial setup
claude-code "Create a modern landing page structure for The Foundry fitness complex"

# Feature development
claude-code "Add an interactive amenities grid with hover effects and icons"

# Optimization
claude-code "Implement lazy loading and WebP image optimization"

# Form handling
claude-code "Create a lead capture form with validation and success states"
```

## 📝 Content Strategy

### SEO Optimization
- Title: "The Foundry - Premier Fitness Complex | Rogers/Bentonville, AR"
- Meta description highlighting unique amenities
- Local SEO for Northwest Arkansas
- Schema markup for local business

### Social Media
- Open Graph tags for Facebook sharing
- Twitter Card integration
- Instagram-ready image crops
- LinkedIn business page linking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support & Contact

- **Project Lead**: [Your Name]
- **Email**: contact@thefoundrynwa.com
- **Location**: Rogers/Bentonville, Arkansas
- **Opening**: 2026

## 📄 License

This project is proprietary and confidential. All rights reserved by The Foundry NWA.

---

**Ready to revolutionize Northwest Arkansas fitness?** 🚀

*Built with ❤️ for the NWA community*