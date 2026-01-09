# Fix React Native Web FOUC in TanStack Start by Aligning AppRegistry With SSR

## Summary

React Native Web styles were being applied **after hydration**, causing a
Flash of Unstyled Content (FOUC). After removing layout FOUC, a **font-only FOUC**
was still visible.

This was resolved by aligning **AppRegistry usage**, **server-side rendering**,
and **client hydration** under a single mental model.

---

## The Mental Model (Key Insight)

React Native Web is **not CSS-first** like typical web frameworks.

Instead:

- Styles are generated **at runtime**
- Style injection is coordinated via `AppRegistry`
- If styles are not collected during SSR, they are injected later during hydration

This leads to:
- Font swaps
- Layout flashes
- Hydration mismatches

Inline styles alone are **not sufficient**.

---

## Correct Mental Model

Think of React Native Web like this:

```
AppRegistry ≈ ReactDOM.createRoot
```

This implies:

1. Register **exactly one root application**
2. Use the **same registration name** on:
   - the server
   - the client
3. Extract React Native Web styles **during SSR**
4. Hydrate using the same component tree

If any of these steps are misaligned, FOUC will occur.

---

## What Was Changed

### 1. Client Entry (`entry-client.tsx`)

The app is registered with `AppRegistry` before hydration.

```ts
AppRegistry.registerComponent("Main", () => () => (
  <StartClient router={router} />
));

hydrateRoot(document, <StartClient router={router} />);
```

---

### 2. Server Entry (`entry-server.tsx`)

The same app name is registered on the server.

```ts
AppRegistry.registerComponent("Main", () => () => (
  <StartServer router={ctx.router} />
));
```

---

### 3. Root Document (`__root.tsx`)

During SSR only, React Native Web styles are extracted and injected into `<head>`.

```ts
const { getStyleElement } = AppRegistry.getApplication("Main");
styles = getStyleElement();
```

Fallback logic using `StyleSheet.getSheet()` ensures robustness.

---

## Why This Works

- `View` and `Text` components depend on RN Web’s runtime style system
- RN Web injects default styles (fonts, normalization) only through `AppRegistry`
- Extracting styles during SSR ensures the browser paints with final styles immediately

---

## What This Avoids

- ❌ Registering every screen
- ❌ Using `useEffect` or hydration hacks
- ❌ Disabling SSR
- ❌ Hiding content until hydrate
- ❌ Custom font workarounds

---

## Rule of Thumb

> If you render **any** `react-native-web` components (`View`, `Text`, etc.)
> with SSR, you must extract React Native Web styles on the server using
> `AppRegistry`.

---

## Result

- ✅ FOUC resolved
- ✅ Fonts stable on first paint
- ✅ SSR and hydration fully aligned
- ✅ Matches Solito behavior without Next.js-specific APIs
