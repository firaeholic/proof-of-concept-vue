<template>
  <div class="viewport-demo">
    <h1>📱 Viewport & Orientation Demo</h1>
    
    <!-- Current viewport info -->
    <div class="viewport-info">
      <p><strong>Width:</strong> {{ width }}px | <strong>Height:</strong> {{ height }}px | <strong>Orientation:</strong> {{ orientation }}</p>
    </div>

    <!-- Device type display -->
    <div class="device-display">
      <div v-if="isMobilePortrait" class="device-card mobile-portrait">
        📲 Mobile Portrait
      </div>
      <div v-else-if="isMobileLandscape" class="device-card mobile-landscape">
        📲 Mobile Landscape
      </div>
      <div v-else-if="isTabletPortrait" class="device-card tablet-portrait">
        📱 Tablet in Portrait
      </div>
      <div v-else-if="isTabletLandscape" class="device-card tablet-landscape">
        📱 Tablet in Landscape
      </div>
      <div v-else-if="isDesktop" class="device-card desktop">
        🖥️ Desktop
      </div>
    </div>

    <!-- Breakpoint indicators -->
    <div class="breakpoint-indicators">
      <div class="indicator" :class="{ active: isMobile }">
        Mobile (≤767px): {{ isMobile ? '✅' : '❌' }}
      </div>
      <div class="indicator" :class="{ active: isTablet }">
        Tablet (768-1028px): {{ isTablet ? '✅' : '❌' }}
      </div>
      <div class="indicator" :class="{ active: isDesktop }">
        Desktop (>1028px): {{ isDesktop ? '✅' : '❌' }}
      </div>
    </div>

    <!-- Responsive content example -->
    <div class="responsive-content">
      <h2>Responsive Content Example</h2>
      <div v-if="isMobile" class="mobile-content">
        <p>📱 This content is optimized for mobile devices</p>
        <button class="btn-mobile">Mobile Action</button>
      </div>
      <div v-else-if="isTablet" class="tablet-content">
        <p>📱 This content is optimized for tablets</p>
        <div class="tablet-grid">
          <button class="btn-tablet">Tablet Action 1</button>
          <button class="btn-tablet">Tablet Action 2</button>
        </div>
      </div>
      <div v-else class="desktop-content">
        <p>🖥️ This content is optimized for desktop</p>
        <div class="desktop-grid">
          <button class="btn-desktop">Desktop Action 1</button>
          <button class="btn-desktop">Desktop Action 2</button>
          <button class="btn-desktop">Desktop Action 3</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useViewport } from '../composables/useViewport'

// Destructure all the reactive properties from the composable
const {
  width,
  height,
  orientation,
  isMobile,
  isTablet,
  isDesktop,
  isMobilePortrait,
  isMobileLandscape,
  isTabletPortrait,
  isTabletLandscape
} = useViewport()
</script>

<style scoped>
.viewport-demo {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.viewport-info {
  background: #f0f8ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #007acc;
}

.device-display {
  margin: 20px 0;
  text-align: center;
}

.device-card {
  display: inline-block;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.mobile-portrait {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.mobile-landscape {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.tablet-portrait {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.tablet-landscape {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.desktop {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.breakpoint-indicators {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.indicator {
  padding: 10px 15px;
  border-radius: 6px;
  background: #f5f5f5;
  border: 2px solid #ddd;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #e8f5e8;
  border-color: #4caf50;
  color: #2e7d32;
}

.responsive-content {
  margin-top: 30px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}

.mobile-content,
.tablet-content,
.desktop-content {
  text-align: center;
}

.tablet-grid {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.desktop-grid {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
}

.btn-mobile {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-mobile:hover {
  background: #5a6fd8;
}

.btn-tablet {
  background: #4facfe;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-tablet:hover {
  background: #3d8bfe;
}

.btn-desktop {
  background: #fa709a;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-desktop:hover {
  background: #f8588a;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .viewport-demo {
    padding: 15px;
  }
  
  .device-card {
    padding: 15px 25px;
    font-size: 1.2em;
  }
  
  .breakpoint-indicators {
    flex-direction: column;
  }
  
  .tablet-grid,
  .desktop-grid {
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 768px) and (max-width: 1028px) {
  .desktop-grid {
    flex-wrap: wrap;
  }
}
</style>