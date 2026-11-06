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
1. **Orientador Inicial (Inicio):** Diagnóstico rápido (*¿En cuál situación estás?*) con 5 tarjetas interactivas que canalizan al trámite exacto.
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

## Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar compilación estática de producción para Cloudflare Pages
npm run build
```

---

## Autor y Créditos
* **Estudiante:** Daniel Gerardo Saborío Rodríguez — Cédula: 208560812
* **Tutor Académico:** Juan Luis Gutiérrez Chaves
* **Comunidad Beneficiaria:** Venecia de San Carlos, Alajuela, Costa Rica
