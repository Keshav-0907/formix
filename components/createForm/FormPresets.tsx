import { formPresets } from "@/utils/formPresets";
import { useDispatch } from "react-redux";
import { addPreset } from "@/store/slice/formSlice";
import toast from "react-hot-toast";

const FormPresets = () => {
  const dispatch = useDispatch();

  const handleUsePreset = (preset: any) => {
    dispatch(addPreset(preset));
    toast.success("Preset applied successfully!");
  };

  return (
    <div className="flex px-2 py-4 flex-col gap-4">
      {formPresets.map((preset, index) => (
        <div key={index} className="flex flex-col gap-2">
          <img
            src={preset.img}
            alt={preset.presetTitle}
            className="w-full object-cover rounded-md"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{preset.presetTitle}</h3>
            <p className="text-sm text-gray-500">{preset.presetDescription}</p>
            <button
              onClick={() => handleUsePreset(preset)}
              className="text-[#D1D5DB] w-full flex justify-center bg-[#1A1C22] hover:bg-[#2A2D34] border border-[#4B4B4B] items-center gap-2 text-sm px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
            >
              Use Preset
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormPresets;
