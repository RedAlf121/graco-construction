<template>
  <footer
    class="border-t border-white/10 bg-[#1C1C1E] px-6 pb-8 pt-12"
  >
    <div class="container mx-auto px-4">
      <div
        class="mb-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8"
      >
        <div>
          <Logo
            url="/logo graco.png"
            alt="Graco Construction Group"
            iconClass="h-[60px]"
          />
          <h3
            class="mt-6 font-['Manrope',sans-serif] text-lg font-bold uppercase text-white"
          >
            GRACO CONSTRUCTION GROUP, INC
          </h3>
          <p class="mt-4 text-[15px] text-white/70">
            Specialized in high-end residential and commercial projects since
            June 2014.
          </p>
        </div>

        <div>
          <h3
            class="mb-4 font-['Manrope',sans-serif] text-lg font-bold text-white"
          >
            Services
          </h3>
          <ul class="space-y-2">
            <li
              v-for="{ node, depth } in flatServices"
              :key="node.id"
              :style="{ paddingLeft: depth * 16 + 'px' }"
            >
              <NuxtLink
                v-if="node.children && node.children.length"
                :to="node.href ?? '#'"
                class="text-[15px] font-medium text-white/70 transition-colors duration-200 hover:text-[#FF9F0A]"
              >
                {{ node.name }}
              </NuxtLink>
              <NuxtLink
                v-else
                :to="`/services/${node.slug}/projects`"
                class="text-[15px] text-white/50 transition-colors duration-200 hover:text-[#FF9F0A]"
              >
                {{ node.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="mb-4 font-['Manrope',sans-serif] text-lg font-bold text-white"
          >
            Contact
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="flex items-start text-[15px] text-white/70 transition-colors duration-200 hover:text-[#FF9F0A]"
              >
                <i class="fas fa-map-marker-alt mr-2 mt-1"></i>
                3418 NW 7th Ave. Miami, FL 33127
              </a>
            </li>
            <li>
              <a
                href="tel:7864223537"
                class="flex items-center text-[15px] text-white/70 transition-colors duration-200 hover:text-[#FF9F0A]"
              >
                <i class="fas fa-phone mr-2"></i>
                786.422.3537
              </a>
            </li>
            <li>
              <a
                href="mailto:alex@gracocg.com"
                class="flex items-center text-[15px] text-white/70 transition-colors duration-200 hover:text-[#FF9F0A]"
              >
                <i class="fas fa-envelope mr-2"></i>
                alex@gracocg.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-white/10 pt-8 text-center text-[13px] text-white/50"
      >
        &copy; 2026 GRACO CONSTRUCTION GROUP. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import { useServices } from '~/hooks/useServices'
import type { ServiceNode } from '~/hooks/useServices'

interface FlatServiceEntry {
  node: ServiceNode
  depth: number
}

function flattenTree(nodes: ServiceNode[], depth = 0): FlatServiceEntry[] {
  const result: FlatServiceEntry[] = []
  for (const node of nodes) {
    result.push({ node, depth })
    if (node.children) {
      result.push(...flattenTree(node.children, depth + 1))
    }
  }
  return result
}

const { servicesTree } = useServices()
const flatServices = flattenTree(servicesTree)
</script>
