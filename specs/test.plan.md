# Sauce Demo Basic Operations Plan

## Application Overview

Sauce Demo Shopify site basic operations test plan covering navigation, catalog browsing, cart management, search, account forms, and UI elements.

## Test Scenarios

### 1. Basic Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Home Page Accessibility

**File:** `tests/home-page.spec.ts`

**Steps:**
  1. Navigate to https://sauce-demo.myshopify.com/
    - expect: Home page loads with title "Sauce Demo"
    - expect: Header containing logo, navigation menu, search bar, cart indicator
    - expect: Footer section with "About Us" link and payment icons

#### 1.2. Catalog Browsing

**File:** `tests/catalog.spec.ts`

**Steps:**
  1. From the home page click the "Catalog" link
    - expect: Catalog page loads with title "Products – Sauce Demo"
    - expect: Product grid displays a mix of available and sold-out items
  2. Verify that each product link navigates to its detail page, then return to catalog
    - expect: Detail pages load and contain product title and price
    - expect: Back navigation returns to catalog listing

#### 1.3. Product Details and Add to Cart

**File:** `tests/product.spec.ts`

**Steps:**
  1. Open a non-sold-out product (e.g. "Grey jacket")
    - expect: Product page shows title, price, description, and "Add to Cart" button enabled
  2. Click "Add to Cart"
    - expect: Cart counter increments to 1
    - expect: "My Cart" indicator reflects the new quantity
  3. Navigate to a sold‑out product
    - expect: Product page shows title, price and disabled "Sold Out" button

#### 1.4. Cart Operations

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Ensure cart has at least one item (add if needed) and navigate to cart page
    - expect: Cart page lists the product with description, price, quantity and total
  2. Change quantity textbox to 2 and click "Update"
    - expect: Total price updates accordingly
    - expect: Quantity field shows 2
  3. Set quantity to 0 or click the "x" remove link
    - expect: Item is removed from cart
    - expect: Cart displays empty state or zero total
  4. Add a note to the order, click "Update"
    - expect: Note is retained in the textbox
  5. Click "Check Out" from cart when empty
    - expect: User is redirected to checkout/login page or shown an empty cart message

#### 1.5. Search Functionality

**File:** `tests/search.spec.ts`

**Steps:**
  1. Use search bar to look for "jacket" and submit
    - expect: Search results page shows at least two items
    - expect: Result items match the query
  2. Search for a nonsensical term such as "xyz123"
    - expect: Page displays a message indicating no results found

#### 1.6. Account Forms Validation

**File:** `tests/account.spec.ts`

**Steps:**
  1. Navigate to the Login page
    - expect: Page contains email and password fields and "Sign In" button
  2. Attempt to submit with blank fields
    - expect: Error message(s) or validation prevents submission
  3. Navigate to the Register page
    - expect: Form contains first name, last name, email, password fields and "Create" button
  4. Submit registration form with missing data
    - expect: Validation errors are shown

#### 1.7. Navigation & Footer Links

**File:** `tests/navigation.spec.ts`

**Steps:**
  1. Click each top navigation link (Home, Catalog, Blog, About Us)
    - expect: Corresponding pages load or modal appears
    - expect: URL updates appropriately
  2. Click footer "Search" and "About Us" links
    - expect: Links navigate to the correct pages

#### 1.8. Wish List and Refer a Friend

**File:** `tests/bonus.spec.ts`

**Steps:**
  1. Click the "Wish list" link in the main navigation
    - expect: A wishlist panel or modal appears or URL fragment '#sauce-show-wish-list' is set
  2. Click the "Refer a friend" link
    - expect: A referral panel or modal appears or URL fragment '#sauce-show-refer-friend' is set
