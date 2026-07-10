-- Phase 5B: Marketplace Database Optimization
-- Additive indexes ONLY. No existing migrations modified.
-- These indexes target the most common query patterns identified in the audit.

-- ─── Listings Table Indexes ────────────────────────────────────────────────────

-- Category filter: used by Listings.tsx, CategoryPage.tsx, and chatbot search
-- Pattern: .eq('category_id', selectedCategory)
CREATE INDEX IF NOT EXISTS idx_listings_category_id
  ON listings (category_id);

-- Owner lookup: used by Dashboard.tsx (user's own listings)
-- Pattern: .eq('user_id', currentUserId)
CREATE INDEX IF NOT EXISTS idx_listings_user_id
  ON listings (user_id);

-- Status filter: used everywhere (active listings only)
-- Pattern: .eq('status', 'active')
CREATE INDEX IF NOT EXISTS idx_listings_status
  ON listings (status);

-- City filter: used by Listings.tsx location dropdown and filter
-- Pattern: .eq('city', selectedCity)
CREATE INDEX IF NOT EXISTS idx_listings_city
  ON listings (city);

-- Price range filter: used by Listings.tsx price filter
-- Pattern: .gte('price', minPrice).lte('price', maxPrice)
CREATE INDEX IF NOT EXISTS idx_listings_price
  ON listings (price);

-- ─── Composite Indexes for Common Query Patterns ───────────────────────────────

-- Active listings by category (most common listing page query)
-- Pattern: .eq('status', 'active').eq('category_id', ...)
CREATE INDEX IF NOT EXISTS idx_listings_status_category
  ON listings (status, category_id);

-- Active listings by city (location-filtered search)
-- Pattern: .eq('status', 'active').eq('city', ...)
CREATE INDEX IF NOT EXISTS idx_listings_status_city
  ON listings (status, city);

-- Active listings sorted by created_at (default sort: newest first)
-- Pattern: .eq('status', 'active').order('created_at', { ascending: false })
CREATE INDEX IF NOT EXISTS idx_listings_status_created
  ON listings (status, created_at DESC);

-- Active listings by user (dashboard query: user's own active listings)
-- Pattern: .eq('user_id', ...).eq('status', 'active')
CREATE INDEX IF NOT EXISTS idx_listings_user_status
  ON listings (user_id, status);

-- Active featured listings (home page featured section)
-- Pattern: .eq('status', 'active').eq('is_featured', true)
CREATE INDEX IF NOT EXISTS idx_listings_status_featured
  ON listings (status, is_featured);

-- Active listings by price (for price-sorted queries)
-- Pattern: .eq('status', 'active').order('price', ...)
CREATE INDEX IF NOT EXISTS idx_listings_status_price
  ON listings (status, price);
