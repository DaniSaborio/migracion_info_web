# Portal Informativo para Personas Migrantes — Región Huetar Norte
**Trabajo Comunal Universitario (TCU-501A) & Proyecto Integrador III (ITI-823)**  
*Universidad Técnica Nacional — Sede Regional San Carlos*  
*En colaboración con la Asociación de Desarrollo Integral de Venecia (ADI Venecia)*

---

## 📌 Descripción General
El **Portal Informativo para Personas Migrantes** es una Aplicación Web Progresiva (**PWA**) diseñada bajo principios de arquitectura **Local-First** y **Zero-Knowledge**, con el objetivo de brindar acceso directo, gratuito y comprensible a los requisitos, aranceles bancarios oficiales y pasos de los principales trámites migratorios y de salud en Costa Rica.

---

## 🔒 Principio de Privacidad Absoluta por Diseño
* **Cero Base de Datos Remota:** La aplicación no cuenta con base de datos en servidores ni recopila nombres, identificaciones, teléfonos ni estatus migratorio.
* **Persistencia Local Segura:** Las casillas marcadas en la lista de chequeo (*checklist*) y las preferencias de visualización se serializan y resguardan exclusivamente en el dispositivo del usuario a través de la API `window.localStorage`.
* **Capacidad 100% Desconectada (Offline):** El Service Worker implementa una estrategia *Cache-First*, permitiendo que las guías de trámites, números de emergencia y directorios funcionen permanentemente aun sin señal celular ni paquete de datos en zonas rurales (fincas y asentamientos de la Región Huetar Norte).

---

## 🚀 Módulos Funcionales Implementados
1. **P1 — Orientador Inicial:** Árbol de decisiones interactivo ("¿En cuál situación estás?") que canaliza a la guía correspondiente.
2. **P2, P3, P4 — Guías Oficiales Paso a Paso:**
   * Guía 1: Solicitud de Refugio.
   * Guía 2: Categoría Especial Temporal de Regularización (Resolución 2026).
   * Guía 3: Residencia por Vínculo de Primer Grado con Costarricense.
   * Guía 4: Emisión y Renovación de Documento DIMEX.
   * Guía 5: Seguro de Salud de la CCSS y Adscripción en EBAIS.
3. **P5 — Checklist Interactivo:**
   * Casillas de verificación dinámicas con cálculo de porcentaje de avance en tiempo real.
   * Guardado automático en el teléfono móvil.
   * Opción de restablecer la lista y generación de resumen imprimible.
4. **P6, P7, P8 — Directorio Regional de Sedes:**
   * Filtro por cantón/distrito (San Carlos, Venecia, Aguas Zarcas, Ciudad Quesada, Upala, Los Chiles).
   * Botón táctil de llamada directa (`tel:`) y enlace geolocalizado en mapas (`geo:` / Google Maps).
5. **P9 — Líneas de Emergencia:**
   * Acceso inmediato a líneas 911, 1311 (Citas Migración), ACNUR, INAMU, PANI y Fuerza Pública.

---

## 🛠️ Tecnologías Utilizadas
* **Frontend:** HTML5 Semántico, CSS3 modular (Tailwind-compatible) y JavaScript ES6+.
* **Offline / PWA:** Service Worker (Cache API) y Web App Manifest.
* **Almacenamiento Local:** Web Storage API (`localStorage`).
* **Alojamiento:** Preparado para despliegue directo de costo cero en **Cloudflare Pages** o GitHub Pages.

---

## 💻 Ejecución Local
Al tratarse de una arquitectura Jamstack sin dependencias complejas de compilación:

```bash
# Iniciar servidor local con Python
python3 -m http.server 3000

# O usando cualquier servidor estático Node.js
npx serve .
```

Abra su navegador en: `http://localhost:3000`

---

## 👨‍💻 Autor y Créditos
* **Estudiante:** Daniel Gerardo Saborío Rodríguez — Cédula: 208560812
* **Tutor Académico:** Juan Luis Gutiérrez Chaves
* **Comunidad Beneficiaria:** Venecia, San Carlos, Costa Rica
