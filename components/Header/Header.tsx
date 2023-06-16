import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openListModal} from "../../store/bucketList";
import {RootState} from "../../store";
import styles from "./Header.module.scss";

export default function Header(): JSX.Element {
  const {selectedModules} = useSelector((state: RootState) => state.bucketList);
  const dispatch = useDispatch();

  const openBucketListHandler = useCallback(() => {
    dispatch(openListModal());
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <button onClick={openBucketListHandler} className={styles.button}>
        Selected items: <div className={styles.counter}>{selectedModules.length}</div>
      </button>
    </header>
  );
}
