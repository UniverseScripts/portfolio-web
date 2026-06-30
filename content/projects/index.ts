import { pulsemind } from "./pulsemind";
import { weatherise } from "./weatherise";
import { vora } from "./vora";
import { roomie } from "./roomie";
import { ProjectSchema } from "../types";

export const projectsRegistry: Record<string, ProjectSchema> = {
  pulsemind,
  weatherise,
  vora,
  roomie,
};

export const allProjects = Object.values(projectsRegistry);
