import { pulsemind } from "./pulsemind";
import { weatherise } from "./weatherise";
import { vora } from "./vora";
import { roomie } from "./roomie";
import { ProjectSchema } from "../types";
import { develarper } from "./develarper";

export const projectsRegistry: Record<string, ProjectSchema> = {
  pulsemind,
  weatherise,
  vora,
  roomie,
  develarper,
};

export const allProjects = Object.values(projectsRegistry);
