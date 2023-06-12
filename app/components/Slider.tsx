"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}
/**
 * Componente que representa un slider para controlar el volumen. Utiliza Radix Slider.
 * @param value Valor del slider.
 * @param onChange Función que se ejecuta cuando se cambia el valor del slider.
 */
const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  return (
    <RadixSlider.Root 
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volumen"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute rounded-full h-full bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}

export default Slider