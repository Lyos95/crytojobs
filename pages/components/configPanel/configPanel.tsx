import styles from "./ConfigPanel.module.css";
import ChipConfigComponent from "../chipConfig/chipConfig";

type Props = {
  onSelectOption: any;
};

const ConfigPanelComponent = ({ onSelectOption }: Props) => {
  return (
    <div className={styles["configuration-nav"]}>
      <ChipConfigComponent
        onSelectOption={(value: any) => {
          onSelectOption(value, [
            "Full Time",
            "Part Time",
            "Intership",
            "Temporal",
          ]);
        }}
        type="Job Type"
        options={["Full Time", "Part Time", "Intership", "Temporal"]}
      />
      <ChipConfigComponent
        onSelectOption={(value: any) => {
          onSelectOption(value, ["Remote"]);
        }}
        type="Remote"
      />
      <ChipConfigComponent
        onSelectOption={(value: any) => {
          onSelectOption(value, ["Non-Tech"]);
        }}
        type="Non-Tech"
      />
      <ChipConfigComponent
        onSelectOption={(value: any) => {
          onSelectOption(value, [
            "Last 24 hours",
            "Last 3 days",
            "Last week",
            "Last month",
          ]);
        }}
        type="Date posted"
        options={["Last 24 hours", "Last 3 days", "Last week", "Last month"]}
      />
      <ChipConfigComponent onSelectOption={onSelectOption} type="Salary" />
    </div>
  );
};

export default ConfigPanelComponent;
