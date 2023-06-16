import {Portal} from "react-portal";
import styles from "./BucketModal.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useCallback} from "react";
import {closeListModal, setSelectedModules} from "../../store/bucketList";

export default function BucketModal(): JSX.Element {
  const {isOpenModal, selectedModules} = useSelector((state: RootState) => state.bucketList);
  const dispatch = useDispatch();

  const closeBucketListHandler = useCallback(() => {
    dispatch(closeListModal());
  }, [dispatch]);

  const getAmount = useCallback(() => {
    const amount = selectedModules.reduce((acc, {price, count}: {price: number; count: number}) => {
      return acc + price * count;
    }, 0);

    return amount;
  }, [selectedModules]);

  const updateModuleCount = useCallback(
    (value: string, isIncrease: boolean) => {
      const modulesClone: {name: string; count: number; quantity: number}[] =
        structuredClone(selectedModules);
      const index = modulesClone.findIndex((el: {name: string}) => el.name === value);

      modulesClone[index].count += isIncrease ? 1 : -1;

      const filteredModules = modulesClone.filter((el) => el.count > 0);

      dispatch(setSelectedModules(filteredModules));
    },
    [dispatch, selectedModules]
  );

  return (
    <Portal>
      {isOpenModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>
              <button className={styles.close} onClick={closeBucketListHandler}>
                &times;
              </button>
              <h2>Bucket list</h2>
              {selectedModules.length ? (
                <ul className={styles.ulWrapper}>
                  {selectedModules.map(
                    ({
                      name,
                      count,
                      quantity,
                      price,
                    }: {
                      name: string;
                      count: number;
                      quantity: number;
                      price: number;
                    }) => {
                      const pureName = name.replace("pri", "");
                      return (
                        <li key={name} className={styles.li}>
                          <p className={styles.liTitle}>{pureName}</p>

                          <div className={styles.liCounterWrapper}>
                            <div className={styles.incrDecrWrapper}>
                              <button onClick={() => updateModuleCount(name, false)}>-</button>
                              <p className={styles.liCount}>{count}</p>
                              <button
                                onClick={() => updateModuleCount(name, true)}
                                disabled={quantity - count <= 0}
                              >
                                +
                              </button>
                            </div>

                            <div className={styles.liInfo}>
                              <p className={styles.liInfoText}>
                                Total price for {pureName}: <b>{price * count}$</b>
                              </p>
                              <p className={styles.liInfoText}>
                                Quantity still available: <b>{quantity - count}</b>
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              ) : (
                <div className={styles.emptyListPlaceholder}>Empty list</div>
              )}
            </div>

            {selectedModules.length && (
              <div className={styles.totalCnt}>
                <p className={styles.amount}>Amount: {getAmount()}$</p>
                <button
                  onClick={() => {
                    alert("Result in the console");
                    console.log(selectedModules);
                  }}
                  className={styles.submitBtn}
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          <button className={styles.modalOver} onClick={closeBucketListHandler} />
        </div>
      )}
    </Portal>
  );
}
