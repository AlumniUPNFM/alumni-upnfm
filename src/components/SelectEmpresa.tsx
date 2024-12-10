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

  useEffect(() => {
    if (idEmpresa && empresas) {
      const empresa = empresas.find((e) => e.id === idEmpresa);
      if (empresa) {
        setValue(empresa.id);
        onSelect(empresa.id);
      }
    }
  }, [empresas, idEmpresa, onSelect]);

  const selected = empresas?.find((e) => e.id === value);

  return !empresas || loading || error ? (
    <Button variant="outline" disabled>
      Cargando empresas...
    </Button>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {selected ? selected.name : "Seleccionar empresa..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="Buscar empresa..." />
          <CommandList>
            <CommandEmpty>No se encontraron empresas.</CommandEmpty>
            <CommandGroup>
              {empresas.map((empresa) => (
                <CommandItem
                  key={empresa.id}
                  value={empresa.name} // Usar name para permitir filtrado por texto
                  onSelect={(currentValue) => {
                    const selectedEmpresa = empresas.find(
                      (e) => e.name === currentValue
                    );
                    if (selectedEmpresa) {
                      setValue(selectedEmpresa.id);
                      onSelect(selectedEmpresa.id);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === empresa.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {empresa.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
