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
      <div className="filters flex w-full max-w-full scrollbar-none justify-center gap-2 overflow-x-scroll">
        <Button
          className={cn(selected === null && "bg-sky-700 text-white")}
          onClick={() => filterWorks(null)}
        >
          All
        </Button>
        {categories.map((cat) => {
          return (
            <Button
              key={cat.id}
              className={cn(selected === cat.slug && "bg-sky-700 text-white")}
              onClick={() => filterWorks(cat.slug)}
            >
              {cat.name}
            </Button>
          );
        })}
      </div>
      <div className="container mx-auto grid w-full gap-x-12 gap-y-24 p-4 lg:grid-cols-2">
        {filteredWorks.map((work) => {
          return <WorkItem key={work.id} work={work} />;
        })}
      </div>
    </section>
  );
}
