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
import { useTiposFormaciones } from "@/hooks/get-tipos-formaciones";

interface Props {
  onSelect: (idTipoFormacion: number) => void;
  idTipoFormacion?: number;
}

export default function SelectTipoFormacion({
  onSelect,
  idTipoFormacion,
}: Props) {
  const { tiposFormaciones, loading, error } = useTiposFormaciones();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(-1);

  useEffect(() => {
    if (idTipoFormacion && tiposFormaciones) {
      const tipo = tiposFormaciones.find((t) => t.id === idTipoFormacion);
      if (tipo) {
        setValue(tipo.id);
        onSelect(tipo.id);
      }
    }
  }, [tiposFormaciones, idTipoFormacion, onSelect]);

  const selected = tiposFormaciones?.find((t) => t.id === value);

  return !tiposFormaciones || loading || error ? (
    <Button variant="outline" disabled>
      Cargando información...
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
          {selected ? selected.name : "Seleccionar..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="Buscar tipo de formación..." />
          <CommandList>
            <CommandEmpty>No se encontraron registros.</CommandEmpty>
            <CommandGroup>
              {tiposFormaciones.map((tipo) => (
                <CommandItem
                  key={tipo.id}
                  value={tipo.name} // Usar el name para permitir filtrar por texto
                  onSelect={(currentValue) => {
                    const selectedTipo = tiposFormaciones.find((t) => t.name === currentValue);
                    if (selectedTipo) {
                      setValue(selectedTipo.id);
                      onSelect(selectedTipo.id);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tipo.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tipo.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
