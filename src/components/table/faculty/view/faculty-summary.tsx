import { IOverallSummary } from "@/types/api";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { initialSummary, useFacultyStore } from "@/stores/faculty";
import { getFacultyFooter } from "@/services/api/faculty";

type Action =
  | { type: "SET_ALL"; value: IOverallSummary }
  | { type: "UPDATE_VALUE"; key: string; value: string };

const reducer = (state: IOverallSummary, action: Action) => {
  switch (action.type) {
    case "SET_ALL":
      return action.value;
    case "UPDATE_VALUE":
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

interface FacultySummaryProps {
  facultyId: string | null;
}

function FacultySummary({ facultyId }: FacultySummaryProps) {
  const [state, dispatch] = useReducer(reducer, initialSummary);
  const { setSummary, total } = useFacultyStore();
  const [sumHours, setSumHours] = useState(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_VALUE", key: name, value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!facultyId) {
        dispatch({ type: "SET_ALL", value: initialSummary });
        return;
      }

      const { summary } = await getFacultyFooter(facultyId);
      dispatch({ type: "SET_ALL", value: summary });
    };

    fetchData();
  }, [facultyId]);

  useEffect(() => {
    setSummary(state);
  }, [state, setSummary]);

  useEffect(() => {
    const totalHoursPerWeek = total.teachingHours
      .map((data) => parseFloat(data))
      .reduce((acc, current) => acc + current, 0);
    setSumHours(totalHoursPerWeek);
  }, [total]);

  return (
    <>
      <tr className="text-sm">
        <td className="uppercase">Designation: </td>
        <td colSpan={14}>
          <input
            type="text"
            name="designation"
            value={state.designation}
            onChange={handleInputChange}
            style={{ textAlign: "start" }}
            disabled={true} // Disable all inputs
          />
        </td>
      </tr>

      <tr className="text-xs uppercase">
        <td colSpan={2}>no. of preparations: </td>
        <td colSpan={3} className="font-bold">
          <input
            type="text"
            name="preparations"
            value={state.preparations}
            onChange={handleInputChange}
            disabled={true} // Disable all inputs
          />
        </td>

        <td colSpan={2}>regular load: </td>
        <td colSpan={3} className="font-bold">
          <input
            type="text"
            name="regularLoad"
            value={state.regularLoad}
            onChange={handleInputChange}
            disabled={true} // Disable all inputs
          />
        </td>

        <td colSpan={2}>academic rank: </td>
        <td colSpan={3} className="font-bold">
          <input
            type="text"
            name="academicRank"
            value={state.academicRank}
            onChange={handleInputChange}
            disabled={true} // Disable all inputs
          />
        </td>
      </tr>

      <tr className="text-xs uppercase">
        <td colSpan={2}>no. of hours per week: </td>
        <td colSpan={3} className="font-bold">
          <input
            type="text"
            name="hoursPerWeek"
            value={sumHours}
            onChange={handleInputChange}
            disabled={true} // Disable all inputs
          />
        </td>

        <td colSpan={2}>overload: </td>
        <td colSpan={3} className="font-bold">
          <input
            type="text"
            name="overload"
            value={state.overload}
            onChange={handleInputChange}
            disabled={true} // Disable all inputs
          />
        </td>

        <td colSpan={2}>consultation hour: </td>
        <td colSpan={3} className="font-bold">
          <input
            type="text"
            name="consultationHours"
            value={state.consultationHours}
            onChange={handleInputChange}
            disabled={true} // Disable all inputs
          />
        </td>
      </tr>
    </>
  );
}

export default FacultySummary;
