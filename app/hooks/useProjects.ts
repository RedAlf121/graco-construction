import type { ServiceNode } from './useServices'
import type { Gallery } from './useGalleries'
import projectsJSON from '~/../assets/projects.json' with { type: 'json' }
import { useServices } from './useServices'
import { useGalleries } from './useGalleries'

export interface Project {
  id: number
  name: string
  serviceId: string
  includesPreConstruction: boolean
  location: string
  year: number
  description: string
  coverImage: string
  status: 'completed' | 'in-progress' | 'planned'
  service?: ServiceNode
  gallery?: Gallery
}

export function useProjects() {
  const { servicesFlat } = useServices()
  const { galleries } = useGalleries()

  const projects: Project[] = projectsJSON.projects.map((project) => ({
    ...project,
    service: servicesFlat[project.serviceId],
    gallery: galleries.find((g) => g.projectId === project.id),
  }))

  function getById(id: number | string): Project | undefined {
    return projects.find((p) => p.id === Number(id))
  }

  function getByService(serviceId: string): Project[] {
    return projects.filter(
      (p) => p.serviceId === serviceId || p.service?.slug === serviceId
    )
  }

  function getByCategory(category: 'residential' | 'commercial'): Project[] {
    return projects.filter((p) => p.service?.category === category)
  }

  function getWithPreConstruction(): Project[] {
    return projects.filter((p) => p.includesPreConstruction)
  }

  return { projects, getById, getByService, getByCategory, getWithPreConstruction }
}