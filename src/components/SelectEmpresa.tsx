"use client"; // Necesario para usar hooks en componentes de Next.js

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
import { useEmpresas } from "@/hooks/get-empresas";

interface Props {
  onSelect: (idEmpresa: number) => void;
  idEmpresa?: number;
}

export default function SelectEmpresa({ onSelect, idEmpresa }: Props) {
  const { empresas, loading, error } = useEmpresas();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(-1);
  // const [search, setSearch] = useState("");

  useEffect(() => {
    if (idEmpresa) {
      const degree = empresas.find((degree) => degree.id === idEmpresa);
      if (degree) {
        setValue(degree.id);
        onSelect(degree.id);
      }
    }
  }, [empresas, idEmpresa]);

  return !empresas || loading || error ? (
    <Button variant="outline" disabled>
      Cargando grados...
    </Button>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? empresas.find((degree) => degree.id === value)?.name
            : "Select empresa..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Buscar carrera..." />
          <CommandList>
            <CommandEmpty>No se encontraron empresas.</CommandEmpty>
            <CommandGroup>
              {empresas.map((degree) => (
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
