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
  // const [search, setSearch] = useState("");

  useEffect(() => {
    if (idTipoFormacion) {
      const degree = tiposFormaciones.find((d) => d.id === idTipoFormacion);
      if (degree) {
        setValue(degree.id);
        onSelect(degree.id);
      }
    }
  }, [tiposFormaciones, idTipoFormacion]);

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
          className="justify-between"
        >
          {value
            ? tiposFormaciones.find((degree) => degree.id === value)?.name
            : "Seleccciona..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Buscar carrera..." />
          <CommandList>
            <CommandEmpty>No se encontraron registros.</CommandEmpty>
            <CommandGroup>
              {tiposFormaciones.map((degree) => (
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
