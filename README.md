# TanExpo Start

TanExpo Start is a starter application that showcases **cross-platform monorepo** that enables sharing **UI components, navigation primitives, and application features** between `Expo` and `TanStack Start`.

---

## ✨ Goals

- Share UI, navigation, and feature code between **native and web**
- Use **React Native components everywhere**
- Render identical UI on native and web
- Support **platform-specific files** only when required
- Maintain **one React / React Native version** across the entire repo
- Keep configuration predictable and contributor-friendly

---

## 🗂 Monorepo Structure

```
├─ apps/
│  ├─ native/        # Expo (React Native) app
│  └─ web/           # TanStack Start / Vite web app
│
├─ packages/
│  ├─ apps/      # Shared features, providers, etc.
│  ├─ ui/        # Design system, pure components, etc.
```

## 🧩 Component Strategy

### ✅ Platform-agnostic UI (default)

Platform-agnostic components should be the **default choice**.

They:
- Use only React Native primitives
- Contain no platform checks
- Render the same on native and web

```ts
// packages/ui/src/Button.tsx
import { Pressable, Text } from 'react-native'

export const Button = ({ label }) => (
  <Pressable>
    <Text>{label}</Text>
  </Pressable>
)
```

#### Rules

- `*.native.tsx`
  - Used for **native-only SDKs** (Expo APIs, native auth, sensors, etc.)
- `*.tsx`
  - Used for **platform-agnostic UI** or **web-specific implementations**
- Platform differences must be expressed via **file resolution only**

---

## 🧭 Cross-Platform Navigation

Uses TanExpo routing abstraction from expo-router

---

## 🔗 `<Link />`

The `Link` component works identically on **native and web**.

```ts
import { Link } from 'tanexpo'

<Link href="/about">
  Go to About
</Link>
```

### Dynamic routes

```ts
<Link
  href={{
    pathname: '/user/[id]',
    params: { id: 'bacon' }
  }}
>
  User Profile
</Link>
```

### Dynamic routes with query params

```ts
<Link
  href={{
    pathname: '/user/[id]',
    params: {
      id: 'bacon',
      tab: 'settings'
    }
  }}
>
  User Settings
</Link>
```

### Prefetching

Prefetching follows the **Expo Router API**, with additional hints supported on web.

```ts

<Link href="/feed" prefetch>
  Feed
</Link>

<Link href="/feed" prefetch="intent" /> 
<Link href="/feed" prefetch="viewport" /> 
```

- Native treats all `prefetch` values as `true`
- Web maps `prefetch` to TanStack Router `preload`

---

## 🧭 `useRouter()`

`useRouter()` provides imperative navigation with the same API on native and web.

```ts
import { useRouter } from 'tanexpo'

const router = useRouter()

router.push('/about')

router.push({
  pathname: '/user/[id]',
  params: { id: 'bacon' }
})

router.replace({
  pathname: '/user/[id]',
  params: { id: 'admin' }
})

router.navigate({
  pathname: '/user/[id]',
  params: { id: 'admin' }
})

router.back()
```

### Prefetching routes imperatively

```ts
router.prefetch('/feed')

router.prefetch({
  pathname: '/user/[id]',
  params: { id: 'bacon' }
})
```

---

## 🔍 `useLocalSearchParams()`

`useLocalSearchParams()` provides a **read-only, Expo-compatible API** for accessing **route params and query params** in shared screens.

It works identically on **native and web**, allowing shared code to read parameters without importing router-specific hooks.

```ts
import { useLocalSearchParams } from 'tanexpo'

const params = useLocalSearchParams()
```

### Reading dynamic route params

```ts
// Route: /user/[id]
const { id } = useLocalSearchParams()
```

### Reading query params

```ts
// URL: /user/bacon?tab=settings
const { tab } = useLocalSearchParams()
```

## 🔁 `<Redirect />`

The `<Redirect />` component provides an **Expo-compatible, declarative redirect API** for shared screens and layouts.

It works identically on **native and web**, allowing redirects without importing router-specific components or using imperative effects.

```ts
import { Redirect } from 'tanexpo'

<Redirect href="/login" />
```

### Replace behavior

```ts
<Redirect href="/home" replace />
```

### Dynamic redirects

```ts
<Redirect
  href={{
    pathname: '/user/[id]',
    params: { id: 'bacon' }
  }}
/>
```

---

## 🧠 Platform-Specific Resolution

Platform differences are handled **by file resolution**, not runtime logic.

```ts
// packages/ui/provider/Auth0Provider.tsx (web)
import { Auth0Provider } from '@auth0/auth0-react'
export { Auth0Provider }
```

```ts
// packages/ui/provider/Auth0Provider.native.tsx (native)
import { Auth0Provider } from 'react-native-auth0'
export { Auth0Provider }
```

Usage is **identical everywhere**:

```ts
import { Auth0Provider } from 'app/ui/provider/Auth0Provider'
```

---

## 🔒 Dependency Strategy (Very Important)

### Expo is the **version authority**

Expo dictates compatible versions for:
- `react`
- `react-dom`
- `react-native`
- `react-native-web`

These are **pinned in the root `package.json`** and shared across all apps and packages.

---

## 🧪 Version Consistency Check

```bash
pnpm check-versions
```

---

## 🚀 Running the App

### Native (Expo)

```bash
pnpm start
pnpm ios
pnpm android
```

### Web (TanStack Start / Vite)

```bash
pnpm dev
pnpm web:build
pnpm web:serve
```

</file>
