import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="border-b border-border-50 bg-card-80 backdrop-blur-sm sticky top-0 z-1 p-4">
      <div className="flex flex-row items-center gap-3">
        <Logo />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-creative bg-clip-text text-transparent">
            Color Book
          </h1>
          <p className="text-sm text-muted-foreground">
            Transform photos into beautiful coloring pages
          </p>
        </div>
      </div>
    </header>
  );
};
