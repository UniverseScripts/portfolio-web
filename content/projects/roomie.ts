import { ProjectSchema } from "../types";

export const roomie: ProjectSchema = {
  id: "roomie",
  title: "Roomie",
  domain: "High-Concurrency Decoupled Systems",
  tier: 2,
  metrics: [
    { label: "CQRS Read/Write Split Ratio", value: "8:1" },
    { label: "Event Throughput Under Load", value: "2400 evt/s" },
    { label: "P95 Command Latency", value: "<85ms" },
  ],
  architecturePattern: "CQRS + Domain-Driven Design",
  contentFunnelRoute: "/projects/roomie",
  gumroadProductId: null,
  summary:
    "A high-concurrency platform architected around CQRS and Domain-Driven Design principles. The read and write models are fully decoupled at the infrastructure level, allowing independent scaling of query projections without contending for command throughput.",
  architectureDetail:
    "Command handlers write exclusively to an append-only event store. Read model projections subscribe to the event stream and maintain materialized views optimized for their specific query shapes. Under sustained load of 2400 events/s, p95 command latency holds below 85ms due to the elimination of read-write lock contention at the storage layer. Aggregate boundaries are defined by DDD domain invariants, not persistence convenience, resulting in explicit consistency guarantees per bounded context.",
};
