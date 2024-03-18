import { useContext } from "react";
import SortablePlace from "./SortablePlace";
import "./users.css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { UserContext } from "../../states/UserContext";

const DndBoard = () => {
  const { savedLocations, setSavedLocations } = useContext(UserContext);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setSavedLocations((savedLocations) => {
      const oldIndex = savedLocations.findIndex(
        (location) => location.place.place_id === active.id
      );
      const newIndex = savedLocations.findIndex(
        (location) => location.place.place_id === over.id
      );
      return arrayMove(savedLocations, oldIndex, newIndex);
    });
  };

  return (
    <div className="users">
      <div>Total: {savedLocations.length}</div>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={savedLocations}
            strategy={verticalListSortingStrategy}
          >
            {savedLocations.map((savedLocation) => (
              <SortablePlace
                id={savedLocation.place.place_id}
                key={savedLocation.place.place_id}
                place={savedLocation}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
export default DndBoard;

