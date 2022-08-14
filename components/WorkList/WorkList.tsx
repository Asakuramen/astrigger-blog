/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { WorkContentMetadata } from "lib/getWorkContent";
import styles from "./WorkList.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {
  allWorkContentsMetaData: WorkContentMetadata[] | undefined;
};

const WorkList: NextPage<Props> = ({ allWorkContentsMetaData }) => {
  return (
    <div className="grid grid-col-1 sm:grid-cols-3">
      {allWorkContentsMetaData ? (
        allWorkContentsMetaData.map((workMetaData: WorkContentMetadata) => {
          return (
            <div className="w-full" key={workMetaData.title}>
              <Link href={`/works/${workMetaData.id}`}>
                <a>
                  <div className={styles.work_img_div}>
                    <div className={styles.work_img_back}>
                      <Image
                        src={workMetaData.thumbnail[1]}
                        alt="thumbnail_top"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>

                    <div className={styles.work_img_caption}>
                      {workMetaData.description}
                    </div>

                    <div className={styles.work_img_front}>
                      <Image
                        src={workMetaData.thumbnail[0]}
                        alt="thumbnail_back"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </a>
              </Link>

              <div className="mt-3 mb-10 text-gray-700 text-sm">{workMetaData.title}</div>
            </div>
          );
        })
      ) : (
        <div>Internal Server Error! No content found</div>
      )}
    </div>
  );
};

// const WorkList: NextPage<Props> = ({ allWorkContentsMetaData }) => {
//   return (
//     <div className="grid grid-col-1 sm:grid-cols-3">
//       {allWorkContentsMetaData ? (
//         allWorkContentsMetaData.map((workMetaData: WorkContentMetadata) => {
//           return (
//             <div className="w-full" key={workMetaData.title}>
//               <Link href={`/works/${workMetaData.id}`}>
//                 <a>
//                   <div className={styles.work_img_div}>
//                     <img
//                       src={workMetaData.thumbnail[1]}
//                       alt="thumbnail_top"
//                       className={styles.work_img_back}
//                     ></img>
//                     <div className={styles.work_img_caption}>
//                       {workMetaData.description}
//                     </div>

//                     <img
//                       src={workMetaData.thumbnail[0]}
//                       alt="thumbnail_back"
//                       className={styles.work_img_front}
//                     ></img>
//                   </div>
//                 </a>
//               </Link>

//               <div className="mt-3 mb-10 text-gray-700 text-sm">{workMetaData.title}</div>
//             </div>
//           );
//         })
//       ) : (
//         <div>Internal Server Error! No content found</div>
//       )}
//     </div>
//   );
// };

export default WorkList;
