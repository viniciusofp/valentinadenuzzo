"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
          className={cn(selected === null && "bg-sky-900")}
          onClick={() => filterWorks(null)}
        >
          All
        </Button>
        {categories.map((cat) => {
          return (
            <Button
              key={cat.id}
              className={cn(selected === cat.slug && "bg-sky-900")}
              onClick={() => filterWorks(cat.slug)}
            >
              {cat.name}
            </Button>
          );
        })}
      </div>
      <div className="mx-auto grid w-full max-w-2xl gap-y-24 p-4 md:grid-cols-1">
        {filteredWorks.map((work) => {
          return <WorkItem key={work.id} work={work} />;
        })}
      </div>
    </section>
  );
}
