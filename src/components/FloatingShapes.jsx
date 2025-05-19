export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-48 h-48 bg-art-primary/10 rounded-full -top-24 -left-24 animate-float"></div>
      <div className="absolute w-64 h-64 bg-art-secondary/10 rounded-full top-1/3 -right-32 animate-float delay-1000"></div>
      <div className="absolute w-32 h-32 bg-art-primary/15 rounded-full bottom-0 left-1/4 animate-float delay-2000"></div>
    </div>
  )
}