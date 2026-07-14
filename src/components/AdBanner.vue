<template>
  <div v-if="enabled && adData" class="ad-banner">
    <a :href="adData.linkUrl" target="_blank" rel="noopener noreferrer" @click="onAdClick">
      <img
        :src="adData.imageUrl"
        :alt="adData.altText"
        :style="adStyle"
        class="ad-image"
        @error="onImageError"
      />
    </a>
    <button v-if="dismissible" class="ad-close" @click="dismissAd" title="Close">
      <span class="ad-close-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const AD_CONFIG_URL = 'https://raw.githubusercontent.com/prasenjit-hub/ADS/main/ad-config.json';

interface AdConfig {
  enabled: boolean;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  width: number;
  height: number;
  dismissible: boolean;
}

const enabled = ref(true);
const adData = ref<AdConfig | null>(null);
const dismissible = ref(false);
const adError = ref(false);

const adStyle = computed(() => {
  if (!adData.value) return {};
  const style: Record<string, string> = {};
  if (adData.value.width) style.width = `${adData.value.width}px`;
  if (adData.value.height) style.height = `${adData.value.height}px`;
  if (adError.value) style.display = 'none';
  return style;
});

async function fetchAdConfig(): Promise<void> {
  try {
    const response = await fetch(AD_CONFIG_URL, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Failed to load ad config');
    const config = (await response.json()) as AdConfig;
    adData.value = config;
    enabled.value = config.enabled !== false;
    dismissible.value = config.dismissible === true;
  } catch {
    const fallbackConfigUrl = import.meta.env.VITE_AD_CONFIG_URL as string | undefined;
    if (fallbackConfigUrl) {
      try {
        const resp = await fetch(fallbackConfigUrl, { cache: 'no-cache' });
        if (resp.ok) {
          const config = (await resp.json()) as AdConfig;
          adData.value = config;
          enabled.value = config.enabled !== false;
          dismissible.value = config.dismissible === true;
        }
      } catch {}
    }
  }
}

function onAdClick(): void {
}

function onImageError(): void {
  adError.value = true;
}

function dismissAd(): void {
  enabled.value = false;
}

onMounted(() => {
  void fetchAdConfig();
});
</script>

<style scoped>
.ad-banner {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  background: var(--fallback-b2, oklch(var(--b2)));
  border-top: 1px solid var(--fallback-b3, oklch(var(--b3)));
  box-sizing: border-box;
}
.ad-image {
  max-width: 100%;
  max-height: 90px;
  object-fit: contain;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.ad-image:hover {
  opacity: 0.85;
}
.ad-close {
  position: absolute;
  top: 3px;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  padding: 4px;
  line-height: 1;
}
.ad-close:hover {
  opacity: 1;
}
.ad-close-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  position: relative;
}
.ad-close-icon::before,
.ad-close-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 2px;
  background: var(--fallback-bc, oklch(var(--bc)));
  border-radius: 1px;
}
.ad-close-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.ad-close-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
