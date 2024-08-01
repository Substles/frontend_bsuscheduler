/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import InputFields from "@/components/table/faculty/footer/input-fields";
import InputTeachingHours from "@/components/table/faculty/footer/input-teaching-hours";

import { useScheduleStore } from "@/stores/schedule";
import { initialValues, useFacultyStore } from "@/stores/faculty";
import { getFacultyFooter } from "@/services/api/faculty";
import { calculateHoursByDay } from "@/lib/calculateHours";

interface FacultyTotalProps {
  facultyId: string | null;
}

function FacultyTotal({ facultyId }: FacultyTotalProps) {
  const [officialTime, setOfficialTime] = useState(initialValues);
  const [hours, setHours] = useState(initialValues);
  const [overtimeWithin, setOvertimeWithin] = useState(initialValues);
  const [overtimeOutside, setOvertimeOutside] = useState(initialValues);

  const { schedules } = useScheduleStore();
  const { setTotal } = useFacultyStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!facultyId) {
        // Reset values if no facultyId
        setOfficialTime(initialValues);
        setHours(initialValues);
        setOvertimeWithin(initialValues);
        setOvertimeOutside(initialValues);
        return;
      }

      const { total } = await getFacultyFooter(facultyId);

      const { officialTime, teachingHours, overtimeOutside, overtimeWithin } = total;

      setOfficialTime(officialTime);
      setHours(teachingHours);
      setOvertimeWithin(overtimeWithin);
      setOvertimeOutside(overtimeOutside);
    };

    fetchData();
  }, [facultyId]);

  // Copy to global state
  useEffect(() => {
    setTotal({
      officialTime,
      teachingHours: hours,
      overtimeWithin,
      overtimeOutside,
    });
  }, [officialTime, hours, overtimeWithin, overtimeOutside, setTotal]);

  useEffect(() => {
    if (!facultyId) return;

    const totalHours = calculateHoursByDay(schedules);
    const parsed = totalHours.map((hour) => hour.toString());

    setHours(parsed);
  }, [schedules, facultyId]);

  return (
    <>
      <InputFields
        title="Official Time"
        list={officialTime}
        handler={setOfficialTime}
        disabled={true}
      />

      <InputTeachingHours list={hours} handler={setHours} disabled={true} />

      <InputFields
        title="Overtime Within"
        list={overtimeWithin}
        handler={setOvertimeWithin}
        disabled={true}
      />

      <InputFields
        title="Overtime Outside"
        list={overtimeOutside}
        handler={setOvertimeOutside}
        disabled={true}
      />
    </>
  );
}

export default FacultyTotal;
