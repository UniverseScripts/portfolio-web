import { pulsemind } from "./pulsemind";
import { weatherise } from "./weatherise";
import { vora } from "./vora";
import { roomie } from "./roomie";
import { develarper } from "./develarper";
import { ProjectSchema, ProjectIdentifier } from "../types";

/**
 * `satisfies`, deliberately, not a type annotation.
 *
 * It checks that every `ProjectIdentifier` has a record while preserving the literal
 * keys. An annotation would widen them and the check would pass vacuously — add a
 * sixth member to the union, forget the record here, and it would still compile,
 * lint, build, and ship without that route.
 */
const registry = {
  pulsemind,
  weatherise,
  vora,
  roomie,
  develarper,
} satisfies Record<ProjectIdentifier, ProjectSchema>;

/** Typed by the union. Use this wherever the key is known at compile time. */
export const projectsById = registry;

/**
 * String-keyed view for the `[slug]` route, which receives an unvalidated string.
 *
 * The `| undefined` is the point: it is what makes `if (!project) notFound()` in the
 * page a real check rather than a branch the compiler believes is unreachable.
 */
export const projectsRegistry: Record<string, ProjectSchema | undefined> = registry;

export const allProjects: ProjectSchema[] = Object.values(registry);
