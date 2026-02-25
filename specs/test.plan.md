# Test Plan

## Application Overview

PLM Viewer is a React-based product and material discovery application used by Pandora Jewellery product teams. It allows users to search for products or materials, apply personalized filters and views, manage cycles (seasons) via tabs, and export data to Excel. The app includes complex modals for configuring filters and table views, a toggle between table and card display modes, and supports product/detail navigation. It is built with React, Ant Design, Vite, and uses APIs to fetch filter values, products, materials, and personalized configurations.

## Test Scenarios

### 1. Discovery Home Page - Products

**Seed:** `tests/seed.spec.ts`

#### 1.1. Tab management and navigation

**File:** `specs/discovery/tabManagement.spec.ts`

**Steps:**
  1. Open the application and confirm the default season tab is displayed
    - expect: The tab bar at the bottom shows a tab labelled with the first cycle name (e.g. "Discovery").
  2. Hover over the plus (+) icon to add a new cycle; select an available season from the pop‑over list
    - expect: A new tab is created with the selected season name and becomes active.
  3. Click the settings icon on a season tab and choose "Refresh Tab"
    - expect: The contents of the active tab reload (filters reset, table/card cleared).
  4. Click the settings icon and choose "Close Tab" on a season other than the last remaining one
    - expect: The tab is removed and another tab becomes active (previous or first).
  5. Attempt to add more cycles than the maximum allowed (6)
    - expect: The add button is hidden when six tabs exist.
  6. Drag‑and‑drop tabs to reorder them
    - expect: Tab order changes visually and remains after a page reload.

#### 1.2. Search and filter workflow

**File:** `specs/discovery/searchFilter.spec.ts`

**Steps:**
  1. Type a keyword into the search input and press Enter
    - expect: The search value updates and the "Apply Search & Filter" button becomes enabled.
  2. Click "Apply Search & Filter"
    - expect: The table/card updates to show results matching keyword.
  3. Select a personalized filter from dropdown
    - expect: The list of dynamic filter controls appears (or updates) according to the selected filter.
  4. Click the expand/collapse toggle
    - expect: Filter panel hides or shows accordingly and animation occurs.
  5. Choose values for one of the dynamic filters and apply search
    - expect: Results are filtered appropriately and the URL or request payload contains the filter parameters.

#### 1.3. Personalized view selection

**File:** `specs/discovery/viewSelection.spec.ts`

**Steps:**
  1. Open view dropdown and select an alternative view
    - expect: The table column set updates to match the view configuration.
  2. Open the view settings modal by clicking its settings icon
    - expect: Modal titled "My View Settings" appears.

#### 1.4. Display options toggles

**File:** `specs/discovery/displayOptions.spec.ts`

**Steps:**
  1. Change display level to "Colorway"
    - expect: The data rendering updates accordingly (e.g. product/colour separation).
  2. Switch display mode to card
    - expect: The grid of cards appears, and table is hidden.
  3. Switch back to table
    - expect: Table re‑appears with the same filters and sort state.

#### 1.5. Export functionality

**File:** `specs/discovery/export.spec.ts`

**Steps:**
  1. Click the Excel export button in table mode
    - expect: A confirmation modal warns about the maximum limit.
  2. Cancel the confirmation
    - expect: No file is downloaded and no request is sent.
  3. Confirm the export
    - expect: An Excel file download is initiated and the request payload respects search/filter/sort settings.

#### 1.6. Table interactions

**File:** `specs/discovery/tableInteractions.spec.ts`

**Steps:**
  1. Click on a column header to sort ascending
    - expect: Data sorts accordingly and the API request includes sort parameters.
  2. Click on a table row
    - expect: Product detail page opens in a new tab or the product tab is added.
  3. Resize a column by dragging the resize handle
    - expect: Column width changes visually and persists if table is re‑rendered.
  4. Navigate through pagination controls
    - expect: Page numbers change and new data loads.

#### 1.7. Card interactions

**File:** `specs/discovery/cardInteractions.spec.ts`

**Steps:**
  1. Switch to card mode and click a product card
    - expect: Product detail opens similarly to table row.
  2. Use pagination at bottom of cards
    - expect: Cards update and the clicked-product highlight moves appropriately.

### 2. Filter Settings Modal

**Seed:** `tests/seed.spec.ts`

#### 2.1. Create a new personalized filter

**File:** `specs/settings/filterCreate.spec.ts`

**Steps:**
  1. Open filter settings modal from Home page
    - expect: Modal titled "My Filter Settings" is visible at step 1.
  2. Select several attributes from the list and proceed to next step
    - expect: Selected attributes appear in preview and step advances.
  3. Provide a unique filter name and save
    - expect: Modal closes, success message shown, new filter appears in personalized filter dropdown.

#### 2.2. Edit existing filter

**File:** `specs/settings/filterEdit.spec.ts`

**Steps:**
  1. Open filter settings modal and click "Edit" on a personal filter
    - expect: Modal populates with selected filter details in form.
  2. Change one of the attributes or the name and save
    - expect: Changes persist in dropdown and filters behave accordingly.

#### 2.3. Delete a personalized filter

**File:** `specs/settings/filterDelete.spec.ts`

**Steps:**
  1. Open modal and click delete on a personal filter
    - expect: Confirmation prompt appears and, after confirming, filter is removed from list.

#### 2.4. Default filter behavior

**File:** `specs/settings/filterDefault.spec.ts`

**Steps:**
  1. Toggle default switch on two different filters
    - expect: Only one filter remains selected as default; selection persists after reload.

#### 2.5. Validation and errors

**File:** `specs/settings/filterValidation.spec.ts`

**Steps:**
  1. Attempt to save a filter without a name
    - expect: Validation error message appears next to name field.
  2. Attempt to save a filter with a duplicate name
    - expect: Error message "Name is duplicated!" displays.

### 3. View Settings Modal

**Seed:** `tests/seed.spec.ts`

#### 3.1. Create a new personalized view

**File:** `specs/settings/viewCreate.spec.ts`

**Steps:**
  1. Open view settings modal and select attributes
    - expect: Preview table updates with chosen columns.
  2. Change column order via drag‑and‑drop, choose a freeze column, provide a unique name and save
    - expect: Modal closes, new view available in dropdown and order reflects choices.

#### 3.2. Edit an existing view

**File:** `specs/settings/viewEdit.spec.ts`

**Steps:**
  1. Select "Edit" on a custom view, modify order/name, and save
    - expect: Changes take effect and preview updates accordingly.

#### 3.3. Delete a personalized view

**File:** `specs/settings/viewDelete.spec.ts`

**Steps:**
  1. Delete a personal view from within modal
    - expect: View is removed and default view resets if deleted.

#### 3.4. Default view toggling

**File:** `specs/settings/viewDefault.spec.ts`

**Steps:**
  1. Switch default status between views
    - expect: Only selected default persists.

#### 3.5. Validation and preview errors

**File:** `specs/settings/viewValidation.spec.ts`

**Steps:**
  1. Try to save view without attributes or name
    - expect: Appropriate validation errors appear.

### 4. Material Page Workflows

**Seed:** `tests/seed.spec.ts`

#### 4.1. Navigate to material page

**File:** `specs/material/materialNavigation.spec.ts`

**Steps:**
  1. Click material tab or navigate via URL to /material
    - expect: Material page loads with filter and view controls similar to products.

#### 4.2. Search & filter materials

**File:** `specs/material/materialSearchFilter.spec.ts`

**Steps:**
  1. Enter keyword, select a material filter, apply search
    - expect: Results update according to criteria.

#### 4.3. Export materials to Excel

**File:** `specs/material/materialExport.spec.ts`

**Steps:**
  1. Attempt material export and cancel/confirm
    - expect: Works identically to product export with limit warning.

### 5. Product Tabs Page

**Seed:** `tests/seed.spec.ts`

#### 5.1. Open product detail tabs

**File:** `specs/product/productTabs.spec.ts`

**Steps:**
  1. From any product or material row click and verify a new product tab opens
    - expect: Tab bar shows a tab for the product.
    - expect: Clicking the tab makes its content active.
  2. Drag tabs to reorder and close them
    - expect: Tabs reorder and removal updates active state correctly.
