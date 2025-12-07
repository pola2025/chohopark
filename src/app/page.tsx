import {
  Hero,
  ValueProposition,
  BrandStatement,
  MealService,
  MenuCards,
  PackageFeatures,
  ClientsAndPackages,
  Rules,
  Facilities,
  Calculator,
  RefundPolicy,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <BrandStatement />
      <MealService />
      <MenuCards />
      <PackageFeatures />
      <ClientsAndPackages />
      <Facilities />
      <Rules />
      <Calculator />
      <RefundPolicy />
    </>
  );
}
