import NavHeader from "@/components/NavHeader/NavHeader";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import SearchBar from "@/components/SearchBar/SearchBar";
import FilterBar from "@/components/FilterBar/FilterBar";
import s from "./page.module.css";

export default function Home() {
  return (
    <>
      <NavHeader />
      <div className={s.pageContainer}>
        <HeroBanner />
        <SearchBar />
        <FilterBar />
        {/* Main lobby content will go here */}
      </div>
    </>
  );
}
