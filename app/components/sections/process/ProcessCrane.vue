<template>
  <div
    class="hidden lg:block absolute left-0 top-0 bottom-0 crane-container"
    :class="{ 'crane-active': active }"
  >
    <div class="crane">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="50 10 240 650"
        class="h-full w-auto"
        preserveAspectRatio="xMinYMin meet"
        style="overflow: visible"
      >
        <defs>
          <pattern id="tower-lattice" width="10" height="20" patternUnits="userSpaceOnUse">
            <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="0.8"/>
            <line x1="9" y1="0" x2="9" y2="20" stroke="currentColor" stroke-width="0.8"/>
            <line x1="1" y1="0" x2="9" y2="0" stroke="currentColor" stroke-width="0.5"/>
            <line x1="1" y1="20" x2="9" y2="20" stroke="currentColor" stroke-width="0.5"/>
            <line x1="1" y1="0" x2="9" y2="10" stroke="currentColor" stroke-width="0.4"/>
            <line x1="9" y1="10" x2="1" y2="20" stroke="currentColor" stroke-width="0.4"/>
          </pattern>
          <pattern id="jib-lattice" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="5" y2="10" stroke="currentColor" stroke-width="0.3"/>
            <line x1="10" y1="0" x2="5" y2="10" stroke="currentColor" stroke-width="0.3"/>
            <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" stroke-width="0.3"/>
          </pattern>
        </defs>
        <g style="color: rgba(255, 159, 10, 0.5)">
          <rect x="18" y="610" width="44" height="18" rx="2" fill="rgba(255,159,10,0.15)" stroke="currentColor" stroke-width="0.6"/>
          <rect x="31" y="55" width="18" height="555" fill="url(#tower-lattice)" style="color: rgba(255, 159, 10, 0.35)"/>
          <line x1="32" y1="55" x2="32" y2="610" stroke="currentColor" stroke-width="1"/>
          <line x1="48" y1="55" x2="48" y2="610" stroke="currentColor" stroke-width="1"/>
          <rect x="27" y="30" width="26" height="22" rx="2" fill="rgba(255,159,10,0.18)" stroke="currentColor" stroke-width="0.7"/>
          <line x1="40" y1="30" x2="40" y2="52" stroke="currentColor" stroke-width="0.3"/>
          <polygon points="33,30 24,15 56,15" fill="none" stroke="currentColor" stroke-width="0.7"/>
          <line x1="40" y1="30" x2="40" y2="13" stroke="currentColor" stroke-width="0.6"/>
          <rect x="44" y="56" width="12" height="12" rx="1" fill="rgba(255,159,10,0.1)" stroke="currentColor" stroke-width="0.5"/>
          <rect x="46" y="58" width="8" height="6" rx="0.5" fill="rgba(255,159,10,0.06)" stroke="currentColor" stroke-width="0.3"/>
          <g class="crane-arm-jib">
            <line x1="40" y1="34" x2="225" y2="34" stroke="currentColor" stroke-width="0.9"/>
            <line x1="40" y1="44" x2="225" y2="44" stroke="currentColor" stroke-width="0.8"/>
            <rect x="40" y="34" width="185" height="10" fill="url(#jib-lattice)" style="color: rgba(255, 159, 10, 0.3)"/>
            <rect x="221" y="32" width="5" height="14" rx="0.5" fill="rgba(255,159,10,0.12)" stroke="currentColor" stroke-width="0.5"/>
          </g>
          <g>
            <line x1="40" y1="34" x2="5" y2="34" stroke="currentColor" stroke-width="0.9"/>
            <line x1="40" y1="44" x2="5" y2="44" stroke="currentColor" stroke-width="0.8"/>
            <line x1="35" y1="34" x2="30" y2="44" stroke="currentColor" stroke-width="0.35"/>
            <line x1="25" y1="34" x2="20" y2="44" stroke="currentColor" stroke-width="0.35"/>
            <line x1="15" y1="34" x2="10" y2="44" stroke="currentColor" stroke-width="0.35"/>
            <rect x="2" y="35" width="8" height="8" rx="0.5" fill="rgba(255,159,10,0.2)" stroke="currentColor" stroke-width="0.4"/>
            <rect x="2" y="43" width="8" height="8" rx="0.5" fill="rgba(255,159,10,0.15)" stroke="currentColor" stroke-width="0.4"/>
          </g>
          <g class="cable-group">
            <line x1="223" y1="44" x2="223" y2="105" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2 1"/>
            <circle cx="223" cy="109" r="3" fill="none" stroke="currentColor" stroke-width="0.7"/>
            <path d="M220,112 L220,119 L226,119 L226,112" fill="none" stroke="currentColor" stroke-width="0.5"/>
            <line x1="223" y1="112" x2="223" y2="123" stroke="currentColor" stroke-width="0.5"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>

<style scoped>
.crane-container {
  perspective: 400px;
}

.crane {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: bottom center;
  animation: none;
}

.crane-active .crane {
  animation: craneSwing 4s ease-in-out infinite;
  animation-delay: 1s;
}

.crane-active .crane .cable-group {
  animation: hookSwing 3s ease-in-out infinite;
  animation-delay: 1.2s;
}

@keyframes craneSwing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

@keyframes hookSwing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform:  rotate(1deg); }
  75% { transform:  rotate(-1deg); }
}
</style>
