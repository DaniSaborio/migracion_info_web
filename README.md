# Portal Informativo para Personas Migrantes — Región Huetar Norte
**Trabajo Comunal Universitario (TCU-501A) & Proyecto Integrador III (ITI-823)**  
*Universidad Técnica Nacional (UTN) — Sede Regional San Carlos*  
*En articulación con la Asociación de Desarrollo Integral de Venecia (ADI Venecia)*

---

## Descripción General
El **Portal Informativo para Personas Migrantes** es una plataforma moderna desarrollada con **Next.js 14**, **Tailwind CSS** y capacidades de **Progressive Web App (PWA)**, diseñada bajo una arquitectura **Local-First / Zero-Knowledge** para brindar orientación rápida, segura, confidencial y gratuita sobre trámites migratorios, requisitos y sedes de apoyo en la Región Huetar Norte (San Carlos, Venecia, Aguas Zarcas, Upala y Los Chiles).

---

## Cumplimiento de Estándares para Cloudflare Pages (100% Gratuito)
El proyecto cumple estrictamente los estándares técnicos para el **Plan Gratuito Permanente (Free Tier)** de **Cloudflare Pages**:

| Criterio Técnico | Configuración en el Proyecto | Cumplimiento Cloudflare Free Tier |
| :--- | :--- | :--- |
| **Tipo de Despliegue** | **Static HTML Export** (`output: 'export'`) | **Ilimitado y Gratuito:** Sin costos de cómputo por Workers dinámicos ni KV. |
| **Carpeta de Salida** | `out/` | Estándar nativo de Cloudflare Pages para sitios estáticos. |
| **Comando de Build** | `npm run build` | Ejecuta la generación estática de todas las rutas (13/13 páginas pre-renderizadas). |
| **Optimización de Imágenes** | `images: { unoptimized: true }` | Cumple el estándar de exportación estática sin requerir servidor Node.js de imágenes. |
| **Enrutamiento** | `trailingSlash: true` | Previene errores 404 en el CDN sirviendo directorios `index.html` limpios. |
| **Ancho de Banda** | Ilimitado | Incluido en el plan gratuito de Cloudflare Pages. |
| **Certificado SSL / HTTPS** | TLS 1.3 automático | HSTS estricto y protección anti-DDoS sin costo adicional. |

### Pasos para conectar a Cloudflare Pages:
1. Conectar el repositorio GitHub en el panel de Cloudflare Pages.
2. Seleccionar:
   * **Framework preset:** `None` o `Next.js (Static Export)`.
   * **Build command:** `npm run build`
   * **Build output directory:** `out`
   * **Environment variables:** `NODE_VERSION` = `20`
3. Clic en **Save and Deploy**. El sitio queda activo en segundos con URL `*.pages.dev` y dominio personalizado gratuito.

---

## Arquitectura Local-First y Privacidad por Diseño
* **Cero Base de Datos Remota:** El portal no transmite ni almacena en servidores ningún dato de las personas usuarias (nombres, identificaciones, teléfonos ni estatus migratorio).
* **Persistencia en el Dispositivo:** La lista de chequeo de documentos y las preferencias de interfaz (alto contraste y tamaño de fuente) se gestionan 100% de manera local en el navegador mediante `window.localStorage`.
* **Disponibilidad Offline:** Gracias al Service Worker (`public/sw.js`), la aplicación se instala en teléfonos Android e iOS como PWA y puede consultarse en asentamientos rurales o fincas sin conexión celular ni paquete de datos.

---

## Módulos y Funcionalidades
1. **Orientador Inicial e Introducción Comunal (Inicio):** Bienvenida contextualizada para Venecia de San Carlos y diagnóstico rápido (*¿En cuál situación estás?*) con asistente interactivo (`OrientadorFormulario`) y 5 tarjetas que canalizan al trámite exacto.
2. **Catálogo de Guías:** 5 Guías oficiales con aranceles oficiales desglosados en USD y Colones (₡), cuenta bancaria oficial del Banco de Costa Rica (BCR: 242480-0) y advertencias contra fraudes:
   * Guía 1: Solicitud de Refugio (Gratuito).
   * Guía 2: Categoría Especial Temporal de Regularización (Resolución 2026).
   * Guía 3: Residencia por Vínculo de 1.er Grado con Costarricense.
   * Guía 4: Emisión y Renovación de DIMEX.
   * Guía 5: Seguro de Salud de la CCSS y Adscripción en EBAIS.
3. **Checklist Interactivo:** Casillas de verificación dinámicas, cálculo de porcentaje de avance en tiempo real, guardado automático y botón para imprimir o guardar resumen para la cita.
4. **Directorio Regional:** Filtro interactivo por cantón/distrito (Venecia, Aguas Zarcas, Ciudad Quesada, Upala, Los Chiles) con botón de llamada directa táctil (`tel:`) y enlaces a Google Maps.
5. **Líneas de Emergencia:** Acceso prioritario en un toque al 9-1-1, 1311 (citas DGME), ACNUR, INAMU y PANI.
6. **Accesibilidad:** Barra superior con ajuste de tamaño de letra y modo de alto contraste para lectura bajo luz solar directa.

---

## Balance General: Aciertos en Cambios Realizados y Cosas por Hacer

### ✅ Aciertos en Cambios Realizados (Portal Migrante y CanchaApp)
1. **Migración a Next.js 14 con Tailwind CSS y Exportación Estática (Cloudflare Pages Free Tier):**
   * Transformación hacia **Next.js 14 App Router** (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`), pre-renderizando las 13 rutas estáticas en `out/` con costo de alojamiento perpetuo **$0.00**.
2. **Privacidad por Diseño (Local-First / Zero-Knowledge):**
   * Cero transmisión de datos personales o estatus migratorio a servidores externos; toda la lista de chequeo y preferencias visuales residen únicamente en `window.localStorage`.
3. **Introducción Comunal y Asistente Interactivo de Diagnóstico (`OrientadorFormulario.jsx`):**
   * Incorporación de bienvenida comunitaria para **Venecia de San Carlos y la Región Huetar Norte** y asistente paso a paso que diagnostica la situación del usuario y recomienda el trámite y sedes de apoyo exactas.
4. **Migración Integral de Emojis a Iconografía Vectorial (`react-icons`):**
   * Reemplazo total de emojis del sistema por iconos vectoriales de **FontAwesome 6 (`react-icons/fa6`)** y **Material Design (`react-icons/md`)** en todos los componentes y vistas (`Header`, `BottomNav`, `OrientadorFormulario`, `GuiaDetailClient`, `guias`, `requisitos`, `directorio`, `emergencias`).
5. **Servidor de Previsualización Estática Resiliente (`preview.js`) e Higiene Git:**
   * Servidor HTTP local para `npm start` y `npm run preview` con detección automática de puerto ocupado (`EADDRINUSE`) y reintento en el siguiente puerto libre, además de excluir `.next/` y `out/` en `.gitignore`.
6. **Sinergia con `CanchaApp` (App de Reservas de la ADI Venecia):**
   * En la aplicación hermana de gestión de reservas de la cancha sintética (`app-reservas-cancha-sintetica`), se implementó el flujo completo de reserva en 3 pasos sin colisiones (`HTTP 409`), dashboard contable (SINPE vs. Efectivo), centrado visual de selectores de calendario (Día, Semana y Mes) y blindaje integral bajo los 10 controles del estándar **OWASP Top 10:2025** (`src/lib/security.js`, `public/_headers`, RBAC, CSPRNG, Anti-Brute Force y Anti-CSV Injection).

### 📌 Cosas por Hacer (Backlog / Mejoras Futuras)
- [ ] **Soporte Multilenguaje e Internacionalización (i18n):** Traducir las guías, el orientador y el directorio a **Inglés, Francés y Criollo Haitiano (Kreyòl Ayisyen)** para atender a poblaciones migrantes no hispanohablantes en la Región Huetar Norte.
- [ ] **Guías en Audio (Text-to-Speech / Locución Offline):** Integrar síntesis de voz nativa (`Web Speech API` o pistas de audio offline) en cada paso de los trámites y del checklist para personas con baja escolaridad, barreras de lectura o discapacidad visual.
- [ ] **Exportación Nativa de Checklist en PDF Descargable:** Añadir generación local de documentos PDF en el navegador para guardar o compartir por WhatsApp la lista de requisitos marcados sin depender únicamente de `window.print()`.
- [ ] **Homologación del Blindaje OWASP Top 10:2025:** Incorporar el archivo `public/_headers` (con políticas `CSP`, `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`), sanitización `safeJsonParse` y protección Anti-Path Traversal en `preview.js`, replicando el blindaje aplicado en `CanchaApp`.
- [ ] **Mapa Offline y Rutas de Transporte Público Regional:** Integrar croquis offline de ubicación de sedes en Venecia, Aguas Zarcas, Ciudad Quesada, Upala y Los Chiles con indicaciones de rutas de autobuses locales.
- [ ] **Actualización Automatizada del Tipo de Cambio BCCR y Aranceles:** Sincronizar periódicamente los montos en colones (₡) según el tipo de cambio oficial del BCCR y nuevas resoluciones de la DGME/CCSS.

---

## Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar compilación estática de producción para Cloudflare Pages
npm run build

# Iniciar servidor de vista previa estática (out/)
npm start
```

---

## Autor y Créditos
* **Estudiante:** Daniel Gerardo Saborío Rodríguez — Cédula: 208560812
* **Tutor Académico:** Juan Luis Gutiérrez Chaves
* **Comunidad Beneficiaria:** Venecia de San Carlos, Alajuela, Costa Rica
