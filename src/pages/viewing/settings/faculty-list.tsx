import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { getFaculties } from "@/services/api/faculty";
import { useFacultyStore } from "@/stores/faculty";
import { useQuery } from "@tanstack/react-query";
import { IFaculty } from "@/types/api";
import useFacultyModalStore from "@/stores/modal/facultyModal";

interface FacultyListProps {
  onFacultyIdChange: (id: string | null) => void;
}

function FacultyList({ onFacultyIdChange }: FacultyListProps) {
  const { openModal } = useFacultyModalStore();
  const [matchingFaculty, setMatchingFaculty] = useState<IFaculty | null>(null);
  const { setFacultyName } = useFacultyStore();

  // Query faculty list
  const { data } = useQuery({
    queryKey: ["faculty-list"],
    queryFn: getFaculties,
  });

  const facultyNameFromStorage = localStorage.getItem("facultyName");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const foundFaculty = data.find(facultyItem => facultyItem.name === facultyNameFromStorage);
      setMatchingFaculty(foundFaculty || null);

      if (foundFaculty) {
        setFacultyName(foundFaculty.name);
        onFacultyIdChange(foundFaculty.id.toString());
      } else {
        onFacultyIdChange(null);
      }
    }
  }, [data, facultyNameFromStorage, setFacultyName, onFacultyIdChange]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="h-full w-full">
        {matchingFaculty ? (
          <div className="flex items-center justify-between rounded p-2 hover:bg-slate-200">
            <p className="col-span-8 text-xl font-bold">{matchingFaculty.name}</p>
            <section className="flex gap-2">
              <Button
                variant={"default"}
                onClick={() => matchingFaculty && openModal(matchingFaculty, "update")}
              >
                <Edit />
              </Button>
            </section>
          </div>
        ) : (
          <p className="col-span-8 text-xl font-bold text-center">
            Log out and then log back in to apply the changes you've made. If you have any issues with your account, please contact the administrator for assistance.
          </p>
        )}
      </div>
    </ScrollArea>
  );
}

export default FacultyList;
