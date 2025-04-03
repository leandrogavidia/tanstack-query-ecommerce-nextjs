# NextStore - Plataforma de E-commerce

NextStore es una plataforma de e-commerce moderna desarrollada con Next.js, React Query y Tailwind CSS. Ofrece una experiencia de compra fluida y atractiva con características avanzadas como carrito de compras, sistema de favoritos, autenticación de usuarios, y optimizaciones de rendimiento.

## 🌐 Demo

[Ver Demo](https://tanstack-query-ecommerce-nextjs-22or.vercel.app)

## 🚀 Instrucciones para Ejecutar Localmente

### Requisitos Previos
- Node.js 18.18.0 o superior
- npm o yarn

### Pasos para Instalación

1. **Clonar el repositorio**
    ```bash
    git clone <repo-url>

    cd nextstore
    ```
2. **Instalar dependencias**
    ```
    npm install
    ```
3. **Configurar archivo .env**
    ```
    NEXT_PUBLIC_API_PATH="https://fakestoreapi.com" # API url para obtención de productos para el E-Commerce
    NEXT_PUBLIC_ANALYTICS_TOOLS="true" # Herramientas de analítica activadas
    NEXT_PUBLIC_BASE_URL="http://localhost:3000" # URL base para el E-Commerce
    OPENAI_API_KEY="<your-api-key>" # API Key de OpenAI para el uso del chatbot
    ```
4. **Ejecutar el proyecto**
    ```
    npm run dev
    ```

## 📋 Características Implementadas

### Funcionalidades Principales
- **Catálogo de Productos**: Visualización de productos con filtrado por categorías y paginación
- **Detalles de Producto**: Vista detallada con imágenes, descripción, selección de tallas y colores
- **Carrito de Compras**: Añadir, eliminar y actualizar productos en el carrito
- **Sistema de Favoritos**: Guardar productos favoritos para futuras compras
- **Autenticación de Usuarios**: Registro e inicio de sesión
- **Perfil de Usuario**: Gestión de información personal y preferencias
- **Historial de Pedidos**: Visualización de pedidos anteriores
- **Diseño Responsivo**: Experiencia optimizada para dispositivos móviles y escritorio
- **Tema Claro/Oscuro**: Cambio de tema según preferencia del usuario
- **Chatbot de IA**: Asistente virtual para ayudar a los usuarios

### Optimizaciones Técnicas
- **React Query**: Gestión eficiente de estado y caché para datos del servidor
- **Prefetching**: Precarga de datos para mejorar la experiencia de navegación
- **Lazy Loading**: Carga diferida de componentes y recursos
- **Memoización**: Prevención de renderizados innecesarios
- **Optimización de Imágenes**: Carga progresiva y formatos optimizados
- **Análisis de Rendimiento**: Monitoreo de Web Vitals y métricas de rendimiento
- **Virtualización**: Renderizado eficiente de listas largas

## ⚙ Decisiones técnicas y arquitectónicas

Para este proyecto, se empleó la suite completa de servicios y productos ofrecidos por Vercel, con el objetivo de optimizar el rendimiento y la experiencia del usuario. Las herramientas y tecnologías utilizadas fueron las siguientes:

* **Next.js (versión 15) con App Router**: Se seleccionó este framework para aprovechar sus características modernas y optimizaciones web.
* **Tailwind CSS (versión 4)**: Se implementó para beneficiarse de las mejoras recientes en rendimiento y experiencia de desarrollo.
* **React Query**: Se utilizó para gestionar de manera eficiente las solicitudes asíncronas en la aplicación web.
* **Shadcn UI**: Se integró para agilizar la maquetación y asegurar un alto nivel de responsividad.
* **Vercel v0**: Esta herramienta fue fundamental para tomar decisiones técnicas informadas y corregir errores durante el desarrollo.
* **Vercel AI SDK**: Se implementó para crear un chatbot conectado a la API de FakeStore, proporcionando así una experiencia personalizada a los usuarios.
* **Servicio de despliegue de Vercel**: Finalmente, se utilizó este servicio para desplegar la aplicación web de manera eficiente."

## ⚙ Retos enfrentados

Los principales desafíos durante el desarrollo se centraron en la gestión y persistencia de datos, buscando mantener un rendimiento óptimo en todo momento.

Otro reto significativo fue la escalabilidad del proyecto, asegurando una arquitectura robusta sin comprometer las ventajas de cada herramienta utilizada.

Para superar estos obstáculos, se recurrió a la documentación oficial de cada tecnología y se utilizaron herramientas de inteligencia artificial para obtener diversas perspectivas y soluciones.