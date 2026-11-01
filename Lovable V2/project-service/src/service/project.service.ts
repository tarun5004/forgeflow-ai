import { Project } from "../models/project.model.js"



export function createProject(userId: string, title: string) {
    return Project.create({ user: userId, title })
}
