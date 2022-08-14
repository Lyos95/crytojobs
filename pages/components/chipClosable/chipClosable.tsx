import styles from "./ChipClosable.module.css";

type AppProps = {
  name: string;
  onClose: any;
};

const ChipClosable = ({name,onClose}: AppProps) => {
  return (
    <div className={styles.chipSelected}>
    {name}
    <span onClick={onClose} className={styles.closebtn}>&times;</span>
  </div>
  );
};

export default ChipClosable;
