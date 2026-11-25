export interface Gallery {
  id: number
  projectId: number
  images: string[]
}

interface GalleriesData {
  galleries: Gallery[]
}

import galleriesJSON from '~/../assets/galleries.json' with { type: 'json' }

export function useGalleries() {
  const data = galleriesJSON as GalleriesData
  const galleries: Gallery[] = data.galleries ?? []

  function getByProjectId(projectId: number): Gallery | undefined {
    return galleries.find((g) => g.projectId === projectId)
  }

  return { galleries, getByProjectId }
}