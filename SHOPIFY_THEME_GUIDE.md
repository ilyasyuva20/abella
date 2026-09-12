# ABELLA BY SEBASTIANS — Shopify Theme Installation & Customization Guide

This document provides step-by-step instructions to upload, publish, and customize the **Abella by Sebastians** theme on any Shopify store.

---

## 📦 1. Theme Package Overview

The project provides a ready-to-upload Shopify Liquid theme located at:
- **Zip Archive**: `abella-shopify-theme.zip`
- **Source Directory**: `shopify-theme/`

### Theme Structure:
```
shopify-theme/
├── assets/
│   ├── logo.png               # Brand calligraphy logo
│   ├── theme.css              # Custom boutique CSS styles
│   └── theme.js               # Interactive frontend JS
├── config/
│   ├── settings_data.json     # Default theme presets
│   └── settings_schema.json   # Admin Customizer color & font options
├── layout/
│   └── theme.liquid           # Master HTML layout
├── sections/                  # Modular Shopify Admin Sections
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero-banner.liquid
│   ├── benefit-strip.liquid
│   ├── collection-split.liquid
│   ├── categories.liquid
│   ├── custom-order-banner.liquid
│   ├── featured-collections.liquid
│   ├── editorial-cards.liquid
│   ├── instagram-gallery.liquid
│   ├── trust-strip.liquid
│   ├── newsletter.liquid
│   └── footer.liquid
├── snippets/
│   ├── product-card.liquid
│   └── meta-tags.liquid
└── templates/
    ├── index.json             # Homepage layout configuration
    ├── collection.json
    └── product.json
```

---

## 🚀 2. How to Upload Theme to Shopify Admin

1. Log into your Shopify Store Admin (`https://admin.shopify.com/store/YOUR-STORE-NAME`).
2. On the left sidebar, click **Online Store** &rarr; **Themes**.
3. Under the **Theme library** section, click **Add theme** &rarr; **Upload zip file**.
4. Select `abella-shopify-theme.zip` from your computer.
5. Click **Upload file**.
6. Once uploaded, click **Actions** &rarr; **Publish** to set Abella as your live storefront theme (or click **Customize** to edit in draft mode first).

---

## 🎨 3. Editing Sections in Shopify Theme Customizer

All text, images, product collections, and links are 100% editable via the native Shopify Theme Customizer (**Online Store** &rarr; **Themes** &rarr; **Customize**).

### Section Configuration Details:

#### 1. Announcement Bar
- Edit **Left Message** (*Default: "Custom Outfits for Your Special Moments"*).
- Edit **Center Message** (*Default: "Free Shipping Across India"*).
- Edit **Right Message** (*Default: "DM for Custom Orders"*).

#### 2. Header
- **Logo Image**: Upload high-resolution logo PNG.
- **Navigation Menu**: Select any created Shopify Menu under **Online Store** &rarr; **Navigation**.

#### 3. Hero Banner
- Edit headings: "TWO GENERATIONS ONE BEAUTIFUL STORY", "For Every Chapter".
- **Hero Image**: Upload high-res boutique editorial image (recommended ratio 4:3 or landscape).
- Button label & destination link.

#### 4. Collection Split (Kids & Women)
- **Left Panel (Kids Boutique)**: Title, description, image, and collection link.
- **Right Panel (Women's Collection)**: Title, description, image, and collection link.

#### 5. Shop by Category
- Add/remove category thumbnail blocks.
- Set category title, circular image thumbnail, and collection target URL.

#### 6. Custom Orders Banner
- Edit title, description, and craftsmanship background image.
- Set **WhatsApp Number** (with country code, e.g. `919446861646`) to route custom inquiries directly to WhatsApp with pre-filled order details.

#### 7. Featured Collections Grid
- Select any Shopify Collection (e.g. "Featured", "Kids", "Women") to auto-populate the 6-column product grid with live price, currency symbol (₹), and Add to Cart forms.

#### 8. Instagram Gallery
- Edit social handles (`@abella_by_sebastians`, `@little_bella___`).
- Update gallery image links.

#### 9. Footer & Business Info
- Update business address (*Embassy House, 9/115, Fortkochi, Veli, Cochin - 1*).
- Update phone numbers (*8089153124 / +91 9446861646*).
- Update GSTIN (*32CYPS751B1C129*).
- Customize handwritten thank-you script: *"Thank you for being a part of our story."*

---

## 💬 4. Custom WhatsApp Order Integration

Custom outfits are routed directly to WhatsApp.
To test or customize the WhatsApp link in Liquid sections, use the format:
`https://wa.me/919446861646?text=Hi%20Abella%2C%20I%20would%20like%20to%20inquire%20about%20custom%20orders.`
