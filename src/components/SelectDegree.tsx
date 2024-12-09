"use client"; // Necesario para usar hooks en componentes de Next.js

import { useDegrees } from "@/hooks/get-degrees";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

interface Props {
  onSelect: (idDegree: number) => void;
  idDegree?: number;
  className?: string;
}

export default function SelectDegree({ onSelect, idDegree }: Props) {
  const { degrees, loading, error } = useDegrees();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(-1);

  useEffect(() => {
    if (idDegree) {
      const degree = degrees.find((degree) => degree.id === idDegree);
      if (degree) {
        setValue(degree.id);
        onSelect(degree.id);
      }
    }
  }, [degrees, idDegree]);

  return !degrees || loading || error ? (
    <Button variant="outline" disabled>
      Cargando grados...
    </Button>
  ) : (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? degrees.find((degree) => degree.id === value)?.name
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Buscar carrera..." />
          <CommandList>
            <CommandEmpty>No se encontraron carreras.</CommandEmpty>
            <CommandGroup>
              {degrees.map((degree) => (
                <CommandItem
                  key={degree.id}
                  value={degree.id.toString()}
                  onSelect={(currentValue) => {
                    setValue(Number(currentValue));
                    onSelect(Number(currentValue));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === degree.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {degree.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
