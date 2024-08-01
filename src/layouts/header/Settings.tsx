import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('./Settings')
  }
  return (
    <Button variant={"secondary"} onClick={handleSettingsClick} className="w-24">
        Settings
    </Button>
  );
}

export default Settings;
