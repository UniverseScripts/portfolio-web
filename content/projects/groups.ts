import { ProjectGroup, ProjectGroupInfo } from "../types";

/**
 * Headings for the project groups. `satisfies` (not an annotation) so that adding a
 * member to `ProjectGroup` without a heading here fails to compile.
 */
export const projectGroups = {
  "gated-inference": {
    heading: "Gated inference",
    description: "A cheap decision in front of an expensive model call.",
    order: 1,
  },
  "retrieval-agents": {
    heading: "Retrieval and agents",
    description: "Getting the right context to a model; agents acting through tools.",
    order: 2,
  },
  "services-data": {
    heading: "Services and data",
    description: "APIs, pipelines and what runs under them.",
    order: 3,
  },
} satisfies Record<ProjectGroup, ProjectGroupInfo>;

export const orderedGroups = (Object.keys(projectGroups) as ProjectGroup[]).sort(
  (a, b) => projectGroups[a].order - projectGroups[b].order,
);
