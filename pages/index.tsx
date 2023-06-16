import {useCallback} from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {setSelectedModules} from "../store/bucketList";
import dynamic from "next/dynamic";

type Props = {[x: string]: {quantity: number; price: number}};

const BucketModal = dynamic(() => import("../components/BucketModal/BucketModal"));

export default function HomePage({data}: Props): JSX.Element {
  const {selectedModules} = useSelector((state: RootState) => state.bucketList);
  const dispatch = useDispatch();

  const addModuleToBucketList = useCallback(
    ([name, details]: [name: string, details: {quantity: number; price: number}]) => {
      dispatch(setSelectedModules([...selectedModules, {name, ...details, count: 1}]));
    },
    [dispatch, selectedModules]
  );

  return (
    <main className={styles.main}>
      {Object.entries(data).map((el: any) => {
        return (
          <div key={el[0]} className={styles.card}>
            <Image
              src={require(`../assets/${el[0]
                .replace("pri", "")
                .replace(" ", "-")
                .toLocaleLowerCase()}.jpg`)}
              alt={"Solar panel"}
              loading="lazy"
              className={styles.image}
            />
            <div className={styles.cardCntWrapper}>
              <div className={styles.infoWrapper}>
                <h4 className={styles.name}>{el[0].replace("pri", "")}</h4>
                <p>
                  Quantity: <b>{el[1].quantity}</b>
                </p>
                <p>
                  Price: <b>{el[1].price}$</b>
                </p>
              </div>

              <button
                className={styles.button}
                onClick={() => addModuleToBucketList(el)}
                disabled={selectedModules.some((elem: {name: string}) => elem.name === el[0])}
              >
                Add to list
              </button>
            </div>
          </div>
        );
      })}

      <BucketModal />
    </main>
  );
}

export async function getServerSideProps() {
  const data = await fetch("https://testtask.twnty.de");
  const jsonData = await data.json();

  return {
    props: {
      data: jsonData,
    },
  };
}
