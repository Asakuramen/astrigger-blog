/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styles from "./SwiperSkills.module.css";
import { BsGlobe2 } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const skillArray = ["フロントエンド", "バックエンド", "ものづくり", "Other"];

const SwiperSkills: React.FC = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<div class="' + className + '">' + skillArray[index] + "</div>";
    },
  };

  return (
    <div>
      <Swiper
        // cssMode={true}
        navigation={true}
        pagination={pagination}
        modules={[Navigation, Pagination]}
        className="skill-swiper"
      >
        <SwiperSlide>
          <div className="px-0 sm:px-14">
            <div className="h-96 sm:h-80 mx-auto flex text-left bg-white">
              <div className="hidden sm:block sm:basis-1/4 rounded-l-xl overflow-hidden">
                <img
                  src="/top/backend.jpg"
                  width="128px"
                  height="128px"
                  alt="web"
                  className=""
                ></img>
              </div>

              <div className="sm:basis-3/4 p-4 border-2 sm:border-l-0 rounded-xl sm:rounded-l-none sm:rounded-r-xl overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-700">
                  <div className="flex items-center text-pink-600 font-bold text-2xl mb-3">
                    <div className="">
                      <BsGlobe2 />
                    </div>
                    <div className="ml-2">フロントエンド</div>
                  </div>

                  <p>ウェブサイト制作、ウェブアプリケーション開発を行います。</p>
                  <p>
                    要件定義から - デザイン - コーディング - テスト -
                    運用まで、全行程の対応が可能です。
                  </p>

                  <p></p>
                  <hr className="my-4" />
                  <span className={styles.badge}>🌟HTML</span>
                  <span className={styles.badge}>⭐CSS</span>
                  <span className={styles.badge}>Sass</span>
                  <span className={styles.badge}>🌟Javascript</span>
                  <span className={styles.badge}>⭐Typescript</span>
                  <span className={styles.badge}>jquery</span>
                  <span className={styles.badge}>🌟React</span>
                  <span className={styles.badge}>⭐Next.js</span>
                  <span className={styles.badge}>🌟Tailwindcss</span>
                  <span className={styles.badge}>⭐Bootstrap</span>
                  <span className={styles.badge}>⭐Material-UI</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-0 sm:px-14">
            <div className="h-96 sm:h-80 mx-auto flex text-left bg-white">
              <div className="basis-1/4 rounded-l-xl overflow-hidden">
                <img
                  src="/top/backend.jpg"
                  width="128px"
                  height="128px"
                  alt="web"
                  className=""
                ></img>
              </div>

              <div className="basis-3/4 p-6 border-y-2 border-r-2 rounded-r-xl overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-700">
                  <div className="font-bold text-2xl mb-3 bg-clip-text text-transparent bg-gradient-to-l  from-pink-500 via-red-500 to-yellow-500">
                    バックエンド開発
                  </div>

                  <p>ソフトウェア開発を行います。</p>
                  <p>プロジェクトの規定やルールに沿って幅広く対応可能です。</p>
                  <hr className="my-4" />
                  <span className={styles.badge}>🌟Node.js</span>
                  <span className={styles.badge}>🌟C#</span>
                  <span className={styles.badge}>⭐Python</span>
                  <span className={styles.badge}>⭐Firebase</span>
                  <span className={styles.badge}>AWS(ECS・RDB・IoT等) </span>
                  <span className={styles.badge}>🌟Linux</span>
                  <span className={styles.badge}>mariaDB</span>
                  <span className={styles.badge}>Strapi</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-0 sm:px-14">
            <div className="h-96 sm:h-80 mx-auto flex text-left bg-white">
              <div className="basis-1/4 rounded-l-xl overflow-hidden">
                <img
                  src="/top/backend.jpg"
                  width="128px"
                  height="128px"
                  alt="web"
                  className=""
                ></img>
              </div>

              <div className="basis-3/4 p-6 border-y-2 border-r-2 rounded-r-xl overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-700">
                  <div className="text-pink-600 font-bold text-2xl mb-3">
                    ハードウェア開発 / ものづくり
                  </div>
                  <p>
                    様々なものづくりの技術を駆使して、どんなアイデアも実物化し、デジタル世界とリアル世界とのインターフェースを作ります。
                  </p>
                  <hr className="my-4" />
                  <span className={styles.badge}>
                    🌟素材加工（木材・プラスチック・金属・アクリル）
                  </span>
                  <span className={styles.badge}>🌟3Dプリンター</span>
                  <span className={styles.badge}>⭐2D/3DCAD</span>
                  <span className={styles.badge}>🌟アナログ・デシタル回路設計</span>
                  <span className={styles.badge}>🌟基盤パターン設計・発注・部品実装</span>
                  <span className={styles.badge}>🌟FPGA・マイコン組み込み開発</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>Other</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSkills;
