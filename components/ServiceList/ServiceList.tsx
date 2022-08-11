/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import styles from "./ServiceList.module.css";
import { BsGlobe2, BsFileEarmarkCode, BsPencilFill } from "react-icons/bs";
import { MdPrecisionManufacturing } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const skillArray = ["フロントエンド", "バックエンド", "ものづくり", "Other"];

const ServiceList: React.FC = () => {
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
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
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
                    <div className="ml-2">フロントエンド開発</div>
                  </div>

                  <p>WEBサイト制作、WEBアプリケーション開発を行います。</p>
                  <p>
                    要件定義 - デザイン - コーディング - テスト -
                    運用まで、柔軟に対応致します。
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
                  <span className={styles.badge}>Redux</span>
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
                      <BsFileEarmarkCode />
                    </div>
                    <div className="ml-2">バックエンド開発</div>
                  </div>
                  <p>
                    システム要件定義、基本・詳細設計、コーディング、単体・結合試験、など各工程に合わせて柔軟に対応致します。
                  </p>
                  <hr className="my-4" />
                  <span className={styles.badge}>🌟Node.js</span>
                  <span className={styles.badge}>🌟C#</span>
                  <span className={styles.badge}>⭐Python</span>
                  <span className={styles.badge}>⭐Firebase</span>
                  <span className={styles.badge}>AWS(ECS・RDB・IoT等) </span>
                  <span className={styles.badge}>🌟Linux</span>
                  <span className={styles.badge}>mariaDB</span>
                  <span className={styles.badge}>Strapi</span>
                  <span className={styles.badge}>⭐Next.js</span>
                  <span className={styles.badge}>🌟Tailwindcss</span>
                  <span className={styles.badge}>⭐Bootstrap</span>
                  <span className={styles.badge}>⭐MaterialUI</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

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
                      <MdPrecisionManufacturing />
                    </div>
                    <div className="ml-2">ものづくり・HW開発</div>
                  </div>

                  <p>
                    様々なものづくりの技術・ノウハウを駆使してアイデアを実物化し、デジタル世界とリアル世界の接点を広げます。
                  </p>
                  <hr className="my-4" />

                  <span className={styles.badge}>🌟アナログ・デシタル回路設計</span>
                  <span className={styles.badge}>🌟基盤パターン設計・発注・部品実装</span>
                  <span className={styles.badge}>🌟FPGA・マイコン組み込み開発</span>
                  <span className={styles.badge}>🌟RaspberryPi</span>
                  <span className={styles.badge}>
                    🌟素材加工(木材・プラスチック・金属・アクリル)
                  </span>
                  <span className={styles.badge}>🌟3Dプリンター</span>
                  <span className={styles.badge}>⭐2D/3DCAD</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

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
                      <BsPencilFill />
                    </div>
                    <div className="ml-2">Other</div>
                  </div>

                  <p>様々なものづくりの技術を</p>
                  <hr className="my-4" />
                  <span className={styles.badge}>
                    画像編集 (Figma,Illustrator,Photoshop)
                  </span>
                  <span className={styles.badge}>動画制作 (DaVinci,AfterEffects)</span>
                  <span className={styles.badge}>3DCG制作 (Cinema4D)</span>
                  <span className={styles.badge}>家電修理</span>
                  <span className={styles.badge}>PC自作・修理</span>
                  <span className={styles.badge}>簿記3級</span>
                  <span className={styles.badge}>TOEIC 820点</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ServiceList;
