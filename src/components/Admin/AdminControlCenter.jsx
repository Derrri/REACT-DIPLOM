import React from "react";
import WrappComp from "./AdminControlComponents/WrappComp";
import AdminHall from "./AdminControlComponents/AdminHallComponents/AdminHall";
import ConfigHall from "./AdminControlComponents/AdminConfigHallComponents/ConfigHall";
import PriceConfig from "./AdminControlComponents/AdminPriceConfig/PriceConfig";
import MovieSeances from "./AdminControlComponents/AdminMovieSeancesComponents/MovieSeances";
import OpenSales from "./AdminControlComponents/AdminOpenComponents/OpenSales";

const AdminControlCenter = () => {
  const sections = [
    {
      title: "Управление залами",
      sectionClass: "halls",
      content: <AdminHall />,
    },
    {
      title: "Конфигурация залов",
      sectionClass: "hall-config",
      content: <ConfigHall />,
    },
    {
      title: "Конфигурация цен",
      sectionClass: "price-config",
      content: <PriceConfig />,
    },
    {
      title: "Сетка сеансов",
      sectionClass: "movie-seances",
      content: <MovieSeances />,
    },
    { title: "Открыть продажи", sectionClass: "open", content: <OpenSales /> },
  ];

  return (
    <main className="admin__main">
      {sections.map((section, index) => (
        <WrappComp
          key={index}
          title={section.title}
          sectionClass={section.sectionClass}
          isFirst={index === 0}
          isLast={index === sections.length - 1}
        >
          {section.content}
        </WrappComp>
      ))}
    </main>
  );
};

export default AdminControlCenter;
