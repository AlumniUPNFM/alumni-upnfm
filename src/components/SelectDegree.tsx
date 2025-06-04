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
  const [value, setValue] = useState<number>(idDegree || -1);

  useEffect(() => {
    if (idDegree && degrees) {
      const degree = degrees.find((degree) => degree.id === idDegree);
      if (degree) {
        setValue(degree.id);
      }
    }
  }, [degrees, idDegree]);

  const selectedDegree = degrees?.find((degree) => degree.id === value);

  return !degrees || loading || error ? (
    <Button variant="outline" disabled>
      Cargando carreras...
    </Button>
  ) : (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {selectedDegree ? selectedDegree.name : "Seleccionar carrera..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar carrera..." />
          <CommandList>
            <CommandEmpty>No se encontraron carreras.</CommandEmpty>
            <CommandGroup>
              {degrees.map((degree) => (
                <CommandItem
                  key={degree.id}
                  value={degree.name}
                  onSelect={(currentValue) => {
                    const selected = degrees.find((d) => d.name === currentValue);
                    if (selected) {
                      setValue(selected.id);
                      onSelect(selected.id);
                    }
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
