import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, LoaderCircle, RotateCcw } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router'
import { projectsApi } from '../api/projects.js'
import { Brand } from '../components/Brand.jsx'

function entityId(entity) {
  return entity?._id || entity?.id
}

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration))
}

export function WorkspacePage() {
  const { projectId } = useParams()
  const location = useLocation()
  const launchPromise = useRef(null)
  const initialProject = entityId(location.state?.project) === projectId
    ? location.state.project
    : null
  const [project, setProject] = useState(initialProject)
  const [isStarting, setIsStarting] = useState(!initialProject?.runtimeId)
  const [startupError, setStartupError] = useState('')
  const runtimeId = project?.runtimeId

  useEffect(() => {
    let active = true

    async function findProject() {
      if (initialProject) return initialProject
      const projects = await projectsApi.list()
      return projects.find((item) => entityId(item) === projectId)
    }

    async function waitForRunningProject(currentProject) {
      let latestProject = currentProject

      for (let attempt = 0; attempt < 60; attempt += 1) {
        if (latestProject?.runtimeId) return latestProject
        if (latestProject?.status === 'failed') {
          throw new Error('The project runtime failed to start.')
        }

        await wait(2000)
        const projects = await projectsApi.list()
        latestProject = projects.find((item) => entityId(item) === projectId)
        if (active && latestProject) setProject(latestProject)
      }

      throw new Error('The project runtime took too long to start.')
    }

    async function prepareWorkspace() {
      setStartupError('')
      setIsStarting(true)

      try {
        let currentProject = await findProject()
        if (!currentProject) throw new Error('Project not found.')
        if (active) setProject(currentProject)

        if (!currentProject.runtimeId) {
          if (['created', 'failed'].includes(currentProject.status)) {
            launchPromise.current ??= projectsApi.launch(projectId)
            currentProject = await launchPromise.current
          } else {
            currentProject = await waitForRunningProject(currentProject)
          }
        }

        if (active) setProject(currentProject)
      } catch (requestError) {
        if (active) setStartupError(requestError.message)
      } finally {
        if (active) setIsStarting(false)
      }
    }

    prepareWorkspace()
    return () => {
      active = false
    }
  }, [initialProject, projectId])

  if (isStarting) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#111116] text-white">
        <div className="text-center">
          <LoaderCircle className="mx-auto mb-5 size-7 animate-spin text-cyan-400" />
          <p className="text-sm font-extrabold">Starting {project?.title || 'your workspace'}</p>
          <p className="mt-2 text-xs font-medium text-zinc-600">Provisioning the project runtime</p>
        </div>
      </main>
    )
  }

  if (startupError || !project) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#111116] px-5 text-center text-white">
        <div>
          <p className="text-lg font-extrabold">Workspace unavailable</p>
          <p className="mt-2 text-sm font-medium text-zinc-500">{startupError || 'Project not found.'}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link className="flex h-9 items-center gap-2 rounded border border-white/10 px-3 text-xs font-bold text-zinc-300 hover:bg-white/5" to="/projects">
              <ArrowLeft className="size-3.5" /> Projects
            </Link>
            <button className="flex h-9 items-center gap-2 rounded bg-cyan-700 px-3 text-xs font-extrabold hover:bg-cyan-600" type="button" onClick={() => window.location.reload()}>
              <RotateCcw className="size-3.5" /> Retry
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-[#111116] p-6 text-white">
      <Link className="inline-flex items-center gap-2 text-sm text-cyan-400" to="/projects">
        <ArrowLeft className="size-4" /> Projects
      </Link>
      <div className="mt-8"><Brand compact inverse monochrome /></div>
      <h1 className="mt-6 text-2xl font-extrabold">{project.title}</h1>
      <p className="mt-3 text-sm text-zinc-400">Project status: {project.status}</p>
      {runtimeId && <p className="mt-2 font-mono text-xs text-zinc-500">Runtime: {runtimeId}</p>}
    </main>
  )
}
