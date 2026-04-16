# Product Showcase App - Case Study Walkthrough

## 1. Objective
Build a mobile application using React Native that allows users to manage a small catalog of products (up to 5), focusing on a clean UI, smooth UX, and robust local state management.

## 2. Technical Stack
- **Framework**: Expo (React Native)
- **State Management**: Redux Toolkit
- **Icons**: Lucide React Native
- **Image Handling**: Expo Image Picker
- **UI Enhancements**: Expo Linear Gradient, React Native Safe Area Context, React Native Toast Message
- **Styling**: Standard StyleSheet with a centralized theme system

## 3. Architecture & Approach

### State Management
I chose **Redux Toolkit** over standard Context API to demonstrate scalability and professional state management practices. 
- **Slice Logic**: The `productSlice` handles adding and removing products. It contains built-in validation to prevent adding more than 5 items, ensuring the business rule is enforced at the data layer.
- **Global Store**: Centralized store that provides a single source of truth for the product list across the app.

### Premium UI/UX Design
- **Safe Area Integration**: Used `react-native-safe-area-context` to ensure the UI respects device notches and home indicators, fixing common layout issues on modern edge-to-edge displays.
- **Visual Depth**: Implemented `expo-linear-gradient` to add subtle depth to buttons and empty states, giving the app a "Premium" feel.
- **Progress Tracking**: Added a visual progress bar in the header to give users immediate feedback on their product limit status.
- **Theme System**: Implemented a `colors.js` theme file to ensure visual consistency (Indigo/Slate palette).
- **Responsive Layout**: Used `SafeAreaView` and flexible layouts to ensure the app looks great on both iOS and Android.
- **Feedback Loops**:
    - **Empty State**: A dedicated view when no products exist to guide the user.
    - **Limit Notification**: When the 5-product limit is reached, the "Add" button is disabled, a warning banner appears, and a native Alert is triggered.
    - **Animations**: Integrated `LayoutAnimation` for smooth transitions when adding or deleting items.

### Key Components
- `HomeScreen`: The main dashboard featuring a summary header and a list of products.
- `ProductCard`: A clean, card-based representation of each product with an integrated delete action.
- `AddProductModal`: A bottom-sheet style modal for data entry, providing a focused environment for the user.

## 4. Implementation Details
- **Image Upload**: Utilizes `expo-image-picker` to access the device gallery, providing a seamless way to attach photos.
- **Form Validation**: Checks for missing fields and ensures price is a valid number before allowing submission.
- **Limit Logic**: 
  ```javascript
  // In productSlice.js
  if (state.items.length < 5) {
    state.items.push(action.payload);
  }
  ```

## 5. Conclusion
This approach prioritizes maintainability and user experience. By using Redux Toolkit and a structured component architecture, the app is ready for future feature expansions while remaining lightweight and intuitive for the end-user.
