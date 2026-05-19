interface SectionDividerProps {
  from: string;
  to: string;
  height?: string;
}

const SectionDivider = ({ from, to, height = "h-48 md:h-72" }: SectionDividerProps) => (
  <div
    className={`w-full ${height}`}
    style={{
      background: `linear-gradient(to bottom, hsl(var(${from})) 0%, color-mix(in oklch, hsl(var(${from})) 85%, hsl(var(${to})) 15%) 15%, color-mix(in oklch, hsl(var(${from})) 65%, hsl(var(${to})) 35%) 30%, color-mix(in oklch, hsl(var(${from})) 45%, hsl(var(${to})) 55%) 50%, color-mix(in oklch, hsl(var(${from})) 25%, hsl(var(${to})) 75%) 70%, color-mix(in oklch, hsl(var(${from})) 10%, hsl(var(${to})) 90%) 85%, hsl(var(${to})) 100%)`,
    }}
  />
);

export default SectionDivider;
