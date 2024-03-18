import React from "react";
// import "./users.css";
import {  useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortablePlace = ({ place }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: place?.place?.place_id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="user"
    >
      {place?.place?.name}
    </div>
  );
};

export default SortablePlace;
