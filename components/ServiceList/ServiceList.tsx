import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import styles from "./ServiceList.module.css";
import { BsGlobe2, BsFileEarmarkCode, BsPencilFill } from "react-icons/bs";
import { MdPrecisionManufacturing } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Badge from "components/UIparts/Badge";

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
          delay: 10000,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        }}
        speed={700}
        spaceBetween={100}
        className="skill-swiper"
      >
        <SwiperSlide>
          <div className="px-0 sm:px-14">
            <div className="h-96 sm:h-80 lg:h-72 mx-auto flex text-left bg-gray-50">
              <div className="w-full relative hidden sm:block  sm:basis-1/4 rounded-l-md overflow-hidden">
                <Image
                  src="/top/frontend.png"
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>

              <div className="sm:basis-3/4 p-4 border-2 sm:border-l-0 rounded-md sm:rounded-l-none sm:rounded-r-md overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-800">
                  <div className="flex items-center text-pink-500 font-bold text-2xl mb-3">
                    <div>
                      <BsGlobe2 />
                    </div>
                    <span className={styles.text_gradient_hyper}>フロントエンド開発</span>
                  </div>

                  <p>WEBサイト制作、WEBアプリケーション開発を行っております。</p>
                  <p>
                    ReactやNext.jsを主軸に置き、SPA・SSR・SSG構成のシステム開発経験があります。
                  </p>
                  <p></p>
                  <hr className="my-4" />
                  <Badge>HTML</Badge>
                  <Badge>CSS</Badge>
                  <Badge>Javascript</Badge>
                  <Badge>Typescript</Badge>
                  <Badge>jquery</Badge>
                  <Badge>React</Badge>
                  <Badge>Redux(Toolkit)</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>Tailwindcss</Badge>
                  <Badge>Bootstrap</Badge>
                  <Badge>Material-UI</Badge>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="px-0 sm:px-14">
            <div className="h-96 sm:h-80 lg:h-72 flex text-left bg-gray-50">
              <div className="w-full relative hidden sm:block  sm:basis-1/4 rounded-l-md overflow-hidden">
                <Image
                  src="/top/backend.jpg"
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>

              <div className="sm:basis-3/4 p-4 border-2 sm:border-l-0 rounded-md sm:rounded-l-none sm:rounded-r-md overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-700">
                  <div className="flex items-center text-purple-600 font-bold text-2xl mb-3">
                    <div>
                      <BsFileEarmarkCode />
                    </div>
                    <span className={styles.text_gradient_oceanic}>バックエンド開発</span>
                  </div>
                  <p>
                    システム要件定義、基本・詳細設計、コーディング、単体・結合試験まで、全工程の経験があります。Linux系や.NET系の開発経験が最も豊富です。
                  </p>
                  <p>
                    また、昨今のクラウド関連技術をキャッチアップし、業務に活かすよう尽力しています。
                  </p>

                  <hr className="my-4" />
                  <Badge>Node.js</Badge>
                  <Badge>C#</Badge>
                  <Badge>Python</Badge>
                  <Badge>L2/L3 NW設計</Badge>
                  <Badge>Linux</Badge>
                  <Badge>RDB(maridDB等)</Badge>
                  <Badge>UML作成</Badge>
                  <Badge>Firebase</Badge>
                  <Badge>AWS(EC2・RDB・IoT等)</Badge>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="px-0 sm:px-14">
            <div className="h-96 sm:h-80 lg:h-72 flex text-left bg-gray-50">
              <div className="w-full relative hidden sm:block  sm:basis-1/4 rounded-l-md overflow-hidden">
                <Image
                  src="/top/hardware.png"
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>

              <div className="sm:basis-3/4 p-4 border-2 sm:border-l-0 rounded-md sm:rounded-l-none sm:rounded-r-md overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-700">
                  <div className="flex items-center text-pink-300 font-bold text-2xl mb-3">
                    <div>
                      <MdPrecisionManufacturing />
                    </div>
                    <span className={styles.text_gradient_cottoncandy}>
                      HW開発・ものづくり
                    </span>
                  </div>

                  <p>
                    様々なものづくりの技術を駆使して、デジタル世界とリアル世界を繋ぎます。
                  </p>
                  <p>
                    センサー・センシング系のシステムの開発には５年以上携わっており、私の十八番です。
                  </p>
                  <hr className="my-4" />
                  <Badge>アナログ・デシタル回路設計</Badge>
                  <Badge>プリント基板設計・部品実装</Badge>
                  <Badge>組み込み開発</Badge>
                  <Badge>2D/3DCAD</Badge>
                  <Badge>3Dプリンター</Badge>
                  <Badge>素材加工(木材/プラスチック/金属/アクリル)</Badge>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="px-0 sm:px-14">
            <div className="h-96 sm:h-80 lg:h-72 mx-auto flex text-left bg-white">
              <div className="w-full relative hidden sm:block  sm:basis-1/4 rounded-l-md overflow-hidden">
                <Image
                  src="/top/other.png"
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </div>

              <div className="sm:basis-3/4 p-4 border-2 sm:border-l-0 rounded-md sm:rounded-l-none sm:rounded-r-md overflow-hidden border-gray-400 ">
                <div className="mb-8 text-gray-700">
                  <div className="flex items-center text-black font-bold text-2xl mb-3">
                    <div>
                      <BsPencilFill />
                    </div>
                    <span className={styles.text_gradient_bluesteel}>その他</span>
                  </div>

                  <p>
                    動画・画像の制作編集の実務経験もあります。コンテンツ素材の作成から対応可能です。
                  </p>
                  <p>PC・ソフトウェア・電気製品全般も得意領域です。</p>
                  <hr className="my-4" />
                  <Badge>画像編集制作 (Figma,Illustrator,Photoshop)</Badge>
                  <Badge>動画編集制作 (DaVinci,AfterEffects)</Badge>
                  <Badge>3DCG制作(Cinema4D)</Badge>
                  <Badge>写真撮影(NIKON)</Badge>
                  <Badge>Officeソフト系(VBA)</Badge>
                  <Badge>家電修理</Badge>
                  <Badge>簿記3級</Badge>
                  <Badge>TOEIC 820点</Badge>
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
