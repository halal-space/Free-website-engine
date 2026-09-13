'use client';

import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import type { Product, ProductColor } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#EDE8DF' }
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  // Customer Review Form state
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    title: '',
    comment: '',
  });

  const addItemToCart = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openCheckout, addToast, navigateToHome, navigateToShop } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItemToCart(product, quantity, selectedColor, selectedSize);
    addToast('Added to Shopping Bag', `${quantity}× ${product.name}`, 'success');

    setTimeout(() => {
      setIsAdding(false), 450;
    });
  };

  const handleBuyNow = () => {
    addItemToCart(product, quantity, selectedColor, selectedSize);
    openCheckout();
  };

  const handleToggleWishlist = () => {
    const isNowAdded = toggleItem(product);
    addToast(
      isNowAdded ? 'Saved to Wishlist' : 'Removed from Wishlist',
      product.name,
      'favorite'
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Review Submitted', 'Thank you for sharing your experience with our family.', 'success');
    setReviewFormOpen(false);
    setNewReview({ author: '', rating: 5, title: '', comment: '' });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* Top Breadcrumb */}
      <nav className="text-xs text-[#877E73] py-4 mb-2 flex items-center gap-1.5 font-sans">
        <button onClick={navigateToHome} className="hover:text-[#1C1917] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <button onClick={() => navigateToShop()} className="hover:text-[#1C1917] transition-colors cursor-pointer">Shop</button>
        <span>/</span>
        <button
          onClick={() => navigateToShop(product.categorySlug)}
          className="hover:text-[#1C1917] transition-colors cursor-pointer"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#1C1917] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Two Columns Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stage Image */}
          <div className="relative aspect-4/5 w-full bg-[#F2ECE1] rounded-2xl overflow-hidden border border-[#E8E2D7] shadow-xs">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.isBestSeller && (
                <span className="bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
                  Bestseller
                </span>
              )}
              {product.isOrganic && (
                <span className="bg-[#EBF4EE] text-[#3D6B4F] text-xs uppercase tracking-wider px-3 py-1 rounded-full font-medium border border-[#3D6B4F]/20">
                  Certified Organic GOTS
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#1C1917] shadow-sm scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Purchasing Details (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header: Category, Title, Subtitle */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold">
                {product.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1C1917] mt-1.5 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#877E73] mt-2 font-sans">{product.subtitle}</p>

              {/* Rating and Reviews link */}
              <div className="flex items-center gap-3 mt-3.5 pb-4 border-b border-[#E8E2D7]">
                <div className="flex items-center gap-1 text-sm text-[#B88B4A]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#B88B4A] text-[#B88B4A]'
                          : 'fill-transparent text-[#E8E2D7]'
                      }`}
                    />
                  ))}
                  <span className="font-semibold text-xs text-[#1C1917] ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-[#877E73] text-xs">•</span>
                <a
                  href="#customer-reviews"
                  className="text-xs text-[#575149] hover:text-[#1C1917] underline font-medium"
                >
                  {product.reviewCount} verified parent reviews
                </a>
              </div>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-[#877E73] line-through tabular-nums">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-[#F9EFEA] text-[#B66C52]">
                  Save ${(product.compareAtPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Editorial Highlight Quote */}
            {product.editorialQuote && (
              <div className="p-4 bg-[#F2ECE1] border-l-2 border-[#B88B4A] rounded-r-lg">
                <p className="font-serif italic text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                  "{product.editorialQuote}"
                </p>
              </div>
            )}

            {/* Color Swatch Picker */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-[#1C1917]">
                  Color: <span className="normal-case font-semibold text-[#575149]">{selectedColor.name}</span>
                </label>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-[#1C1917] scale-110 shadow-sm'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                  >
                    {selectedColor.name === color.name && (
                      <Check className={`w-4 h-4 ${color.hex === '#EDE8DF' || color.hex === '#FAF8F5' ? 'text-[#1C1917]' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Variant Picker if applicable */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-[#1C1917]">
                    Size / Dimension:
                  </label>
                  <span className="text-[11px] text-[#877E73]">Standard Fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                          : 'border-[#E8E2D7] bg-white text-[#575149] hover:bg-[#FAF8F5] hover:border-[#1C1917]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper and Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#E8E2D7] rounded-full bg-white px-3 py-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#877E73] hover:text-[#1C1917] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold text-[#1C1917] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#877E73] hover:text-[#1C1917] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#1C1917] hover:bg-[#B88B4A] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
                >
                  {isAdding ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-white" /> Added to Shopping Bag
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                    </span>
                  )}
                </button>

                {/* Wishlist Heart */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                    isFavorited
                      ? 'border-[#B66C52] bg-[#F9EFEA] text-[#B66C52]'
                      : 'border-[#E8E2D7] bg-white text-[#575149] hover:text-[#1C1917] hover:border-[#1C1917]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3 px-6 rounded-full bg-[#EAE3D5] hover:bg-[#DDD5C7] text-[#1C1917] text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
              >
                Instant Checkout
              </button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E8E2D7] text-center text-[11px] text-[#575149]">
              <div className="p-2 bg-white/60 rounded-lg border border-[#E8E2D7]/60">
                <Truck className="w-4 h-4 mx-auto mb-1 text-[#B88B4A]" />
                <span className="block font-medium text-[#1C1917]">Free Shipping</span>
                <span className="text-[#877E73]">On orders over $75</span>
              </div>
              <div className="p-2 bg-white/60 rounded-lg border border-[#E8E2D7]/60">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#B88B4A]" />
                <span className="block font-medium text-[#1C1917]">30-Day Returns</span>
                <span className="text-[#877E73]">Effortless doorstep pickup</span>
              </div>
              <div className="p-2 bg-white/60 rounded-lg border border-[#E8E2D7]/60">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#3D6B4F]" />
                <span className="block font-medium text-[#1C1917]">Non-Toxic Care</span>
                <span className="text-[#877E73]">100% Certified Safe</span>
              </div>
            </div>

            {/* Information Accordions */}
            <div className="divide-y divide-[#E8E2D7] border-y border-[#E8E2D7] pt-2">
              {/* Accordion 1: Description & Details */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between text-xs font-serif font-medium uppercase tracking-wider text-[#1C1917] cursor-pointer"
                >
                  <span>Design Details & Craftsmanship</span>
                  {openAccordion === 'description' ? (
                    <ChevronUp className="w-4 h-4 text-[#877E73]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#877E73]" />
                  )}
                </button>
                {openAccordion === 'description' && (
                  <div className="pt-3 text-xs text-[#575149] leading-relaxed space-y-2 font-sans animate-in fade-in duration-200">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-[#575149] pt-1">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Materials & Care */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between text-xs font-serif font-medium uppercase tracking-wider text-[#1C1917] cursor-pointer"
                >
                  <span>Materials & Sustainable Care</span>
                  {openAccordion === 'materials' ? (
                    <ChevronUp className="w-4 h-4 text-[#877E73]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#877E73]" />
                  )}
                </button>
                {openAccordion === 'materials' && (
                  <div className="pt-3 text-xs text-[#575149] leading-relaxed space-y-2 font-sans animate-in fade-in duration-200">
                    <p>
                      <strong className="text-[#1C1917]">Materials:</strong> {product.materials}
                    </p>
                    <p>
                      <strong className="text-[#1C1917]">Care Guide:</strong> {product.careInstructions}
                    </p>
                    {product.dimensions && (
                      <p>
                        <strong className="text-[#1C1917]">Dimensions:</strong> {product.dimensions}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 3: Certifications */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('certifications')}
                  className="w-full flex items-center justify-between text-xs font-serif font-medium uppercase tracking-wider text-[#1C1917] cursor-pointer"
                >
                  <span>Safety & Certifications</span>
                  {openAccordion === 'certifications' ? (
                    <ChevronUp className="w-4 h-4 text-[#877E73]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#877E73]" />
                  )}
                </button>
                {openAccordion === 'certifications' && (
                  <div className="pt-3 text-xs text-[#575149] space-y-2 font-sans animate-in fade-in duration-200">
                    <p className="text-[#575149]">
                      Tested by independent European and North American laboratories for strict child safety compliance:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 bg-[#EBF4EE] text-[#3D6B4F] text-[11px] rounded-full font-medium"
                        >
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="customer-reviews" className="py-12 border-t border-[#E8E2D7]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#1C1917]">
              Customer Experiences
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-[#B88B4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#1C1917]">
                {product.rating} out of 5 stars
              </span>
              <span className="text-xs text-[#877E73]">
                (Based on {product.reviewCount} verified reviews)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setReviewFormOpen(!reviewFormOpen)}
            className="px-5 py-2.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            {reviewFormOpen ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {reviewFormOpen && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 bg-[#F2ECE1] rounded-2xl border border-[#E8E2D7] mb-8 space-y-4 max-w-xl animate-in fade-in duration-200"
          >
            <h4 className="font-serif text-base font-medium text-[#1C1917]">
              Share your perspective on {product.name}
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#575149] mb-1">Your Name</label>
              <input
                type="text"
                required
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575149] mb-1">Headline</label>
              <input
                type="text"
                required
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="e.g. Absolutely tender fabric"
                className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575149] mb-1">Review</label>
              <textarea
                required
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="How has this item fit into your family's daily rhythm?"
                className="w-full px-3 py-2 text-xs border border-[#E8E2D7] rounded-md bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B88B4A] transition-colors cursor-pointer"
            >
              Publish Review
            </button>
          </form>
        )}

        {/* Existing Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-[#E8E2D7] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-[#B88B4A]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-[#877E73]">{rev.date}</span>
              </div>

              <div>
                <h4 className="font-serif text-sm font-semibold text-[#1C1917]">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#575149] leading-relaxed mt-1.5 font-sans">
                  {rev.comment}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D7]/60 text-[11px] text-[#877E73]">
                <span className="font-medium text-[#1C1917]">{rev.author}, {rev.location}</span>
                {rev.verified && (
                  <span className="text-[#3D6B4F] flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t border-[#E8E2D7]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B88B4A] font-semibold block">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#1C1917] mt-0.5">
                You May Also Cherish
              </h2>
            </div>
            <button
              onClick={() => navigateToShop()}
              className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] hover:text-[#B88B4A] flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
