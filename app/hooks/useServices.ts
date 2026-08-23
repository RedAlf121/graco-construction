export interface ServiceNode {
  id: string
  slug: string
  name: string
  description?: string
  icon?: string
  category?: 'residential' | 'commercial'
  children?: ServiceNode[]
}

interface ServicesData {
  services: ServiceNode[]
}

function flattenTree(nodes: ServiceNode[]): Record<string, ServiceNode> {
  const flat: Record<string, ServiceNode> = {}
  function walk(list: ServiceNode[]) {
    for (const node of list) {
      flat[node.id] = node
      flat[node.slug] = node
      if (node.children) {
        walk(node.children)
      }
    }
  }
  walk(nodes)
  return flat
}

function findLeafServices(nodes: ServiceNode[], acc: ServiceNode[] = []): ServiceNode[] {
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      findLeafServices(node.children, acc)
    } else {
      acc.push(node)
    }
  }
  return acc
}

function findPath(nodes: ServiceNode[], targetId: string): string[] | null {
  for (const node of nodes) {
    if (node.id === targetId || node.slug === targetId) return [node.name]
    if (node.children) {
      const childPath = findPath(node.children, targetId)
      if (childPath) return [node.name, ...childPath]
    }
  }
  return null
}

import servicesJSON from '~/../assets/services.json' with { type: 'json' }

export function useServices() {
  const servicesTree = servicesJSON.services ?? []
  const servicesFlat = flattenTree(servicesTree)

  function getLeafServices(): ServiceNode[] {
    return findLeafServices(servicesTree)
  }

  function getServicePath(id: string): string[] {
    return findPath(servicesTree, id) ?? []
  }

  function getServiceHref(id: string): string {
    const node = servicesFlat[id]
    if (!node || (node.children && node.children.length > 0)) return '#'
    return `/services/${node.slug}/projects`
  }

  return { servicesTree, servicesFlat, getLeafServices, getServicePath, getServiceHref }
}