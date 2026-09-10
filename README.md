# Maison Christoffel — Restaurant Menu App
# mast-part2-MY-Maison-Christoffel-restaurant-
MAST PART 2 -Maison christoffel restaurant app
#  By Itumeleng Ndlovu

A React Native (Expo) mobile app for managing a restaurant's chef menu —
browse dishes by course, view detailed "dish dossiers," and add, edit, or
remove menu items.

---

## Features

- **Splash / Welcome screen** — branded landing screen with a call to action
  into the app.
- **Login screen** — email/password sign-in (no backend auth; any
  non-empty email and password logs you in, matching the scope of this
  assignment).
- **Chef's Menu** — full dish list with filter pills (All Courses, Starter,
  Main, Dessert), showing name, course tag, short description, price, and
  a thumbnail image for each dish.
- **Item Detail (Dish Dossier)** — full dish view with image, price,
  preparation notes, and Edit / Delete actions.
- **Add New Dish** — form to create a new menu item (name, description,
  price, course).
- **Edit Dish** — same form, pre-filled, for updating an existing item.
- **Delete Dish** — with a confirmation prompt before removing an item.

---

## Tech Stack

Layer           Choice                                        

 Framework - React Native via Expo                          
 Language - TypeScript                                     
Navigation -  @react-navigation/native-stack                 
State -  React Context (`MenuContext`) — in-memory only 
Styling -React Native `StyleSheet` (no external UI kit) 
 Web preview - react-dom + react-native-web                   



## Project Structure

```
MyMaisonChristoffelRestaurantApp/
├── App.tsx                     # Navigation stack + MenuProvider wrapper
├── types.ts                    # Course, Dish, COURSES
├── navigation/
│   └── types.ts                # RootStackParamList (route + param types)
├── theme/
│   └── colors.ts                # colors + fonts used across all screens
├── context/
│   └── MenuContext.tsx          # dish state, CRUD functions, seed data
└── screens/
    ├── SplashScreen.tsx         # Welcome / landing screen
    ├── LoginScreen.tsx          # Sign up / login
    ├── ChefMenu.tsx              # Menu list with course filters
    ├── ItemDetailScreen.tsx     # Dish Dossier (view/edit/delete entry)
    ├── DishForm.tsx              # Shared form used by Add + Edit screens
    ├── AddDishScreen.tsx        # Wraps DishForm for creating a dish
    └── EditDishScreen.tsx       # Wraps DishForm for editing a dish
```

---

## Prerequisites

- Node.js (LTS recommended) and npm
- Expo Go app on your phone (iOS or Android) — to run the app on a real
  device, **or** a simulator/emulator set up locally
- VS Code (or any editor) with the TypeScript extension for inline
  type-checking

---

## Setup

1. **Open the project root in your terminal** — the folder that directly
   contains `package.json`:
   ```
   cd path/to/MyMaisonChristoffelRestaurantApp
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Install navigation + supporting packages** (if not already present
   in `package.json`):
   ```
   npx expo install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   npm install --save-dev @types/node
   ```

4. **Install web preview support** (only needed if you want to press `w`
   for a browser preview — not required for running on a phone or
   emulator):
   ```
   npx expo install react-dom react-native-web
   ```

5. **Start the dev server:**
   ```
   npx expo start
   ```
   - Scan the QR code with Expo Go on your phone (phone must be on the
     same network as this machine — on a cloud VM this may not work
     without tunneling), **or**
   - Press `w` in the terminal to open a web preview, **or**
   - Press `a` / `i` for an Android/iOS simulator (if configured).

---

## Navigation Flow

```
Splash → Login → ChefMenu ──┬──> ItemDetail ──> EditDish ──> ItemDetail
                             └──> AddDish ──> ChefMenu
```

- `Splash` → `Login` (replace, no back button)
- `Login` → `ChefMenu` (replace, no back button)
- `ChefMenu` → `ItemDetail` (tap a dish row)
- `ChefMenu` → `AddDish` (tap the floating **+** button)
- `ItemDetail` → `EditDish` (tap **Edit Item**)
- `ItemDetail` → deletes and returns to `ChefMenu` (tap **Delete Item**,
  confirm)
- `AddDish` / `EditDish` → returns to `ChefMenu` / `ItemDetail` on save,
  or back on cancel



## Known Limitations

- **No persistence** — all dishes reset to the seed list on app restart.
  To persist data, swap `MenuContext`'s `useState` for `AsyncStorage` or a
  real backend.
- **No real authentication** — the login screen doesn't validate
  credentials against anything; it's a UI-only gate.
- **Images are remote URLs**, not bundled local assets, so the app needs
  an internet connection to display dish photos.



## Credits

Design reference: "Maison Christoffel" mobile app figma (Cape Town /
Franschhoek), including Welcome, Sign Up/Login, Chef's Menu, Dish Dossier,
and Add New Dish screens.



# images

<img width="1605" height="891" alt="Screenshot 2026-09-10 141635" src="https://github.com/user-attachments/assets/6571e916-9720-4181-b13f-71fd47de4742" />
<img width="1605" height="891" alt="Screenshot 2026-09-10 141635" src="https://github.com/user-attachments/assets/f71ee0e9-7df0-40c5-999f-8fa51a8bdb08" />
<img width="1605" height="891" alt="Screenshot 2026-09-10 141635" src="https://github.com/user-attachments/assets/9008a65a-3e96-4af0-bc31-3ba086d4c5ec" />
<img width="1612" height="905" alt="2" src="https://github.com/user-attachments/assets/339e95a4-1dd7-4b37-88c2-4b6ee890ae73" />
<img width="1602" height="786" alt="6" src="https://github.com/user-attachments/assets/ce2bd2b3-3892-4765-9e6e-51594dc58707" />
<img width="1612" height="892" alt="menu" src="https://github.com/user-attachments/assets/9be1b911-02ec-4b65-ad02-cf32a40155c3" />
<img width="1642" height="948" alt="resturant" src="https://github.com/user-attachments/assets/d55e35e0-2e17-4543-a08f-1a31a5fd8207" />
<img width="1442" height="883" alt="Screenshot 2026-09-10 135124" src="https://github.com/user-attachments/assets/6fc38e0c-3142-45b5-b004-dfef5cccd92d" />
<img width="1643" height="949" alt="Screenshot 2026-09-10 135138" src="https://github.com/user-attachments/assets/25ce0465-2a63-4ee4-b325-8daee4151628" />
<img width="1612" height="893" alt="Screenshot 2026-09-10 135219" src="https://github.com/user-attachments/assets/e5a89786-a907-4209-aae7-04ac400dc729" />
<img width="1629" height="914" alt="Screenshot 2026-09-10 135253" src="https://github.com/user-attachments/assets/96bf3e94-737b-4d28-8229-3a4d5addb39f" />
<img width="1612" height="905" alt="Screenshot 2026-09-10 135316" src="https://github.com/user-attachments/assets/c2f26fb4-9ab9-4416-8cf2-a22b2e624293" />
<img width="1600" height="891" alt="Screenshot 2026-09-10 135341" src="https://github.com/user-attachments/assets/fb7c5a5b-b443-4dbe-bc82-aab46267b9fc" />
<img width="1603" height="786" alt="Screenshot 2026-09-10 135427" src="https://github.com/user-attachments/assets/3377db2c-dab2-42a0-96d7-8c981b7456df" />
<img width="1600" height="891" alt="3" src="https://github.com/user-attachments/assets/9ade2d4a-d724-4ca5-b8cb-cb0715d2b5e6" />
<img width="1612" height="905" alt="2" src="https://github.com/user-attachments/assets/70d6dad6-16b3-440b-b9d4-acbd798431d6" />
<img width="1628" height="913" alt="1" src="https://github.com/user-attachments/assets/f7c9582b-1e92-4ccf-86e8-e47a4b21cfb1" />
