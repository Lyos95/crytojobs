import styles from "./Chip.module.css";

type AppProps = {
  name: string;
};

const Chip = (props: AppProps) => {
  return (
    <li className={styles.chip}>{props.name}</li>
  );
};

export default Chip;
