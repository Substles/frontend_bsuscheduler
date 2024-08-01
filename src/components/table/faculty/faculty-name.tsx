// FacultyList.tsx


import { useEffect, useState } from "react";
import { getFaculties } from "@/services/api/faculty";
import { useFacultyStore } from "@/stores/faculty";
import { useQuery } from "@tanstack/react-query";
import { IFaculty } from "@/types/api";

interface FacultyListProps {
  onFacultyIdChange: (id: string | null) => void; // Add this prop
}

function FacultyList({ onFacultyIdChange }: FacultyListProps) {

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
        onFacultyIdChange(foundFaculty.id.toString()); // Notify parent component
      } else {
        onFacultyIdChange(null);
      }
    }
  }, [data, facultyNameFromStorage, setFacultyName, onFacultyIdChange]);

  return (
    <div className="h-full w-full">
      {matchingFaculty ? (
        <div className="flex items-center justify-between rounded p-2">
          <p className="col-span-8 text-lg font-bold">{matchingFaculty.name}</p>
        </div>
      ) : (
        <p>No matching faculty found.</p>
      )}
    </div>
  );
}

export default FacultyList;
