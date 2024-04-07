import React, { useMemo, useState } from "react";
import { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import "./SortableList.css";

import { DragHandle } from "./SortableItem";
import { SortableOverlay } from "./SortableOverlay";
import { SortableItem } from "./SortableItem";

export function SortableList({ items, onChange, renderItem }) {
  const [active, setActive] = useState(null);
  const activeItem = useMemo(
    () => items.find((item) => item.place.localId === active?.id),
    [active, items]
  );
  console.log(activeItem, "activeItem");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (over && active?.id !== over?.id) {
      const activeIndex = items.findIndex(
        (item) => item.place.localId === active?.id
      );
      const overIndex = items.findIndex(
        (item) => item.place.localId === over?.id
      );
      const updatedItems = arrayMove(items, activeIndex, overIndex);
      onChange(updatedItems);
    }
    setActive(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className="SortableList" role="application">
          {items.map((item) => (
            <React.Fragment key={item.place.localId}>
              {renderItem(item)}
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
