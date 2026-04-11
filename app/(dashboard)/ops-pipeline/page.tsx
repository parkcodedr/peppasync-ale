import KanbanBoard from "@/components/pipeline/KanbanBoard";

export default function OpsPipelinePage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[15px] font-semibold ">
          Ops Pipeline
        </h1>
        <p className="text-[12px] text-muted mt-0.5">
          Orders in the middleware limbo state — awaiting processing before ERP
          sync.
        </p>
      </div>

      <KanbanBoard />
    </div>
  );
}
