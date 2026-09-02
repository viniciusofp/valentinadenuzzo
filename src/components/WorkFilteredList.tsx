"use client";

import { Button } from "@/components/ui/button";
import WorkItem from "@/components/WorkItem";
import { cn } from "@/lib/utils";
import { Category, Work } from "@/payload-types";
import { useState } from "react";

export type WorkFilteredListProps = { works: Work[]; categories: Category[] };

export default function WorkFilteredList({
  works,
  categories,
}: WorkFilteredListProps) {
  const [filteredWorks, setFilteredWorks] = useState<Work[]>(works);
  const [selected, setSelected] = useState<string | null>(null);
  const filterWorks = (slug: string | null) => {
    if (slug === null) {
      setSelected(null);
      setFilteredWorks(works);
    } else {
      setSelected(slug);
      setFilteredWorks(
        works.filter((work) => (work.metadata?.type as Category).slug === slug),
      );
    }
  };
  return (
    <section id="filmes" className="grid w-full gap-8 pt-4">
      <div className="filters flex w-full max-w-full scrollbar-none justify-center gap-2 overflow-x-scroll **:duration-300">
        <Button
          className={cn(
            "hover:bg-sky-100",
            selected === null &&
              "bg-sky-700 text-white hover:bg-sky-100/10 hover:text-sky-700",
          )}
          onClick={() => filterWorks(null)}
        >
          All
        </Button>
        {categories.map((cat) => {
          return (
            <Button
              key={cat.id}
              className={cn(
                "hover:bg-sky-100",
                selected === cat.slug &&
                  "bg-sky-700 text-white hover:bg-sky-100/10 hover:text-sky-700",
              )}
              onClick={() => filterWorks(cat.slug)}
            >
              {cat.name}
            </Button>
          );
        })}
      </div>
      <div className="mx-auto grid w-full gap-x-12 gap-y-24 p-4 lg:grid-cols-2 lg:px-6 xl:px-8 2xl:px-10">
        {filteredWorks.map((work) => {
          return <WorkItem key={work.id} work={work} />;
        })}
      </div>
    </section>
  );
}
